import React, { useState } from 'react';
import type { Sale, Producer } from '../types';
import Card from './Card';
import Modal from './Modal';
import Input from './Input';

interface SalesSectionProps {
  sales: Sale[];
  producers: Producer[];
  onSave: (sale: Sale) => void;
  onDelete: (id: string) => void;
}

const DollarIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5 17.5H10V19h1.5a2.5 2.5 0 0 0 2.5-2.5v-1.85A4.012 4.012 0 0 0 16.5 11H18v-2h-1.5a2.5 2.5 0 0 0-2.5 2.5v1.85A4.012 4.012 0 0 0 11.5 17.5M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8ZM7.5 13H6V5h1.5a3.5 3.5 0 1 1 0 7H6v-1h1.5a2.5 2.5 0 1 0 0-5H7.5v6Z" />
    </svg>
);
const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></svg>
);

const SaleForm: React.FC<{ sale?: Sale; producers: Producer[]; onSave: (sale: Sale) => void; onCancel: () => void; }> = ({ sale, producers, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    producerId: sale?.producerId || '', date: sale?.date || '', buyer: sale?.buyer || '',
    greenCoffeeMass: sale?.greenCoffeeMass || '', cuppingScore: sale?.cuppingScore || '', pricePerLb: sale?.pricePerLb || '',
    descriptors: sale?.descriptors || '', packagingType: sale?.packagingType || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.producerId) {
      alert("Por favor, seleccione un productor.");
      return;
    }
    // FIX: Add missing lotId to satisfy Sale type.
    onSave({ id: sale?.id || new Date().toISOString(), lotId: '', ...formData });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="producerId" className="block text-sm font-medium text-stone-600 mb-1">Productor</label>
            <select name="producerId" value={formData.producerId} onChange={handleChange} required className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md">
                <option value="">Seleccionar productor...</option>
                {producers.map(p => <option key={p.id} value={p.id}>{p.farmName} - {p.lot}</option>)}
            </select>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Fecha de Venta" name="date" type="date" value={formData.date} onChange={handleChange} />
        <Input label="Comprador" name="buyer" value={formData.buyer} onChange={handleChange} />
        <Input label="Masa Café Verde (lbs)" name="greenCoffeeMass" type="number" value={formData.greenCoffeeMass} onChange={handleChange} />
        <Input label="Puntaje de Catación" name="cuppingScore" type="number" step="0.5" value={formData.cuppingScore} onChange={handleChange} />
        <Input label="Precio por Lb ($)" name="pricePerLb" type="number" step="0.01" value={formData.pricePerLb} onChange={handleChange} />
        <Input label="Tipo de Empaque" name="packagingType" value={formData.packagingType} onChange={handleChange} />
      </div>
      <Input label="Descriptores de Sabor" name="descriptors" value={formData.descriptors} onChange={handleChange} />
      <div className="flex justify-end space-x-2 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-stone-200 rounded-md">Cancelar</button>
        <button type="submit" className="px-4 py-2 bg-amber-800 text-white rounded-md">Guardar</button>
      </div>
    </form>
  )
}

const SalesSection: React.FC<SalesSectionProps> = ({ sales, producers, onSave, onDelete }) => {
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

  const getProducerInfo = (producerId: string) => {
      return producers.find(p => p.id === producerId);
  }

  return (
    <>
      <Card
        title="Ventas"
        icon={<DollarIcon className="h-6 w-6" />}
        actions={<button onClick={handleAddNew} className="flex items-center px-3 py-1.5 text-sm bg-amber-800 text-white rounded-md hover:bg-amber-900"><PlusIcon className="h-4 w-4 mr-1" />Agregar</button>}
      >
        <div className="overflow-x-auto">
           <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-2 text-sm font-medium text-stone-500">Productor</th>
                <th className="text-left p-2 text-sm font-medium text-stone-500">Comprador</th>
                <th className="text-left p-2 text-sm font-medium text-stone-500">Monto</th>
                <th className="text-right p-2"></th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? sales.map(s => {
                // FIX: Handle optional producerId.
                if (!s.producerId) return null;
                const producer = getProducerInfo(s.producerId);
                const amount = (parseFloat(s.greenCoffeeMass) || 0) * (parseFloat(s.pricePerLb) || 0);
                return (
                    <tr key={s.id} className="border-b">
                        <td className="p-2 text-sm text-stone-900">{producer?.farmName || 'N/A'}</td>
                        <td className="p-2 text-sm text-stone-500">{s.buyer}</td>
                        <td className="p-2 text-sm text-stone-900 font-semibold">{amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td className="p-2 text-right space-x-2">
                            <button onClick={() => handleEdit(s)} className="text-amber-600">Editar</button>
                            <button onClick={() => onDelete(s.id)} className="text-red-600">Eliminar</button>
                        </td>
                    </tr>
                )
              }) : (
                <tr><td colSpan={4} className="p-4 text-center text-stone-500">No hay ventas registradas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSale ? 'Editar Venta' : 'Agregar Venta'}>
        <SaleForm sale={editingSale} producers={producers} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default SalesSection;
