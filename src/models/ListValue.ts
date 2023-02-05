export class ListValue {
  public id: string;
  public name: string;
  public sortOrder: number;
  public numericValue: number;
  public color: string;

  constructor(
    id: string,
    name: string,
    sortOrder: number,
    numericValue: number,
    color: string
  ) {
    this.id = id;
    this.name = name;
    this.sortOrder = sortOrder;
    this.numericValue = numericValue;
    this.color = color;
  }
}
