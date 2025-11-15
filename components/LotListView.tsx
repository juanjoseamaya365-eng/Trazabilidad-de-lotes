import React from 'react';
import type { CoffeeLot, Sale, Cost } from '../types';
import Card from './Card';
import generateLotPdf from '../utils/pdfGenerator';
import generateLotExcel from '../utils/excelGenerator';

interface LotListViewProps {
  lots: CoffeeLot[];
  sales: Sale[];
  costs: Cost[];
  onSelectLot: (id: string) => void;
  onDeleteLot: (id: string) => void;
  onAddLot: () => void;
}

const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" /></svg>
);

const CoffeeBeanIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12C20,14.42 18.95,16.6 17.3,18C15,20.05 12.05,20 12,20C11.4,20 10.5,19.8 9.75,19.5C9,19.2 8.5,19.05 8,19C4.5,17.5 4,14.15 4,12A8,8 0 0,1 12,4Z" /></svg>
);


const LotListView: React.FC<LotListViewProps> = ({ lots, sales, costs, onSelectLot, onDeleteLot, onAddLot }) => {
    
    const handleDownloadPdf = (lot: CoffeeLot) => {
        const lotSales = sales.filter(s => s.lotId === lot.id);
        const lotCosts = costs.filter(c => c.lotId === lot.id);
        generateLotPdf(lot, lotSales, lotCosts);
    };

    const handleDownloadExcel = (lot: CoffeeLot) => {
        const lotSales = sales.filter(s => s.lotId === lot.id);
        const lotCosts = costs.filter(c => c.lotId === lot.id);
        generateLotExcel(lot, lotSales, lotCosts);
    };
    
  return (
    <Card 
      title="Lotes de Trazabilidad" 
      icon={<CoffeeBeanIcon className="h-6 w-6"/>}
      actions={<button onClick={onAddLot} className="flex items-center px-3 py-1.5 text-sm bg-amber-800 text-white rounded-md hover:bg-amber-900 shadow"><PlusIcon className="h-4 w-4 mr-1" />Crear Nuevo Lote</button>}
    >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b-2 border-stone-200">
              <tr>
                <th className="text-left p-3 text-sm font-semibold text-stone-600">Código Lote</th>
                <th className="text-left p-3 text-sm font-semibold text-stone-600">Finca</th>
                <th className="text-left p-3 text-sm font-semibold text-stone-600">Variedad</th>
                <th className="text-left p-3 text-sm font-semibold text-stone-600">Proceso</th>
                <th className="text-right p-3 text-sm font-semibold text-stone-600">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lots.length > 0 ? lots.map(lot => (
                <tr key={lot.id} className="border-b border-stone-200 hover:bg-stone-50">
                  <td className="p-3 text-sm font-medium text-stone-900">{lot.lotCode}</td>
                  <td className="p-3 text-sm text-stone-600">{lot.reception.farm}</td>
                  <td className="p-3 text-sm text-stone-600">{lot.reception.variety}</td>
                  <td className="p-3 text-sm text-stone-600">{lot.reception.process}</td>
                  <td className="p-3 text-right space-x-4">
                    <button onClick={() => handleDownloadPdf(lot)} className="font-medium text-sky-700 hover:text-sky-900">Informe</button>
                    <button onClick={() => handleDownloadExcel(lot)} className="font-medium text-green-700 hover:text-green-900">Excel</button>
                    <button onClick={() => onSelectLot(lot.id)} className="font-medium text-amber-700 hover:text-amber-900">Detalles</button>
                    <button onClick={(e) => { e.stopPropagation(); onDeleteLot(lot.id); }} className="font-medium text-red-600 hover:text-red-800">Eliminar</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={5} className="p-4 text-center text-stone-500">No hay lotes registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
    </Card>
  );
};

export default LotListView;