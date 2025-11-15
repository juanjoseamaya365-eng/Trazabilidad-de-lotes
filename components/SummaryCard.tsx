
import React from 'react';

interface SummaryCardProps {
    totalSale: number;
    totalCost: number;
    profit: number;
}

const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const SummaryCard: React.FC<SummaryCardProps> = ({ totalSale, totalCost, profit }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-5">
            <h2 className="text-lg font-semibold text-stone-700 mb-4 text-center">Resumen Financiero del Lote</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-sm text-stone-500">Venta Total</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalSale)}</p>
                </div>
                <div>
                    <p className="text-sm text-stone-500">Costo Total</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(totalCost)}</p>
                </div>
                <div>
                    <p className="text-sm text-stone-500">Ganancia Neta</p>
                    <p className={`text-2xl font-bold ${profit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {formatCurrency(profit)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SummaryCard;
