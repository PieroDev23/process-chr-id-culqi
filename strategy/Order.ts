import axios, { RawAxiosRequestHeaders } from "axios";
import { ExcelRow, Strategy, Order as OrderData } from "../__types";
import { formatDateFromTimestamp } from "../usecases/formatDate";


export class Order implements Strategy {

    constructor(
        private _endpoint: string = process.env.GET_ORDER ?? ""
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

        const { data } = await axios.get<OrderData>(`${this._endpoint}/${row.codigo}`, { headers });

        newRows.push({
            ...row,
            fechaEmision: formatDateFromTimestamp(data.creation_date)
        })
    }
}