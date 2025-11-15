import React, { useMemo } from 'react';
import type { Sale, Cost } from '../types';
import Card from './Card';

interface Props {
  sales: Sale[];
  costs: Cost[];
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const LotSummaryCard: React.FC<Props> = ({ sales, costs }) => {
    const { totalSale, totalCost, profit } = useMemo(() => {
        const totalSale = sales.reduce((acc, sale) => {
            const amount = (parseFloat(sale.greenCoffeeMass) || 0) * (parseFloat(sale.pricePerLb) || 0);
            return acc + amount;
        }, 0);

        const totalCost = costs.reduce((acc, cost) => acc + (parseFloat(cost.amount) || 0), 0);
        
        const profit = totalSale - totalCost;
        
        return { totalSale, totalCost, profit };
    }, [sales, costs]);
    
    return (
        <Card title="Resumen Financiero del Lote" icon={<span>📊</span>}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center p-6">
                <div>
                    <p className="text-md text-stone-500 uppercase tracking-wider">Venta Total</p>
                    <p className="text-4xl font-bold text-green-600 mt-2">{formatCurrency(totalSale)}</p>
                </div>
                <div>
                    <p className="text-md text-stone-500 uppercase tracking-wider">Costo Total</p>
                    <p className="text-4xl font-bold text-red-600 mt-2">{formatCurrency(totalCost)}</p>
                </div>
                <div>
                    <p className="text-md text-stone-500 uppercase tracking-wider">Ganancia Neta</p>
                    <p className={`text-4xl font-bold mt-2 ${profit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {formatCurrency(profit)}
                    </p>
                </div>
            </div>
        </Card>
    );
}

export default LotSummaryCard;
