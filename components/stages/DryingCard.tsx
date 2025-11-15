import React, { useState } from 'react';
import type { CoffeeLot, DryingHumidityCurveLog } from '../../types';
import Card from '../Card';
import Input from '../Input';
import Textarea from '../Textarea';

interface Props {
  lot: CoffeeLot;
  setLot: React.Dispatch<React.SetStateAction<CoffeeLot>>;
}

const DryingCard: React.FC<Props> = ({ lot, setLot }) => {
  const [logEntry, setLogEntry] = useState({ day: '', humidity: '' });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLot(prev => ({
      ...prev,
      drying: { ...prev.drying, [name]: value },
    }));
  };

  const handleLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogEntry({ ...logEntry, [e.target.name]: e.target.value });
  }

  const addLogEntry = () => {
    if (!logEntry.day || !logEntry.humidity) return;
    const newEntry: DryingHumidityCurveLog = { id: new Date().toISOString(), ...logEntry };
    setLot(prev => ({
        ...prev,
        drying: {
            ...prev.drying,
            humidityCurve: [...prev.drying.humidityCurve, newEntry]
        }
    }));
    setLogEntry({ day: '', humidity: '' });
  };
  
  const removeLogEntry = (id: string) => {
    setLot(prev => ({
        ...prev,
        drying: {
            ...prev.drying,
            humidityCurve: prev.drying.humidityCurve.filter(entry => entry.id !== id)
        }
    }));
  }

  return (
    <Card title="4. Secado del Café" icon={<span>☀️</span>}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input label="Método de secado" name="dryingMethod" value={lot.drying.dryingMethod} onChange={handleChange} />
          <Input label="Área de secado (m²)" name="dryingAreaM2" type="number" value={lot.drying.dryingAreaM2} onChange={handleChange} />
          <Input label="Carga inicial (lb/m²)" name="initialLoadLbM2" type="number" value={lot.drying.initialLoadLbM2} onChange={handleChange} />
          <Input label="Temperatura ambiente (°C)" name="ambientTempC" type="number" value={lot.drying.ambientTempC} onChange={handleChange} />
          <Input label="Humedad relativa ambiente (%)" name="ambientRelativeHumidity" type="number" value={lot.drying.ambientRelativeHumidity} onChange={handleChange} />
          <Input label="Tiempo total de secado (días)" name="totalDryingDays" type="number" value={lot.drying.totalDryingDays} onChange={handleChange} />
          <Input label="Removido (frecuencia)" name="stirringFrequency" value={lot.drying.stirringFrequency} onChange={handleChange} />
          <Input label="Peso final del lote (lb)" name="finalLotWeightLb" type="number" value={lot.drying.finalLotWeightLb} onChange={handleChange} />
          <Input label="Porcentaje de pérdida (%)" name="lossPercentage" type="number" value={lot.drying.lossPercentage} onChange={handleChange} />
        </div>

        {/* Humidity Curve Section */}
        <div className="border-t pt-4">
            <h4 className="font-semibold text-md mb-2">Registro de Curva de Humedad Diaria</h4>
            <div className="grid grid-cols-3 gap-2 items-end mb-2 p-2 bg-stone-50 rounded">
                <Input label="Día (ej. Día 1)" name="day" value={logEntry.day} onChange={handleLogChange} />
                <Input label="Humedad (%)" name="humidity" type="number" value={logEntry.humidity} onChange={handleLogChange} />
                <button onClick={addLogEntry} className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 h-10">Agregar</button>
            </div>
            <div className="overflow-x-auto">
                 <table className="min-w-full">
                    <thead className="bg-stone-100"><tr>
                        <th className="p-2 text-left text-sm font-medium">Día</th>
                        <th className="p-2 text-left text-sm font-medium">Humedad (%)</th>
                        <th></th>
                    </tr></thead>
                    <tbody>
                        {lot.drying.humidityCurve.map(entry => (
                            <tr key={entry.id} className="border-b">
                                <td className="p-2">{entry.day}</td>
                                <td className="p-2">{entry.humidity}</td>
                                <td className="p-2 text-right"><button onClick={() => removeLogEntry(entry.id)} className="text-red-500">X</button></td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>

        <Textarea label="Observaciones" name="observations" value={lot.drying.observations} onChange={handleChange} />
      </div>
    </Card>
  );
};

export default DryingCard;
