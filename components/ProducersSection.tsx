import React, { useState } from 'react';
import type { Producer } from '../types';
import Card from './Card';
import Modal from './Modal';
import Input from './Input';

interface ProducersSectionProps {
  producers: Producer[];
  onSave: (producer: Producer) => void;
  onDelete: (id: string) => void;
}

const LeafIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.94 16.33 11 12 17 12V8M21 6H3V3h18v3Z" />
    </svg>
);
const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></svg>
);

const ProducerForm: React.FC<{ producer?: Producer; onSave: (producer: Producer) => void; onCancel: () => void; }> = ({ producer, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Producer, 'id'>>({
    farmName: producer?.farmName || '', lot: producer?.lot || '', variety: producer?.variety || '',
    initialMass: producer?.initialMass || '', startDate: producer?.startDate || '', finalMass: producer?.finalMass || '',
    endDate: producer?.endDate || '', processType: producer?.processType || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: producer?.id || new Date().toISOString(), ...formData });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nombre de la Finca" name="farmName" value={formData.farmName} onChange={handleChange} required />
        <Input label="Lote" name="lot" value={formData.lot} onChange={handleChange} required />
        <Input label="Variedad de Café" name="variety" value={formData.variety} onChange={handleChange} />
        <Input label="Tipo de Proceso" name="processType" value={formData.processType} onChange={handleChange} />
        <Input label="Fecha de Inicio" name="startDate" type="date" value={formData.startDate} onChange={handleChange} />
        <Input label="Masa Inicial (lbs)" name="initialMass" type="number" value={formData.initialMass} onChange={handleChange} />
        <Input label="Fecha Final" name="endDate" type="date" value={formData.endDate} onChange={handleChange} />
        <Input label="Masa Final (lbs)" name="finalMass" type="number" value={formData.finalMass} onChange={handleChange} />
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-stone-200 rounded-md">Cancelar</button>
        <button type="submit" className="px-4 py-2 bg-amber-800 text-white rounded-md">Guardar</button>
      </div>
    </form>
  )
}

const ProducersSection: React.FC<ProducersSectionProps> = ({ producers, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProducer, setEditingProducer] = useState<Producer | undefined>(undefined);

  const handleEdit = (producer: Producer) => {
    setEditingProducer(producer);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProducer(undefined);
    setIsModalOpen(true);
  }

  const handleSave = (producer: Producer) => {
    onSave(producer);
    setIsModalOpen(false);
  }

  return (
    <>
      <Card
        title="Productores"
        icon={<LeafIcon className="h-6 w-6" />}
        actions={<button onClick={handleAddNew} className="flex items-center px-3 py-1.5 text-sm bg-amber-800 text-white rounded-md hover:bg-amber-900"><PlusIcon className="h-4 w-4 mr-1" />Agregar</button>}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-2 text-sm font-medium text-stone-500">Finca</th>
                <th className="text-left p-2 text-sm font-medium text-stone-500">Lote</th>
                <th className="text-left p-2 text-sm font-medium text-stone-500">Variedad</th>
                <th className="text-right p-2"></th>
              </tr>
            </thead>
            <tbody>
              {producers.length > 0 ? producers.map(p => (
                <tr key={p.id} className="border-b">
                  <td className="p-2 text-sm text-stone-900">{p.farmName}</td>
                  <td className="p-2 text-sm text-stone-500">{p.lot}</td>
                  <td className="p-2 text-sm text-stone-500">{p.variety}</td>
                  <td className="p-2 text-right space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-amber-600">Editar</button>
                    <button onClick={() => onDelete(p.id)} className="text-red-600">Eliminar</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="p-4 text-center text-stone-500">No hay productores registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProducer ? 'Editar Productor' : 'Agregar Productor'}>
        <ProducerForm producer={editingProducer} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default ProducersSection;
