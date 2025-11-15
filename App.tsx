
import React, { useState, useMemo, useEffect } from 'react';
import type { CoffeeLot, Sale, Cost } from './types';
import { initialLots, initialSales, initialCosts } from './initialData';
import Header from './components/Header';
import DashboardSection from './components/DashboardSection';
import LotListView from './components/LotListView';
import LotDetailView from './components/LotDetailView';

// --- Helper Functions for Local Storage ---
const getInitialState = <T,>(storageKey: string, fallbackData: T): T => {
  try {
    const item = window.localStorage.getItem(storageKey);
    return item ? JSON.parse(item) : fallbackData;
  } catch (error) {
    console.error(`Error reading from localStorage key “${storageKey}”:`, error);
    return fallbackData;
  }
};

const App: React.FC = () => {
  const [coffeeLots, setCoffeeLots] = useState<CoffeeLot[]>(() => getInitialState('coffeeTraceability_lots', initialLots));
  const [sales, setSales] = useState<Sale[]>(() => getInitialState('coffeeTraceability_sales', initialSales));
  const [costs, setCosts] = useState<Cost[]>(() => getInitialState('coffeeTraceability_costs', initialCosts));
  const [selectedLotId, setSelectedLotId] = useState<string | null>(null);

  // --- Effects to persist state to localStorage ---
  useEffect(() => {
    window.localStorage.setItem('coffeeTraceability_lots', JSON.stringify(coffeeLots));
  }, [coffeeLots]);
  
  useEffect(() => {
    window.localStorage.setItem('coffeeTraceability_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    window.localStorage.setItem('coffeeTraceability_costs', JSON.stringify(costs));
  }, [costs]);

  // --- CRUD Operations ---

  // Lot Operations
  const handleSaveLot = (lot: CoffeeLot) => {
    const exists = coffeeLots.find(l => l.id === lot.id);
    if (exists) {
      setCoffeeLots(coffeeLots.map(l => l.id === lot.id ? lot : l));
    } else {
      setCoffeeLots([...coffeeLots, lot]);
    }
    setSelectedLotId(lot.id); // Stay on the detail view after save
  };

  const deleteLot = (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este lote y todos sus datos asociados?')) {
      setCoffeeLots(coffeeLots.filter(l => l.id !== id));
      setSales(sales.filter(s => s.lotId !== id));
      setCosts(costs.filter(c => c.lotId !== id));
      if (selectedLotId === id) {
        setSelectedLotId(null);
      }
    }
  };

  // Sale Operations
  const handleSaveSale = (sale: Sale) => {
     const exists = sales.find(s => s.id === sale.id);
    if (exists) {
      setSales(sales.map(s => s.id === sale.id ? sale : s));
    } else {
      setSales([...sales, sale]);
    }
  }

  const deleteSale = (id: string) => {
    setSales(sales.filter(s => s.id !== id));
  }
  
  // Cost Operations
  const handleSaveCost = (cost: Cost) => {
     const exists = costs.find(c => c.id === cost.id);
    if (exists) {
      setCosts(costs.map(c => c.id === cost.id ? cost : c));
    } else {
      setCosts([...costs, cost]);
    }
  }

  const deleteCost = (id: string) => {
    setCosts(costs.filter(c => c.id !== id));
  }

  const selectedLot = useMemo(() => {
    return coffeeLots.find(lot => lot.id === selectedLotId) || null;
  }, [selectedLotId, coffeeLots]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        {!selectedLot ? (
           <div className="space-y-6">
            <DashboardSection lots={coffeeLots} sales={sales} costs={costs} />
            <LotListView 
              lots={coffeeLots} 
              sales={sales}
              costs={costs}
              onSelectLot={setSelectedLotId} 
              onDeleteLot={deleteLot} 
              onAddLot={() => {
                  const newLot: CoffeeLot = {
                    id: `lot-${new Date().getTime()}`,
                    lotCode: 'Nuevo Lote',
                    reception: { receptionDate: '', farm: '', producer: '', variety: '', process: '', freshWeightLbs: '', averageBrix: '', initialHumidity: '', collectionType: '', initialObservations: '' },
                    cleaning: { cleaningType: '', waterVolumeL: '', waterTemperatureC: '', retiredFloatersPercent: '', disinfectionMethod: '', drainingTimeMin: '', observations: '' },
                    fermentation: { tankType: '', tankCapacityL: '', fillPercentage: '', initialTempC: '', initialPh: '', startTime: '', fermentationType: '', estimatedDurationH: '', monitoringIntervalH: '', monitoringLog: [], mucilageAroma: '', endTime: '', finalPh: '', finalTempC: '', finalObservations: '' },
                    drying: { dryingMethod: '', dryingAreaM2: '', initialLoadLbM2: '', ambientTempC: '', ambientRelativeHumidity: '', totalDryingDays: '', humidityCurve: [], stirringFrequency: '', finalLotWeightLb: '', lossPercentage: '', observations: '' },
                    storage: { entryDate: '', finalHumidity: '', warehouseTempC: '', relativeHumidity: '', packagingType: '', bagCode: '', positionInWarehouse: '', observations: '' },
                    analysis: { cuppingDate: '', cupper: '', humidityBeforeThreshing: '', waterActivity: '', predominantMesh: '', densityG_L: '', defects: '', totalScoreSCA: '', sensoryProfile: '', cupperRecommendation: '' },
                    feedback: { generalObservations: '', technicalRecommendations: '', comparisonWithPreviousLots: '', attachedFile: '' },
                  };
                  handleSaveLot(newLot);
                  setSelectedLotId(newLot.id);
              }}
            />
           </div>
        ) : (
          <LotDetailView 
            lot={selectedLot} 
            sales={sales.filter(s => s.lotId === selectedLot.id)}
            costs={costs.filter(c => c.lotId === selectedLot.id)}
            onBack={() => setSelectedLotId(null)} 
            onSaveLot={handleSaveLot}
            onSaveSale={handleSaveSale}
            onDeleteSale={deleteSale}
            onSaveCost={handleSaveCost}
            onDeleteCost={deleteCost}
          />
        )}
      </main>
    </div>
  );
};

export default App;
