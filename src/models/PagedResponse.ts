export class PagedResponse<T> {
  public items: T[];
  public pageNumber: number;
  public pageSize: number;
  public totalPages: number;
  public totalRecords: number;

  constructor(items: T[], pageNumber: number, pageSize: number, totalPages: number, totalRecords: number) {
    this.items = items;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
    this.totalRecords = totalRecords;
  }
}