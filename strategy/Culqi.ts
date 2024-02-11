import { Context, ExcelRow, Strategy } from "../__types";

export class Culqi implements Context {

    strategy!: Strategy;

    setStrategy(strategy: Strategy): void {
        this.strategy = strategy;
    }

    async getData(data: ExcelRow, newRows: ExcelRow[]): Promise<void> {
        await this.strategy.getData(data, newRows);
    }
}