import { ExcelRow, Strategy, Charge as DataCharge } from "../__types";
import axios, { RawAxiosRequestHeaders } from 'axios';

export class Charge implements Strategy {

    constructor(
        private _endpoint: string = process.env.GET_CHARGE ?? ""
    ) { }

    async getData(row: ExcelRow, newRows: ExcelRow[]): Promise<void> {

        if (!this._endpoint) {
            throw new Error('[Strategy Class Error (Charge)]: endpoint is undefined');
        }

        const culqiToken = process.env.CULQI_TOKEN;

        if (!culqiToken) {
            throw new Error('[Strategy Class Error (Charge)]: token is undefined');
        }

        const headers: RawAxiosRequestHeaders = {
            Authorization: `Bearer ${culqiToken}`
        }


        const { data } = await axios.get<DataCharge>(`${this._endpoint}/${row.codigo}`, { headers });

        newRows.push({
            ...row,
            fechaEmision: row.ventaCulqi,
            email: data.email.toLowerCase()
        })

    }
}