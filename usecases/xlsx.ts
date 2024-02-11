import { WorkBook, readFile, utils, writeFile } from 'xlsx';
import { ExcelRow } from '../__types';
import { formatDateExcel } from './formatDate';


export class Xlsx {

    static readFile(path: string) {
        const file: WorkBook = readFile(path);
        const fileSheet = file.Sheets['Hoja 1'];
        const data: Record<string, any>[] = utils.sheet_to_json(fileSheet);

        return data.map((row: { [k: string]: any }) => {

            const ventaCulqi = typeof row['Fecha venta Culqi'] !== 'string'
                ? formatDateExcel(row['Fecha venta Culqi']) :
                row['Fecha venta Culqi'];

            return {
                codigo: row['Código'],
                ventaCulqi,
                monto: row['Monto'],
                moneda: row['Moneda'],
                email: row['Correo'],
                fechaEmision: ''
            }
        });
    }

    static writeFile(path: string, data: ExcelRow[]) {
        if (!path) {
            throw new Error('[Class Xlsx Error]: The current path is not defined');
        }

        const wb = utils.book_new();
        const ws = utils.json_to_sheet(data);

        utils.book_append_sheet(wb, ws, 'Actualizado');
        writeFile(wb, path);
    }
}