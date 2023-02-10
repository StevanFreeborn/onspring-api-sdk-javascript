import { type Row } from './Row';

export class ReportData {
  public columns: string[];
  public rows: Row[];

  constructor(columns: string[], rows: Row[]) {
    this.columns = columns;
    this.rows = rows;
  }
}
