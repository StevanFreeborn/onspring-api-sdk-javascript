import { PagedResponse } from './PagedResponse';
import { type Report } from './Report';

export class GetPagedReportsResponse extends PagedResponse<Report> {
  constructor(
    items: Report[],
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number
  ) {
    super(items, pageNumber, pageSize, totalPages, totalRecords);
  }
}
