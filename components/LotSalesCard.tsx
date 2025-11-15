import React, { useState } from 'react';
import type { Sale } from '../types';
import Card from './Card';
import Modal from './Modal';
import Input from './Input';

interface Props {
  lotId: string;
  sales: Sale[];
  onSave: (sale: Sale) => void;
  onDelete: (id: string) => void;
}

const SaleForm: React.FC<{ sale?: Sale; lotId: string; onSave: (sale: Sale) => void; onCancel: () => void; }> = ({ sale, lotId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: sale?.date || '',
    buyer: sale?.buyer || '',
    greenCoffeeMass: sale?.greenCoffeeMass || '',
    cuppingScore: sale?.cuppingScore || '',
    pricePerLb: sale?.pricePerLb || '',
    descriptors: sale?.descriptors || '',
    packagingType: sale?.packagingType || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: sale?.id || new Date().toISOString(), lotId, ...formData });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Fecha de Venta" name="date" type="date" value={formData.date} onChange={handleChange} required />
        <Input label="Comprador" name="buyer" value={formData.buyer} onChange={handleChange} required/>
        <Input label="Masa Café Verde (lbs)" name="greenCoffeeMass" type="number" value={formData.greenCoffeeMass} onChange={handleChange} />
        <Input label="Puntaje de Catación" name="cuppingScore" type="number" step="0.5" value={formData.cuppingScore} onChange={handleChange} />
        <Input label="Precio por Lb ($)" name="pricePerLb" type="number" step="0.01" value={formData.pricePerLb} onChange={handleChange} />
        <Input label="Tipo de Empaque" name="packagingType" value={formData.packagingType} onChange={handleChange} />
      </div>
      <Input label="Descriptores de Sabor" name="descriptors" value={formData.descriptors} onChange={handleChange} />
      <div className="flex justify-end space-x-2 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-stone-200 rounded-md">Cancelar</button>
        <button type="submit" className="px-4 py-2 bg-amber-800 text-white rounded-md">Guardar Venta</button>
      </div>
    </form>
  )
}

const LotSalesCard: React.FC<Props> = ({ lotId, sales, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | undefined>(undefined);

  const handleEdit = (sale: Sale) => {
    setEditingSale(sale);
    setIsModalOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingSale(undefined);
    setIsModalOpen(true);
  }

  const handleSave = (sale: Sale) => {
    onSave(sale);
    setIsModalOpen(false);
  }

  return (
    <>
      <Card
        title="Ventas del Lote"
        icon={<span>💲</span>}
        actions={<button onClick={handleAddNew} className="flex items-center px-3 py-1.5 text-sm bg-amber-800 text-white rounded-md hover:bg-amber-900">Agregar Venta</button>}
      >
        <div className="overflow-x-auto">
           <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-2 text-sm font-medium text-stone-500">Comprador</th>
                <th className="text-left p-2 text-sm font-medium text-stone-500">Fecha</th>
                <th className="text-left p-2 text-sm font-medium text-stone-500">Monto</th>
                <th className="text-right p-2"></th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? sales.map(s => {
                const amount = (parseFloat(s.greenCoffeeMass) || 0) * (parseFloat(s.pricePerLb) || 0);
                return (
                    <tr key={s.id} className="border-b">
                        <td className="p-2 text-sm text-stone-900">{s.buyer}</td>
                        <td className="p-2 text-sm text-stone-500">{s.date}</td>
                        <td className="p-2 text-sm text-stone-900 font-semibold">{amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td className="p-2 text-right space-x-2">
                            <button onClick={() => handleEdit(s)} className="text-amber-600">Editar</button>
                            <button onClick={() => onDelete(s.id)} className="text-red-600">Eliminar</button>
                        </td>
                    </tr>
                )
              }) : (
                <tr><td colSpan={4} className="p-4 text-center text-stone-500">No hay ventas registradas para este lote.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSale ? 'Editar Venta' : 'Agregar Venta'}>
        <SaleForm sale={editingSale} lotId={lotId} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default LotSalesCard;
