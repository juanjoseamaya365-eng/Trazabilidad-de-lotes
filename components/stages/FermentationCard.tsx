import React, { useState } from 'react';
import type { CoffeeLot, FermentationMonitoringLog } from '../../types';
import Card from '../Card';
import Input from '../Input';
import Textarea from '../Textarea';

interface Props {
  lot: CoffeeLot;
  setLot: React.Dispatch<React.SetStateAction<CoffeeLot>>;
}

const FermentationCard: React.FC<Props> = ({ lot, setLot }) => {
  const [logEntry, setLogEntry] = useState({ time: '', ph: '', temp: '' });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLot(prev => ({
      ...prev,
      fermentation: { ...prev.fermentation, [name]: value },
    }));
  };
  
  const handleLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogEntry({ ...logEntry, [e.target.name]: e.target.value });
  }

  const addLogEntry = () => {
    if (!logEntry.time || !logEntry.ph || !logEntry.temp) return;
    const newEntry: FermentationMonitoringLog = { id: new Date().toISOString(), ...logEntry };
    setLot(prev => ({
        ...prev,
        fermentation: {
            ...prev.fermentation,
            monitoringLog: [...prev.fermentation.monitoringLog, newEntry]
        }
    }));
    setLogEntry({ time: '', ph: '', temp: '' });
  };
  
  const removeLogEntry = (id: string) => {
    setLot(prev => ({
        ...prev,
        fermentation: {
            ...prev.fermentation,
            monitoringLog: prev.fermentation.monitoringLog.filter(entry => entry.id !== id)
        }
    }));
  }

  return (
    <Card title="3. Fermentación del Café" icon={<span>⏳</span>}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Form fields */}
            <Input label="Tipo de tanque" name="tankType" value={lot.fermentation.tankType} onChange={handleChange}/>
            <Input label="Capacidad del tanque (L)" name="tankCapacityL" type="number" value={lot.fermentation.tankCapacityL} onChange={handleChange} />
            <Input label="Porcentaje de llenado (%)" name="fillPercentage" type="number" value={lot.fermentation.fillPercentage} onChange={handleChange} />
            <Input label="Temperatura inicial (°C)" name="initialTempC" type="number" value={lot.fermentation.initialTempC} onChange={handleChange} />
            <Input label="pH inicial" name="initialPh" type="number" value={lot.fermentation.initialPh} onChange={handleChange} />
            <Input label="Fecha y hora de inicio" name="startTime" type="datetime-local" value={lot.fermentation.startTime} onChange={handleChange} />
            <Input label="Tipo de fermentación" name="fermentationType" value={lot.fermentation.fermentationType} onChange={handleChange}/>
            <Input label="Duración estimada (h)" name="estimatedDurationH" type="number" value={lot.fermentation.estimatedDurationH} onChange={handleChange} />
            <Input label="Intervalos de monitoreo (h)" name="monitoringIntervalH" type="number" value={lot.fermentation.monitoringIntervalH} onChange={handleChange} />
            <Input label="Aroma del mucílago" name="mucilageAroma" value={lot.fermentation.mucilageAroma} onChange={handleChange} />
            <Input label="Fin de fermentación (fecha/hora)" name="endTime" type="datetime-local" value={lot.fermentation.endTime} onChange={handleChange} />
            <Input label="pH final" name="finalPh" type="number" value={lot.fermentation.finalPh} onChange={handleChange} />
            <Input label="Temperatura final (°C)" name="finalTempC" type="number" value={lot.fermentation.finalTempC} onChange={handleChange} />
        </div>
        
        {/* Monitoring Log Section */}
        <div className="border-t pt-4">
            <h4 className="font-semibold text-md mb-2">Registro de Monitoreo (pH y Temperatura)</h4>
            <div className="grid grid-cols-4 gap-2 items-end mb-2 p-2 bg-stone-50 rounded">
                <Input label="Hora (ej. 24h)" name="time" value={logEntry.time} onChange={handleLogChange} />
                <Input label="Valor pH" name="ph" type="number" value={logEntry.ph} onChange={handleLogChange} />
                <Input label="Valor Temp (°C)" name="temp" type="number" value={logEntry.temp} onChange={handleLogChange} />
                <button onClick={addLogEntry} className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-900 h-10">Agregar</button>
            </div>
            <div className="overflow-x-auto">
                 <table className="min-w-full">
                    <thead className="bg-stone-100"><tr>
                        <th className="p-2 text-left text-sm font-medium">Hora</th>
                        <th className="p-2 text-left text-sm font-medium">pH</th>
                        <th className="p-2 text-left text-sm font-medium">Temperatura</th>
                        <th></th>
                    </tr></thead>
                    <tbody>
                        {lot.fermentation.monitoringLog.map(entry => (
                            <tr key={entry.id} className="border-b">
                                <td className="p-2">{entry.time}</td>
                                <td className="p-2">{entry.ph}</td>
                                <td className="p-2">{entry.temp}</td>
                                <td className="p-2 text-right"><button onClick={() => removeLogEntry(entry.id)} className="text-red-500">X</button></td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
        </div>

        <Textarea label="Observaciones finales" name="finalObservations" value={lot.fermentation.finalObservations} onChange={handleChange} />
      </div>
    </Card>
  );
};

export default FermentationCard;
