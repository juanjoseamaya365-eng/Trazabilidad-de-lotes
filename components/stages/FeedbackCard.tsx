import React from 'react';
import type { CoffeeLot } from '../../types';
import Card from '../Card';
import Textarea from '../Textarea';
import Input from '../Input';

interface Props {
  lot: CoffeeLot;
  setLot: React.Dispatch<React.SetStateAction<CoffeeLot>>;
}

const FeedbackCard: React.FC<Props> = ({ lot, setLot }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLot(prev => ({
      ...prev,
      feedback: { ...prev.feedback, [name]: value },
    }));
  };

  return (
    <Card title="7. Seguimiento y Retroalimentación" icon={<span>📈</span>}>
      <div className="space-y-4">
        <Textarea label="Observaciones generales" name="generalObservations" value={lot.feedback.generalObservations} onChange={handleChange} />
        <Textarea label="Recomendaciones técnicas" name="technicalRecommendations" value={lot.feedback.technicalRecommendations} onChange={handleChange} />
        <Textarea label="Comparativo con lotes anteriores (Enlace / gráfico)" name="comparisonWithPreviousLots" value={lot.feedback.comparisonWithPreviousLots} onChange={handleChange} />
        <Input label="Archivo adjunto (Notas de Fotos, videos, certificados)" name="attachedFile" value={lot.feedback.attachedFile} onChange={handleChange} />
      </div>
    </Card>
  );
};

export default FeedbackCard;
