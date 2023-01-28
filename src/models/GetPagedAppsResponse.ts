import { PagedResponse } from "./PagedResponse";
import { App } from "./App";

export class GetPagedAppsResponse extends PagedResponse<App> {
  constructor(items: App[], pageNumber: number, pageSize: number, totalCount: number) {
    super(items, pageNumber, pageSize, totalCount);
  }
}