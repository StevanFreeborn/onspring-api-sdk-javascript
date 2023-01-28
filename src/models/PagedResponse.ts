export class PagedResponse<T> {
  public items: T[];
  public pageNumber: number;
  public pageSize: number;
  public totalCount: number;

  constructor(items: T[], pageNumber: number, pageSize: number, totalCount: number) {
    this.items = items;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
  }
}