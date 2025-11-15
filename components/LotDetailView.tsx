import React, { useState, useEffect } from 'react';
import type { CoffeeLot, Sale, Cost } from '../types';
import TabButton from './TabButton';
import ReceptionCard from './stages/ReceptionCard';
import CleaningCard from './stages/CleaningCard';
import FermentationCard from './stages/FermentationCard';
import DryingCard from './stages/DryingCard';
import StorageCard from './stages/StorageCard';
import AnalysisCard from './stages/AnalysisCard';
import FeedbackCard from './stages/FeedbackCard';
import LotSalesCard from './LotSalesCard';
import LotCostsCard from './LotCostsCard';
import LotSummaryCard from './LotSummaryCard';

interface LotDetailViewProps {
  lot: CoffeeLot;
  sales: Sale[];
  costs: Cost[];
  onBack: () => void;
  onSaveLot: (lot: CoffeeLot) => void;
  onSaveSale: (sale: Sale) => void;
  onDeleteSale: (id: string) => void;
  onSaveCost: (cost: Cost) => void;
  onDeleteCost: (id: string) => void;
}

const TABS = [
  '1. Recepción', '2. Limpieza', '3. Fermentación', '4. Secado', 
  '5. Almacenamiento', '6. Análisis', '7. Retroalimentación',
  'Ventas', 'Costos', 'Resumen'
];

const LotDetailView: React.FC<LotDetailViewProps> = (props) => {
  const { lot, onBack, onSaveLot } = props;
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [editedLot, setEditedLot] = useState<CoffeeLot>(lot);

  useEffect(() => {
    setEditedLot(lot);
  }, [lot]);

  const handleSave = () => {
    onSaveLot(editedLot);
    alert('Lote guardado exitosamente!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case '1. Recepción':
        return <ReceptionCard lot={editedLot} setLot={setEditedLot} />;
      case '2. Limpieza':
        return <CleaningCard lot={editedLot} setLot={setEditedLot} />;
      case '3. Fermentación':
          return <FermentationCard lot={editedLot} setLot={setEditedLot} />;
      case '4. Secado':
          return <DryingCard lot={editedLot} setLot={setEditedLot} />;
      case '5. Almacenamiento':
          return <StorageCard lot={editedLot} setLot={setEditedLot} />;
      case '6. Análisis':
          return <AnalysisCard lot={editedLot} setLot={setEditedLot} />;
      case '7. Retroalimentación':
          return <FeedbackCard lot={editedLot} setLot={setEditedLot} />;
      case 'Ventas':
          return <LotSalesCard lotId={lot.id} sales={props.sales} onSave={props.onSaveSale} onDelete={props.onDeleteSale} />;
      case 'Costos':
          return <LotCostsCard lotId={lot.id} costs={props.costs} onSave={props.onSaveCost} onDelete={props.onDeleteCost} />;
      case 'Resumen':
          return <LotSummaryCard sales={props.sales} costs={props.costs} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button onClick={onBack} className="text-amber-800 hover:underline mb-2">&larr; Volver a la lista de lotes</button>
          <h1 className="text-2xl font-bold text-stone-800">
            Trazabilidad Lote: <span className="text-amber-900">{editedLot.lotCode}</span>
          </h1>
          <p className="text-stone-600">Finca: {editedLot.reception.farm}</p>
        </div>
        <button 
          onClick={handleSave} 
          className="bg-green-700 text-white px-6 py-2 rounded-lg shadow hover:bg-green-800 transition-colors"
        >
          Guardar Cambios
        </button>
      </div>

      <div className="bg-white p-2 rounded-lg shadow-md">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {TABS.map(tab => (
            <TabButton key={tab} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default LotDetailView;
