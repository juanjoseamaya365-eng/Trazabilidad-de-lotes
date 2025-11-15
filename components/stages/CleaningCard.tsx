import React from 'react';
import type { CoffeeLot } from '../../types';
import Card from '../Card';
import Input from '../Input';
import Textarea from '../Textarea';

interface Props {
  lot: CoffeeLot;
  setLot: React.Dispatch<React.SetStateAction<CoffeeLot>>;
}

const CleaningCard: React.FC<Props> = ({ lot, setLot }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLot(prev => ({
      ...prev,
      cleaning: { ...prev.cleaning, [name]: value },
    }));
  };

  return (
    <Card title="2. Limpieza del Café" icon={<span>💧</span>}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="cleaningType" className="block text-sm font-medium text-stone-600 mb-1">Tipo de limpieza</label>
            <select name="cleaningType" id="cleaningType" value={lot.cleaning.cleaningType} onChange={handleChange} className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md">
              <option value="">Seleccionar...</option>
              <option value="Flotado">Flotado</option>
              <option value="Lavado">Lavado</option>
              <option value="Despulpado">Despulpado</option>
            </select>
          </div>
          <Input label="Volumen de agua utilizado (L)" name="waterVolumeL" type="number" value={lot.cleaning.waterVolumeL} onChange={handleChange} />
          <Input label="Temperatura del agua (°C)" name="waterTemperatureC" type="number" value={lot.cleaning.waterTemperatureC} onChange={handleChange} />
          <Input label="Porcentaje de flotadores retirados (%)" name="retiredFloatersPercent" type="number" value={lot.cleaning.retiredFloatersPercent} onChange={handleChange} />
          <div>
            <label htmlFor="disinfectionMethod" className="block text-sm font-medium text-stone-600 mb-1">Método de desinfección</label>
            <select name="disinfectionMethod" id="disinfectionMethod" value={lot.cleaning.disinfectionMethod} onChange={handleChange} className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md">
              <option value="">Seleccionar...</option>
              <option value="Acido peracético">Ácido peracético</option>
              <option value="Ozono">Ozono</option>
              <option value="Ninguno">Ninguno</option>
            </select>
          </div>
          <Input label="Tiempo de escurrido (min)" name="drainingTimeMin" type="number" value={lot.cleaning.drainingTimeMin} onChange={handleChange} />
        </div>
        <Textarea label="Observaciones" name="observations" value={lot.cleaning.observations} onChange={handleChange} />
      </div>
    </Card>
  );
};

export default CleaningCard;
