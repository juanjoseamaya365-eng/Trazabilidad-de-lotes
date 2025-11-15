
import React from 'react';
// FIX: Changed SaleInfo to Sale as it is the correct exported type.
import type { Sale } from '../types';
import Card from './Card';
import Input from './Input';

interface SaleInfoCardProps {
  info: Sale;
  setInfo: React.Dispatch<React.SetStateAction<Sale>>;
  totalSale: number;
}

const DollarIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5 17.5H10V19h1.5a2.5 2.5 0 0 0 2.5-2.5v-1.85A4.012 4.012 0 0 0 16.5 11H18v-2h-1.5a2.5 2.5 0 0 0-2.5 2.5v1.85A4.012 4.012 0 0 0 11.5 17.5M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8ZM7.5 13H6V5h1.5a3.5 3.5 0 1 1 0 7H6v-1h1.5a2.5 2.5 0 1 0 0-5H7.5v6Z" />
    </svg>
);


const SaleInfoCard: React.FC<SaleInfoCardProps> = ({ info, setInfo, totalSale }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInfo(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Card title="Información de Venta" icon={<DollarIcon className="h-6 w-6"/>}>
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Fecha de Venta" id="date" type="date" value={info.date} onChange={handleChange} />
                <Input label="Comprador" id="buyer" value={info.buyer} onChange={handleChange} />
                <Input label="Masa Café Verde (lbs)" id="greenCoffeeMass" type="number" value={info.greenCoffeeMass} onChange={handleChange} />
                <Input label="Puntaje de Catación" id="cuppingScore" type="number" step="0.5" value={info.cuppingScore} onChange={handleChange} />
                <Input label="Precio por Lb ($)" id="pricePerLb" type="number" step="0.01" value={info.pricePerLb} onChange={handleChange} />
                <Input label="Tipo de Empaque" id="packagingType" value={info.packagingType} onChange={handleChange} />
            </div>
             <Input label="Descriptores de Sabor" id="descriptors" value={info.descriptors} onChange={handleChange} />

             <div className="pt-4 text-center">
                <p className="text-sm text-stone-500">Monto Total de Venta</p>
                <p className="text-3xl font-bold text-amber-900">
                    {totalSale.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
             </div>
        </div>
    </Card>
  );
};

export default SaleInfoCard;