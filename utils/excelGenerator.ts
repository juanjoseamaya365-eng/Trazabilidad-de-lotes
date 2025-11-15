import type { CoffeeLot, Sale, Cost } from '../types';

// Let TypeScript know that XLSX is available globally from the script tag
declare const XLSX: any;

const generateLotExcel = (lot: CoffeeLot, sales: Sale[], costs: Cost[]) => {
    // --- Helper to create a worksheet from an array of [key, value] pairs ---
    const createSheetFromObject = (data: Record<string, any>, title: string) => {
        const filteredData = Object.entries(data).filter(([, value]) => value !== '' && value !== null && value !== undefined);
        const mappedData = filteredData.map(([key, value]) => ({ 'Campo': key, 'Valor': value }));
        return XLSX.utils.json_to_sheet(mappedData, { header: ['Campo', 'Valor'], skipHeader: false });
    };
    
    // --- Create a new workbook ---
    const wb = XLSX.utils.book_new();

    // --- Financial Summary ---
    const totalSale = sales.reduce((acc, sale) => acc + ((parseFloat(sale.greenCoffeeMass) || 0) * (parseFloat(sale.pricePerLb) || 0)), 0);
    const totalCost = costs.reduce((acc, cost) => acc + (parseFloat(cost.amount) || 0), 0);
    const profit = totalSale - totalCost;
    const formatCurrency = (val: number) => val.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    
    const summaryData = {
        'Código Lote': lot.lotCode,
        'Finca': lot.reception.farm,
        'Productor': lot.reception.producer,
        'Variedad': lot.reception.variety,
        'Proceso': lot.reception.process,
        '---': '---',
        'Venta Total': formatCurrency(totalSale),
        'Costo Total': formatCurrency(totalCost),
        'Ganancia Neta': formatCurrency(profit),
    };
    const ws_summary = createSheetFromObject(summaryData, 'Resumen');
    XLSX.utils.book_append_sheet(wb, ws_summary, 'Resumen');

    // --- Process Stages ---
    const receptionSheet = createSheetFromObject(lot.reception, 'Recepción');
    XLSX.utils.book_append_sheet(wb, receptionSheet, '1. Recepción');

    const cleaningSheet = createSheetFromObject(lot.cleaning, 'Limpieza');
    XLSX.utils.book_append_sheet(wb, cleaningSheet, '2. Limpieza');

    const fermentationData = { ...lot.fermentation };
    delete (fermentationData as any).monitoringLog; // handle log separately
    const fermentationSheet = createSheetFromObject(fermentationData, 'Fermentación');
    XLSX.utils.book_append_sheet(wb, fermentationSheet, '3. Fermentación');
    if (lot.fermentation.monitoringLog.length > 0) {
        const fermLogSheet = XLSX.utils.json_to_sheet(lot.fermentation.monitoringLog.map(({id, ...rest}) => rest));
        XLSX.utils.book_append_sheet(wb, fermLogSheet, 'Log Fermentación');
    }

    const dryingData = { ...lot.drying };
    delete (dryingData as any).humidityCurve; // handle log separately
    const dryingSheet = createSheetFromObject(dryingData, 'Secado');
    XLSX.utils.book_append_sheet(wb, dryingSheet, '4. Secado');
    if (lot.drying.humidityCurve.length > 0) {
        const dryingLogSheet = XLSX.utils.json_to_sheet(lot.drying.humidityCurve.map(({id, ...rest}) => rest));
        XLSX.utils.book_append_sheet(wb, dryingLogSheet, 'Curva Humedad');
    }

    const storageSheet = createSheetFromObject(lot.storage, 'Almacenamiento');
    XLSX.utils.book_append_sheet(wb, storageSheet, '5. Almacenamiento');
    
    const analysisSheet = createSheetFromObject(lot.analysis, 'Análisis');
    XLSX.utils.book_append_sheet(wb, analysisSheet, '6. Análisis');

    const feedbackSheet = createSheetFromObject(lot.feedback, 'Retroalimentación');
    XLSX.utils.book_append_sheet(wb, feedbackSheet, '7. Retroalimentación');
    
    // --- Sales and Costs ---
    if (sales.length > 0) {
        const salesData = sales.map(s => ({
            Fecha: s.date,
            Comprador: s.buyer,
            'Masa (lb)': s.greenCoffeeMass,
            'Puntaje': s.cuppingScore,
            'Precio/lb': formatCurrency(parseFloat(s.pricePerLb) || 0),
            'Monto Total': formatCurrency((parseFloat(s.greenCoffeeMass) || 0) * (parseFloat(s.pricePerLb) || 0)),
            Descriptores: s.descriptors
        }));
        const ws_sales = XLSX.utils.json_to_sheet(salesData);
        XLSX.utils.book_append_sheet(wb, ws_sales, 'Ventas');
    }
    
    if (costs.length > 0) {
        const costsData = costs.map(c => ({
            Fecha: c.date,
            Descripción: c.description,
            Categoría: c.category,
            Monto: formatCurrency(parseFloat(c.amount) || 0)
        }));
        const ws_costs = XLSX.utils.json_to_sheet(costsData);
        XLSX.utils.book_append_sheet(wb, ws_costs, 'Costos');
    }

    // --- Save the file ---
    const fileName = `Trazabilidad_Lote_${lot.lotCode.replace(/\s+/g, '_')}.xlsx`;
    XLSX.writeFile(wb, fileName);
};

export default generateLotExcel;
