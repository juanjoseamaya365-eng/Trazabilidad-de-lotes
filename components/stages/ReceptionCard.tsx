import React from 'react';
import type { CoffeeLot } from '../../types';
import Card from '../Card';
import Input from '../Input';
import Textarea from '../Textarea';

interface Props {
  lot: CoffeeLot;
  setLot: React.Dispatch<React.SetStateAction<CoffeeLot>>;
}

const ReceptionCard: React.FC<Props> = ({ lot, setLot }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLot(prev => ({
      ...prev,
      reception: { ...prev.reception, [name]: value },
    }));
  };

  return (
    <Card title="1. Recepción del Café" icon={<span>📝</span>}>
      <div className="space-y-4">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="Código del Lote" name="lotCode" value={lot.lotCode} onChange={e => setLot(prev => ({...prev, lotCode: e.target.value}))} />
            <Input label="Fecha de Recepción" name="receptionDate" type="date" value={lot.reception.receptionDate} onChange={handleChange} />
            <Input label="Finca" name="farm" value={lot.reception.farm} onChange={handleChange} />
            <Input label="Productor" name="producer" value={lot.reception.producer} onChange={handleChange} />
            <Input label="Variedad" name="variety" value={lot.reception.variety} onChange={handleChange} />
            <div>
                 <label htmlFor="process" className="block text-sm font-medium text-stone-600 mb-1">Proceso</label>
                <select name="process" id="process" value={lot.reception.process} onChange={handleChange} className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md">
                    <option value="">Seleccionar...</option>
                    <option value="Natural">Natural</option>
                    <option value="Honey">Honey</option>
                    <option value="Lavado">Lavado</option>
                    <option value="Experimental">Experimental</option>
                </select>
            </div>
            <Input label="Peso fresco (lb)" name="freshWeightLbs" type="number" value={lot.reception.freshWeightLbs} onChange={handleChange} />
            <Input label="Brix promedio" name="averageBrix" type="number" value={lot.reception.averageBrix} onChange={handleChange} />
            <Input label="Humedad inicial (%)" name="initialHumidity" type="number" value={lot.reception.initialHumidity} onChange={handleChange} />
            <Input label="Tipo de recolección" name="collectionType" value={lot.reception.collectionType} onChange={handleChange} />
         </div>
         <Textarea label="Observaciones iniciales" name="initialObservations" value={lot.reception.initialObservations} onChange={handleChange} />
      </div>
    </Card>
  );
};

export default ReceptionCard;
