import type { CoffeeLot, Sale, Cost } from '../types';

// Let TypeScript know that jsPDF and autoTable are available globally
declare const jspdf: any;

const generateLotPdf = (lot: CoffeeLot, sales: Sale[], costs: Cost[]) => {
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    let yPos = 20;

    // --- Helper Functions ---
    const addHeader = () => {
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Informe de Trazabilidad de Lote', 105, yPos, { align: 'center' });
        yPos += 10;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'normal');
        doc.text(`Lote: ${lot.lotCode}`, 105, yPos, { align: 'center' });
        yPos += 6;
        doc.text(`Finca: ${lot.reception.farm}`, 105, yPos, { align: 'center' });
        yPos += 10;
        doc.setLineWidth(0.5);
        doc.line(15, yPos, 195, yPos);
        yPos += 10;
    };

    const addSection = (title: string, data: [string, any][]) => {
        // Filter out empty/null values before creating the table
        const filteredData = data.filter(([, value]) => value !== '' && value !== null && value !== undefined);
        if(filteredData.length === 0) return;

        doc.autoTable({
            startY: yPos,
            head: [[{ content: title, colSpan: 2, styles: { fillColor: [75, 85, 99], fontStyle: 'bold' } }]],
            body: filteredData,
            theme: 'striped',
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 60 },
            },
            didDrawPage: (data: any) => {
                 yPos = data.cursor.y;
            }
        });
        yPos = (doc as any).lastAutoTable.finalY + 10;
    };

    const addTableSection = (title: string, head: string[][], body: (string|number)[][]) => {
         if (body.length === 0) return;

         doc.autoTable({
            startY: yPos,
            head: [[{ content: title, colSpan: head[0].length, styles: { fillColor: [75, 85, 99], fontStyle: 'bold' } }]],
            didDrawPage: (data: any) => {
                 yPos = data.cursor.y;
            }
        });
        yPos = (doc as any).lastAutoTable.finalY;
        doc.autoTable({
            startY: yPos,
            head: head,
            body: body,
            theme: 'grid',
            didDrawPage: (data: any) => {
                 yPos = data.cursor.y;
            }
        });
        yPos = (doc as any).lastAutoTable.finalY + 10;
    }
    
    // --- PDF Content ---
    addHeader();

    // 1. Recepción
    addSection('1. Recepción del Café', [
        ['Fecha de Recepción', lot.reception.receptionDate],
        ['Productor', lot.reception.producer],
        ['Variedad', lot.reception.variety],
        ['Proceso', lot.reception.process],
        ['Peso fresco (lb)', lot.reception.freshWeightLbs],
        ['Brix promedio', lot.reception.averageBrix],
        ['Humedad inicial (%)', lot.reception.initialHumidity],
        ['Tipo de recolección', lot.reception.collectionType],
        ['Observaciones iniciales', lot.reception.initialObservations],
    ]);

    // 2. Limpieza
     addSection('2. Limpieza del Café', [
        ['Tipo de limpieza', lot.cleaning.cleaningType],
        ['Volumen de agua (L)', lot.cleaning.waterVolumeL],
        ['Temperatura del agua (°C)', lot.cleaning.waterTemperatureC],
        ['Flotadores retirados (%)', lot.cleaning.retiredFloatersPercent],
        ['Método de desinfección', lot.cleaning.disinfectionMethod],
        ['Tiempo de escurrido (min)', lot.cleaning.drainingTimeMin],
        ['Observaciones', lot.cleaning.observations],
    ]);

    // 3. Fermentación
     addSection('3. Fermentación del Café', [
        ['Tipo de tanque', lot.fermentation.tankType],
        ['Capacidad del tanque (L)', lot.fermentation.tankCapacityL],
        ['Porcentaje de llenado (%)', lot.fermentation.fillPercentage],
        ['Temperatura inicial (°C)', lot.fermentation.initialTempC],
        ['pH inicial', lot.fermentation.initialPh],
        ['Fecha y hora de inicio', lot.fermentation.startTime ? new Date(lot.fermentation.startTime).toLocaleString() : ''],
        ['Tipo de fermentación', lot.fermentation.fermentationType],
        ['Duración estimada (h)', lot.fermentation.estimatedDurationH],
        ['Intervalos de monitoreo (h)', lot.fermentation.monitoringIntervalH],
        ['Aroma del mucílago', lot.fermentation.mucilageAroma],
        ['Fin de fermentación', lot.fermentation.endTime ? new Date(lot.fermentation.endTime).toLocaleString() : ''],
        ['pH final', lot.fermentation.finalPh],
        ['Temperatura final (°C)', lot.fermentation.finalTempC],
        ['Observaciones finales', lot.fermentation.finalObservations],
    ]);

    addTableSection('Registro de Monitoreo (Fermentación)',
        [['Hora', 'pH', 'Temperatura (°C)']],
        lot.fermentation.monitoringLog.map(log => [log.time, log.ph, log.temp])
    );
    
    // 4. Secado
    addSection('4. Secado del Café', [
        ['Método de secado', lot.drying.dryingMethod],
        ['Área de secado (m²)', lot.drying.dryingAreaM2],
        ['Carga inicial (lb/m²)', lot.drying.initialLoadLbM2],
        ['Temperatura ambiente (°C)', lot.drying.ambientTempC],
        ['Humedad relativa ambiente (%)', lot.drying.ambientRelativeHumidity],
        ['Tiempo total de secado (días)', lot.drying.totalDryingDays],
        ['Frecuencia de removido', lot.drying.stirringFrequency],
        ['Peso final del lote (lb)', lot.drying.finalLotWeightLb],
        ['Observaciones', lot.drying.observations],
    ]);
    
    addTableSection('Curva de Humedad (Secado)',
        [['Día', 'Humedad (%)']],
        lot.drying.humidityCurve.map(log => [log.day, log.humidity])
    );
    
    // 5. Almacenamiento
     addSection('5. Almacenamiento', [
        ['Fecha de ingreso a bodega', lot.storage.entryDate],
        ['Humedad final (%)', lot.storage.finalHumidity],
        ['Temperatura del almacén (°C)', lot.storage.warehouseTempC],
        ['Humedad relativa (%)', lot.storage.relativeHumidity],
        ['Tipo de empaque', lot.storage.packagingType],
        ['Código de saco', lot.storage.bagCode],
        ['Posición en bodega', lot.storage.positionInWarehouse],
        ['Observaciones', lot.storage.observations],
    ]);
    
    // 6. Análisis Físico y Sensorial
    addSection('6. Análisis Físico y Sensorial', [
        ['Fecha de catación', lot.analysis.cuppingDate],
        ['Catador', lot.analysis.cupper],
        ['Humedad antes del trillado (%)', lot.analysis.humidityBeforeThreshing],
        ['Actividad de agua (aw)', lot.analysis.waterActivity],
        ['Malla predominante', lot.analysis.predominantMesh],
        ['Densidad (g/L)', lot.analysis.densityG_L],
        ['Defectos (primarios/secundarios)', lot.analysis.defects],
        ['Puntaje total (SCA)', lot.analysis.totalScoreSCA],
        ['Perfil sensorial', lot.analysis.sensoryProfile],
        ['Recomendación del catador', lot.analysis.cupperRecommendation],
    ]);
    
    // 7. Seguimiento y Retroalimentación
    addSection('7. Seguimiento y Retroalimentación', [
        ['Observaciones generales', lot.feedback.generalObservations],
        ['Recomendaciones técnicas', lot.feedback.technicalRecommendations],
        ['Comparativo con lotes anteriores', lot.feedback.comparisonWithPreviousLots],
        ['Archivo adjunto', lot.feedback.attachedFile],
    ]);

    // 8. Financial Summary
    const totalSale = sales.reduce((acc, sale) => acc + ((parseFloat(sale.greenCoffeeMass) || 0) * (parseFloat(sale.pricePerLb) || 0)), 0);
    const totalCost = costs.reduce((acc, cost) => acc + (parseFloat(cost.amount) || 0), 0);
    const profit = totalSale - totalCost;
    const formatCurrency = (val: number) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    addSection('Resumen Financiero del Lote', [
        ['Venta Total', formatCurrency(totalSale)],
        ['Costo Total', formatCurrency(totalCost)],
        ['Ganancia Neta', formatCurrency(profit)],
    ]);

    // --- Save the PDF ---
    doc.save(`Informe_Trazabilidad_${lot.lotCode.replace(/\s+/g, '_')}.pdf`);
};

export default generateLotPdf;
