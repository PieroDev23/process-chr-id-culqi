import 'dotenv/config';
import { Xlsx } from './usecases/xlsx';
import { Culqi } from './strategy/Culqi';
import { Charge } from './strategy/Charge';
import { Order } from './strategy/Order';
import { writeFileSync } from 'fs';
import { ExcelRow, Strategy } from './__types';


(async () => {
    const rows = Xlsx.readFile('./codes.xlsx');
    const context = new Culqi();
    const newRows: ExcelRow[] = [];
    const errors: ExcelRow[] = [];

    // Creating strategies
    const mapStrategies = new Map<string, Strategy>([
        ['chr', new Charge()],
        ['ord', new Order()]
    ]);

    for (const row of rows) {
        // Split the code string by "_" character getting array of strings when the type of code is on positon 0
        const [code]: string[] = row.codigo.split('_');
        console.log('🔍 Request initilialized for code:', row.codigo);

        // Getting the current code based strategy "Charge" | "Order" => "chr" | "ord"
        const strategy = mapStrategies.get(code);
        if (!strategy) {
            throw new Error('🟥 Strategy not founded');
        }

        // Setting the strategy
        context.setStrategy(strategy);

        try {
            // Fetching the data...
            await context.getData(row, newRows);
            console.log('✅ Request completed for code:', row.codigo);

        } catch (error) {
            if (error instanceof Error) {
                console.error('🟥 Error while doing the request, returning the default data instead:', row.codigo, error.message);
                // If its an error pushing the error case on errors list
                errors.push(row);
            }
        }
    }

    writeFileSync('data.json', JSON.stringify(newRows), 'utf-8');
    writeFileSync('timeoutErrors.json', JSON.stringify(errors), 'utf-8');
})();