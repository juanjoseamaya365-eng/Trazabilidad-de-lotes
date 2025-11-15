import React, { useState, useEffect } from 'react';
import type { Cost } from '../types';
import Card from './Card';
import Input from './Input';

interface CostsCardProps {
  costs: Cost[];
  addCost: (cost: Omit<Cost, 'id'>) => void;
  deleteCost: (id: string) => void;
  updateCost: (cost: Cost) => void;
  currentLot: string;
}

const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></svg>
);
const EditIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" /></svg>
);
const DeleteIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z" /></svg>
);
const SaveIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4Zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3Zm3-10H5V5h10v4Z" /></svg>
);
const CancelIcon: React.FC<{className?: string}> = ({className}) => (
     <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2Zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59Z" /></svg>
);
const CalculatorIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M7 2H17a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2M7 4v3h10V4H7m3 5h4v2H10V9m0 3h4v2H10v-2m-3 2h2v2H7v-2m0-3h2v2H7v-2m3-1h4v2H10v-2m3 5h2v2h-2v-2m-3 0h2v2H7v-2m3-3h2v2h-2v-2m3 0h2v2h-2v-2Z" /></svg>
);


const CostForm: React.FC<{onAdd: (cost: Omit<Cost, 'id'>) => void, currentLot: string}> = ({ onAdd, currentLot }) => {
    const getInitialState = () => ({ date: '', description: '', category: '', amount: '' });
    const [formState, setFormState] = useState(getInitialState());
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { date, description, category, amount } = formState;
        if(!date || !description || !category || !amount) return;
        onAdd({ ...formState, lot: currentLot });
        setFormState(getInitialState());
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end p-4 bg-stone-50 rounded-lg border border-stone-200 mb-6">
            <Input label="Fecha" name="date" type="date" value={formState.date} onChange={handleChange} />
            <Input label="Descripción" name="description" value={formState.description} onChange={handleChange} />
             <div>
                 <label htmlFor="category" className="block text-sm font-medium text-stone-600 mb-1">Categoría</label>
                <select name="category" id="category" value={formState.category} onChange={handleChange} className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-800 focus:border-amber-800 transition">
                    <option value="">Seleccionar...</option>
                    <option value="Mano de Obra">Mano de Obra</option>
                    <option value="Insumos">Insumos</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Otros">Otros</option>
                </select>
             </div>
            <Input label="Monto ($)" name="amount" type="number" step="0.01" value={formState.amount} onChange={handleChange} />
            <button type="submit" className="w-full bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 transition-colors flex items-center justify-center shadow-sm sm:col-span-2 lg:col-span-1">
                <PlusIcon className="h-5 w-5 mr-2"/>
                Agregar
            </button>
        </form>
    )
};


const CostsCard: React.FC<CostsCardProps> = ({ costs, addCost, deleteCost, updateCost, currentLot }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedCost, setEditedCost] = useState<Cost | null>(null);

  const filteredCosts = costs.filter(cost => cost.lot === currentLot);

  const handleEdit = (cost: Cost) => {
    setEditingId(cost.id);
    setEditedCost(cost);
  };
  
  const handleCancel = () => {
    setEditingId(null);
    setEditedCost(null);
  };

  const handleSave = () => {
    if(editedCost){
        updateCost(editedCost);
        handleCancel();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if(editedCost){
        setEditedCost({...editedCost, [e.target.name]: e.target.value });
    }
  }


  return (
    <Card title={`Control de Costos (Lote: ${currentLot})`} icon={<CalculatorIcon className="h-6 w-6"/>}>
      <CostForm onAdd={addCost} currentLot={currentLot} />
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              {['Fecha', 'Descripción', 'Categoría', 'Monto', 'Acciones'].map(header => (
                <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-stone-200">
            {filteredCosts.map((cost) => (
              <tr key={cost.id} className="hover:bg-stone-50 transition-colors">
                {editingId === cost.id ? (
                    <>
                        <td className="px-6 py-4 whitespace-nowrap"><input type="date" name="date" value={editedCost?.date} onChange={handleChange} className="w-full p-1 border rounded" /></td>
                        <td className="px-6 py-4 whitespace-nowrap"><input type="text" name="description" value={editedCost?.description} onChange={handleChange} className="w-full p-1 border rounded"/></td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <select name="category" value={editedCost?.category} onChange={handleChange} className="w-full p-1 border rounded">
                                <option value="Mano de Obra">Mano de Obra</option>
                                <option value="Insumos">Insumos</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Administrativo">Administrativo</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap"><input type="number" name="amount" value={editedCost?.amount} onChange={handleChange} className="w-full p-1 border rounded"/></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={handleSave} className="text-green-600 hover:text-green-900 mr-3"><SaveIcon className="h-5 w-5"/></button>
                            <button onClick={handleCancel} className="text-stone-600 hover:text-stone-900"><CancelIcon className="h-5 w-5"/></button>
                        </td>
                    </>
                ) : (
                    <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{cost.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900">{cost.description}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">{cost.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-900 font-semibold">{(parseFloat(cost.amount) || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button onClick={() => handleEdit(cost)} className="text-amber-600 hover:text-amber-900 mr-3"><EditIcon className="h-5 w-5"/></button>
                            <button onClick={() => deleteCost(cost.id)} className="text-red-600 hover:text-red-900"><DeleteIcon className="h-5 w-5"/></button>
                        </td>
                    </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CostsCard;