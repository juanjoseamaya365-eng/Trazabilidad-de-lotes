import React from 'react';
import type { CoffeeLot } from '../../types';
import Card from '../Card';
import Input from '../Input';
import Textarea from '../Textarea';

interface Props {
  lot: CoffeeLot;
  setLot: React.Dispatch<React.SetStateAction<CoffeeLot>>;
}

const AnalysisCard: React.FC<Props> = ({ lot, setLot }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLot(prev => ({
      ...prev,
      analysis: { ...prev.analysis, [name]: value },
    }));
  };

  return (
    <Card title="6. Análisis Físico y Sensorial" icon={<span>🔬</span>}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input label="Fecha de catación" name="cuppingDate" type="date" value={lot.analysis.cuppingDate} onChange={handleChange} />
          <Input label="Catador" name="cupper" value={lot.analysis.cupper} onChange={handleChange} />
          <Input label="Humedad antes del trillado (%)" name="humidityBeforeThreshing" type="number" value={lot.analysis.humidityBeforeThreshing} onChange={handleChange} />
          <Input label="Actividad de agua (aw)" name="waterActivity" type="number" value={lot.analysis.waterActivity} onChange={handleChange} />
          <Input label="Malla predominante" name="predominantMesh" type="number" value={lot.analysis.predominantMesh} onChange={handleChange} />
          <Input label="Densidad (g/L)" name="densityG_L" type="number" value={lot.analysis.densityG_L} onChange={handleChange} />
          <Input label="Defectos (primarios/secundarios)" name="defects" value={lot.analysis.defects} onChange={handleChange} />
          <Input label="Puntaje total (SCA)" name="totalScoreSCA" type="number" value={lot.analysis.totalScoreSCA} onChange={handleChange} />
        </div>
        <Textarea label="Perfil sensorial" name="sensoryProfile" value={lot.analysis.sensoryProfile} onChange={handleChange} />
        <Textarea label="Recomendación del catador" name="cupperRecommendation" value={lot.analysis.cupperRecommendation} onChange={handleChange} />
      </div>
    </Card>
  );
};

export default AnalysisCard;
