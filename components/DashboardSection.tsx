import React, { useMemo } from 'react';
import type { CoffeeLot, Sale, Cost } from '../types';
import Card from './Card';

interface DashboardSectionProps {
  lots: CoffeeLot[];
  sales: Sale[];
  costs: Cost[];
}

const ChartIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M21 21H3V3h2v16h16v2ZM15 15H13V5h2v10Zm-4 0H9v-4h2v4Zm-4 0H5V9h2v6Z"/></svg>
);


const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const DashboardSection: React.FC<DashboardSectionProps> = ({ lots, sales, costs }) => {
    const lotFinancials = useMemo(() => {
        return lots.map(lot => {
            const lotSales = sales.filter(s => s.lotId === lot.id);
            const lotCosts = costs.filter(c => c.lotId === lot.id);

            const totalSale = lotSales.reduce((acc, sale) => {
                const amount = (parseFloat(sale.greenCoffeeMass) || 0) * (parseFloat(sale.pricePerLb) || 0);
                return acc + amount;
            }, 0);

            const totalCost = lotCosts.reduce((acc, cost) => acc + (parseFloat(cost.amount) || 0), 0);
            
            const profit = totalSale - totalCost;

            return {
                ...lot,
                totalSale,
                totalCost,
                profit
            }
        });
    }, [lots, sales, costs]);

  return (
    <Card title="Panel de Control Financiero General" icon={<ChartIcon className="h-6 w-6"/>}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
                <tr>
                    {['Código Lote', 'Finca', 'Venta Total', 'Costo Total', 'Ganancia Neta'].map(header => (
                        <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
                {lotFinancials.length > 0 ? lotFinancials.map(l => (
                    <tr key={l.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-stone-900">{l.lotCode}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-stone-500">{l.reception.farm}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-semibold">{formatCurrency(l.totalSale)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600 font-semibold">{formatCurrency(l.totalCost)}</td>
                        <td className={`px-4 py-3 whitespace-nowrap text-sm font-bold ${l.profit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            {formatCurrency(l.profit)}
                        </td>
                    </tr>
                )) : (
                     <tr><td colSpan={5} className="p-4 text-center text-stone-500">No hay datos para mostrar. Agregue un lote.</td></tr>
                )}
            </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DashboardSection;