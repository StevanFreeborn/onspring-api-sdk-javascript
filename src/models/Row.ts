export class Row {
  public recordId: number;
  public cells: object[];

  constructor(recordId: number, cells: object[]) {
    this.recordId = recordId;
    this.cells = cells;
  }
}
