import React from 'react';
import type { CoffeeLot } from '../../types';
import Card from '../Card';
import Input from '../Input';
import Textarea from '../Textarea';

interface Props {
  lot: CoffeeLot;
  setLot: React.Dispatch<React.SetStateAction<CoffeeLot>>;
}

const StorageCard: React.FC<Props> = ({ lot, setLot }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLot(prev => ({
      ...prev,
      storage: { ...prev.storage, [name]: value },
    }));
  };

  return (
    <Card title="5. Almacenamiento" icon={<span>📦</span>}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input label="Fecha de ingreso a bodega" name="entryDate" type="date" value={lot.storage.entryDate} onChange={handleChange} />
          <Input label="Humedad final (%)" name="finalHumidity" type="number" value={lot.storage.finalHumidity} onChange={handleChange} />
          <Input label="Temperatura del almacén (°C)" name="warehouseTempC" type="number" value={lot.storage.warehouseTempC} onChange={handleChange} />
          <Input label="Humedad relativa (%)" name="relativeHumidity" type="number" value={lot.storage.relativeHumidity} onChange={handleChange} />
          <div>
            <label htmlFor="packagingType" className="block text-sm font-medium text-stone-600 mb-1">Tipo de empaque</label>
            <select name="packagingType" id="packagingType" value={lot.storage.packagingType} onChange={handleChange} className="w-full px-3 py-2 text-stone-800 bg-stone-50 border border-stone-300 rounded-md">
              <option value="">Seleccionar...</option>
              <option value="GrainPro">GrainPro</option>
              <option value="Yute">Yute</option>
              <option value="Mixto">Mixto</option>
            </select>
          </div>
          <Input label="Código de saco" name="bagCode" value={lot.storage.bagCode} onChange={handleChange} />
          <Input label="Posición en bodega" name="positionInWarehouse" value={lot.storage.positionInWarehouse} onChange={handleChange} />
        </div>
        <Textarea label="Observaciones" name="observations" value={lot.storage.observations} onChange={handleChange} />
      </div>
    </Card>
  );
};

export default StorageCard;
