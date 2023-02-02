import { PagedResponse } from './PagedResponse';
import { App } from './App';

export class GetPagedAppsResponse extends PagedResponse<App> {
  constructor(
    items: App[],
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalRecords: number
  ) {
    super(items, pageNumber, pageSize, totalPages, totalRecords);
  }
}
