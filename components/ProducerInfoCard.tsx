import React from 'react';
// FIX: Changed ProducerInfo to Producer as it is the correct exported type.
import type { Producer } from '../types';
import Card from './Card';
import Input from './Input';

interface ProducerInfoCardProps {
  info: Producer;
  setInfo: React.Dispatch<React.SetStateAction<Producer>>;
}

const LeafIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.94 16.33 11 12 17 12V8M21 6H3V3h18v3Z" />
    </svg>
);


const ProducerInfoCard: React.FC<ProducerInfoCardProps> = ({ info, setInfo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInfo(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Card title="Información del Productor y Proceso" icon={<LeafIcon className="h-6 w-6"/>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Nombre de la Finca" id="farmName" value={info.farmName} onChange={handleChange} />
        <Input label="Lote" id="lot" value={info.lot} onChange={handleChange} />
        <Input label="Variedad de Café" id="variety" value={info.variety} onChange={handleChange} />
        <Input label="Tipo de Proceso" id="processType" value={info.processType} onChange={handleChange} />
        <Input label="Fecha de Inicio" id="startDate" type="date" value={info.startDate} onChange={handleChange} />
        <Input label="Masa Inicial (lbs)" id="initialMass" type="number" value={info.initialMass} onChange={handleChange} />
        <Input label="Fecha Final" id="endDate" type="date" value={info.endDate} onChange={handleChange} />
        <Input label="Masa Final (lbs)" id="finalMass" type="number" value={info.finalMass} onChange={handleChange} />
      </div>
    </Card>
  );
};

export default ProducerInfoCard;