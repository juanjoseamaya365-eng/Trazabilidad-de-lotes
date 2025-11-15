import React, { useState } from 'react';
import type { Cost } from '../types';
import Card from './Card';
import Input from './Input';
import Modal from './Modal';

interface Props {
  lotId: string;
  costs: Cost[];
  onSave: (cost: Cost) => void;
  onDelete: (id: string) => void;
}

const CostForm: React.FC<{ cost?: Cost; lotId: string; onSave: (cost: Cost) => void; onCancel: () => void; }> = ({ cost, lotId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: cost?.date || '',
    description: cost?.description || '',
    category: cost?.category || '',
    amount: cost?.amount || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: cost?.id || new Date().toISOString(), lotId, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Fecha" name="date" type="date" value={formData.date} onChange={handleChange} required/>
            <Input label="Descripción" name="description" value={formData.description} onChange={handleChange} required/>
            <div>
                 <label htmlFor="category" className="block text-sm font-medium text-stone-600 mb-1">Categoría</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md">
                    <option value="">Seleccionar...</option>
                    <option value="Mano de Obra">Mano de Obra</option>
                    <option value="Insumos">Insumos</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Otros">Otros</option>
                </select>
             </div>
            <Input label="Monto ($)" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required/>
        </div>
        <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-stone-200 rounded-md">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-amber-800 text-white rounded-md">Guardar Costo</button>
        </div>
    </form>
  )
}

const LotCostsCard: React.FC<Props> = ({ lotId, costs, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCost, setEditingCost] = useState<Cost | undefined>(undefined);

  const handleEdit = (cost: Cost) => {
    setEditingCost(cost);
    setIsModalOpen(true);
  }

  const handleAddNew = () => {
    setEditingCost(undefined);
    setIsModalOpen(true);
  }

  const handleSave = (cost: Cost) => {
    onSave(cost);
    setIsModalOpen(false);
  }

  return (
     <>
      <Card 
        title="Costos de Procesamiento del Lote"
        icon={<span>🧾</span>}
        actions={<button onClick={handleAddNew} className="flex items-center px-3 py-1.5 text-sm bg-amber-800 text-white rounded-md hover:bg-amber-900">Agregar Costo</button>}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
                <tr>
                    {['Fecha', 'Descripción', 'Categoría', 'Monto', 'Acciones'].map(header => (
                        <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
                {costs.length > 0 ? costs.map(cost => (
                        <tr key={cost.id}>
                            <td className="px-4 py-2 text-sm text-stone-500">{cost.date}</td>
                            <td className="px-4 py-2 text-sm">{cost.description}</td>
                            <td className="px-4 py-2 text-sm text-stone-500">{cost.category}</td>
                            <td className="px-4 py-2 text-sm font-semibold">{(parseFloat(cost.amount) || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                            <td className="px-4 py-2 text-right space-x-2">
                                <button onClick={() => handleEdit(cost)} className="text-amber-600">Editar</button>
                                <button onClick={() => onDelete(cost.id)} className="text-red-600">Eliminar</button>
                            </td>
                        </tr>
                    )) : (
                    <tr><td colSpan={5} className="p-4 text-center text-stone-500">No hay costos registrados para este lote.</td></tr>
                )}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCost ? 'Editar Costo' : 'Agregar Costo'}>
          <CostForm cost={editingCost} lotId={lotId} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default LotCostsCard;
