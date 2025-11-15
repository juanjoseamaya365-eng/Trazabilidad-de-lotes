import type { CoffeeLot, Sale, Cost } from './types';

export const initialLots: CoffeeLot[] = [
  {
    id: 'lot-1',
    lotCode: 'LJ-2025-FV-NAT-001',
    reception: {
      receptionDate: '2025-11-10',
      farm: 'La Joya Family Estates',
      producer: 'Juan Valdez',
      variety: 'Pacamara / Bourbon Sidra',
      process: 'Natural',
      freshWeightLbs: '100',
      averageBrix: '19.2',
      initialHumidity: '73',
      collectionType: 'Selectiva manual',
      initialObservations: 'Cerezas uniformes, sin defectos visibles.',
    },
    cleaning: {
        cleaningType: 'Flotado',
        waterVolumeL: '120',
        waterTemperatureC: '22',
        retiredFloatersPercent: '3.5',
        disinfectionMethod: 'Ninguno',
        drainingTimeMin: '25',
        observations: 'Agua clara, sin residuos visibles.',
    },
    fermentation: {
        tankType: 'Plástico grado alimenticio',
        tankCapacityL: '500',
        fillPercentage: '80',
        initialTempC: '22',
        initialPh: '6.3',
        startTime: '2025-11-10T17:00',
        fermentationType: 'Anaeróbica',
        estimatedDurationH: '72',
        monitoringIntervalH: '12',
        monitoringLog: [
            { id: 'fm-1', time: '24h', ph: '5.2', temp: '25' },
            { id: 'fm-2', time: '48h', ph: '4.3', temp: '26' },
        ],
        mucilageAroma: 'Frutal, vino tinto',
        endTime: '2025-11-13T17:00',
        finalPh: '4.0',
        finalTempC: '24',
        finalObservations: 'Perfil limpio, sin notas vinagrosas.',
    },
    drying: {
        dryingMethod: 'Cama africana',
        dryingAreaM2: '3.8',
        initialLoadLbM2: '26.4',
        ambientTempC: '30',
        ambientRelativeHumidity: '55',
        totalDryingDays: '17',
        humidityCurve: [
            { id: 'dc-1', day: 'Día 1', humidity: '53' },
            { id: 'dc-2', day: 'Día 17', humidity: '11.5' },
        ],
        stirringFrequency: 'Cada hora',
        finalLotWeightLb: '30.3',
        lossPercentage: 'Calculado...',
        observations: 'Secado uniforme, sin fermentaciones tardías.',
    },
    storage: {
        entryDate: '2025-11-28',
        finalHumidity: '11.1',
        warehouseTempC: '20',
        relativeHumidity: '62',
        packagingType: 'GrainPro',
        bagCode: 'LJ-2025-FV-03',
        positionInWarehouse: 'Estantería 2, fila 3',
        observations: 'Café estable y limpio, sin olores externos.',
    },
    analysis: {
        cuppingDate: '2025-12-10',
        cupper: 'Juan J. Amaya / Panel Coffee Campus',
        humidityBeforeThreshing: '10.8',
        waterActivity: '0.59',
        predominantMesh: '17',
        densityG_L: '760',
        defects: '0/2',
        totalScoreSCA: '87.25',
        sensoryProfile: 'Dulzor pronunciado, notas de durazno, jazmín y miel.',
        cupperRecommendation: 'Ajustar fermentación a 60 h para potenciar acidez cítrica.',
    },
    feedback: {
        generalObservations: 'Lote con excelente comportamiento microbiológico.',
        technicalRecommendations: 'Monitorear temperatura externa las primeras 24 h.',
        comparisonWithPreviousLots: 'Lote 2024-FV-NAT-02 obtuvo pH final 4.1.',
        attachedFile: 'Fotos, videos, certificados Q-grader, etc.',
    },
  },
];

export const initialSales: Sale[] = [
    {
      id: 'sale-1',
      lotId: 'lot-1',
      date: '2026-01-15',
      buyer: 'Comprador Internacional S.A.',
      greenCoffeeMass: '30',
      cuppingScore: '87.25',
      pricePerLb: '15',
      descriptors: 'Durazno, jazmín, miel',
      packagingType: 'GrainPro',
    }
];

export const initialCosts: Cost[] = [
    { id: 'cost-1', lotId: 'lot-1', date: '2025-11-10', description: 'Pago Recolectores', category: 'Mano de Obra', amount: '350' },
    { id: 'cost-2', lotId: 'lot-1', date: '2025-11-28', description: 'Sacos GrainPro', category: 'Insumos', amount: '50' },
];
