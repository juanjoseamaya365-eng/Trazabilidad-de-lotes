export interface ReceptionData {
  receptionDate: string;
  farm: string;
  producer: string;
  variety: string;
  process: 'Natural' | 'Honey' | 'Lavado' | 'Experimental' | '';
  freshWeightLbs: string;
  averageBrix: string;
  initialHumidity: string;
  collectionType: string;
  initialObservations: string;
}

export interface CleaningData {
  cleaningType: 'Flotado' | 'Lavado' | 'Despulpado' | '';
  waterVolumeL: string;
  waterTemperatureC: string;
  retiredFloatersPercent: string;
  disinfectionMethod: 'Acido peracético' | 'Ozono' | 'Ninguno' | '';
  drainingTimeMin: string;
  observations: string;
}

export interface FermentationMonitoringLog {
  id: string;
  time: string;
  ph: string;
  temp: string;
}

export interface FermentationData {
  tankType: 'Plástico grado alimenticio' | 'Inoxidable' | '';
  tankCapacityL: string;
  fillPercentage: string;
  initialTempC: string;
  initialPh: string;
  startTime: string;
  fermentationType: 'Aeróbica' | 'Anaeróbica' | 'Con levadura' | 'Experimental' | '';
  estimatedDurationH: string;
  monitoringIntervalH: string;
  monitoringLog: FermentationMonitoringLog[];
  mucilageAroma: string;
  endTime: string;
  finalPh: string;
  finalTempC: string;
  finalObservations: string;
}

export interface DryingHumidityCurveLog {
    id: string;
    day: string;
    humidity: string;
}

export interface DryingData {
  dryingMethod: 'Marquesina' | 'Cama africana' | 'Secador híbrido' | '';
  dryingAreaM2: string;
  initialLoadLbM2: string;
  ambientTempC: string;
  ambientRelativeHumidity: string;
  totalDryingDays: string;
  humidityCurve: DryingHumidityCurveLog[];
  stirringFrequency: 'Cada 30 min' | 'Cada hora' | '';
  finalLotWeightLb: string;
  lossPercentage: string;
  observations: string;
}

export interface StorageData {
  entryDate: string;
  finalHumidity: string;
  warehouseTempC: string;
  relativeHumidity: string;
  packagingType: 'GrainPro' | 'Yute' | 'Mixto' | '';
  bagCode: string;
  positionInWarehouse: string;
  observations: string;
}

export interface AnalysisData {
  cuppingDate: string;
  cupper: string;
  humidityBeforeThreshing: string;
  waterActivity: string;
  predominantMesh: string;
  densityG_L: string;
  defects: string;
  totalScoreSCA: string;
  sensoryProfile: string;
  cupperRecommendation: string;
}

export interface FeedbackData {
  generalObservations: string;
  technicalRecommendations: string;
  comparisonWithPreviousLots: string;
  attachedFile: string;
}

// FIX: Add Producer interface to resolve import errors in several components.
export interface Producer {
  id: string;
  farmName: string;
  lot: string;
  variety: string;
  processType: string;
  startDate: string;
  initialMass: string;
  endDate: string;
  finalMass: string;
}

export interface CoffeeLot {
  id: string;
  lotCode: string;
  reception: ReceptionData;
  cleaning: CleaningData;
  fermentation: FermentationData;
  drying: DryingData;
  storage: StorageData;
  analysis: AnalysisData;
  feedback: FeedbackData;
}

export interface Sale {
  id: string;
  lotId: string;
  // FIX: Add optional producerId for compatibility with producer-centric components.
  producerId?: string;
  date: string;
  buyer: string;
  greenCoffeeMass: string;
  cuppingScore: string;
  pricePerLb: string;
  descriptors: string;
  packagingType: string;
}

export interface Cost {
  id: string;
  lotId: string;
  // FIX: Add optional producerId for compatibility with producer-centric components.
  producerId?: string;
  date: string;
  description: string;
  category: 'Mano de Obra' | 'Insumos' | 'Transporte' | 'Administrativo' | 'Otros' | '';
  amount: string;
}
