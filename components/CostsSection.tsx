import React, { useState } from 'react';
import type { Cost, Producer } from '../types';
import Card from './Card';
import Input from './Input';
import Modal from './Modal';

interface CostsSectionProps {
  costs: Cost[];
  producers: Producer[];
  onSave: (cost: Cost) => void;
  onDelete: (id: string) => void;
}

const CalculatorIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M7 2H17a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2M7 4v3h10V4H7m3 5h4v2H10V9m0 3h4v2H10v-2m-3 2h2v2H7v-2m0-3h2v2H7v-2m3-1h4v2H10v-2m3 5h2v2h-2v-2m-3 0h2v2H7v-2m3-3h2v2h-2v-2m3 0h2v2h-2v-2Z" /></svg>
);

const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></svg>
);


const CostForm: React.FC<{ cost?: Cost; producers: Producer[]; onSave: (cost: Cost) => void; onCancel: () => void; }> = ({ cost, producers, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    producerId: cost?.producerId || '', date: cost?.date || '', description: cost?.description || '',
    category: cost?.category || '', amount: cost?.amount || ''
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
    // FIX: Add missing lotId to satisfy Cost type.
    onSave({ id: cost?.id || new Date().toISOString(), lotId: '', ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                 <label htmlFor="producerId" className="block text-sm font-medium text-stone-600 mb-1">Productor</label>
                 <select name="producerId" value={formData.producerId} onChange={handleChange} required className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md">
                    <option value="">Seleccionar...</option>
                    {producers.map(p => <option key={p.id} value={p.id}>{p.farmName} - {p.lot}</option>)}
                 </select>
            </div>
            <Input label="Fecha" name="date" type="date" value={formData.date} onChange={handleChange} />
            <Input label="Descripción" name="description" value={formData.description} onChange={handleChange} />
            <div>
                 <label htmlFor="category" className="block text-sm font-medium text-stone-600 mb-1">Categoría</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md">
                    <option value="">Seleccionar...</option>
                    <option value="Mano de Obra">Mano de Obra</option>
                    <option value="Insumos">Insumos</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Otros">Otros</option>
                </select>
             </div>
            <Input label="Monto ($)" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} />
        </div>
        <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-stone-200 rounded-md">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-amber-800 text-white rounded-md">Guardar</button>
        </div>
    </form>
  )
}


const CostsSection: React.FC<CostsSectionProps> = ({ costs, producers, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCost, setEditingCost] = useState<Cost | undefined>(undefined);

  const getProducerInfo = (producerId: string) => {
    return producers.find(p => p.id === producerId);
  }

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
        title="Control de Costos de Procesamiento"
        icon={<CalculatorIcon className="h-6 w-6"/>}
        actions={<button onClick={handleAddNew} className="flex items-center px-3 py-1.5 text-sm bg-amber-800 text-white rounded-md hover:bg-amber-900"><PlusIcon className="h-4 w-4 mr-1" />Agregar</button>}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
                <tr>
                    {['Productor', 'Fecha', 'Descripción', 'Categoría', 'Monto', 'Acciones'].map(header => (
                        <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
                {costs.length > 0 ? costs.map(cost => {
                    // FIX: Handle optional producerId.
                    if (!cost.producerId) return null;
                    const producer = getProducerInfo(cost.producerId);
                    return (
                        <tr key={cost.id}>
                            <td className="px-4 py-2 text-sm">{producer?.farmName || 'N/A'}</td>
                            <td className="px-4 py-2 text-sm text-stone-500">{cost.date}</td>
                            <td className="px-4 py-2 text-sm">{cost.description}</td>
                            <td className="px-4 py-2 text-sm text-stone-500">{cost.category}</td>
                            <td className="px-4 py-2 text-sm font-semibold">{(parseFloat(cost.amount) || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                            <td className="px-4 py-2 text-right space-x-2">
                                <button onClick={() => handleEdit(cost)} className="text-amber-600">Editar</button>
                                <button onClick={() => onDelete(cost.id)} className="text-red-600">Eliminar</button>
                            </td>
                        </tr>
                    )
                }) : (
                    <tr><td colSpan={6} className="p-4 text-center text-stone-500">No hay costos registrados.</td></tr>
                )}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCost ? 'Editar Costo' : 'Agregar Costo'}>
          <CostForm cost={editingCost} producers={producers} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default CostsSection;
