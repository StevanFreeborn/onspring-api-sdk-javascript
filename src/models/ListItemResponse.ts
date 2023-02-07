import { CreatedWithIdResponse } from './CreatedWithIdResponse';

/**
 * @class ListItemResponse - Represents a respons when a list item is created or updated.
 */
export class ListItemResponse extends CreatedWithIdResponse {
  constructor(id: number) {
    super(id);
  }
}
