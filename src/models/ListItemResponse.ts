import { CreatedWithIdResponse } from './CreatedWithIdResponse';
/**
 * @class ListItemResponse - Represents a respons when a list item is created or updated.
 */
export class ListItemResponse extends CreatedWithIdResponse<string> {
  /**
   * @constructor - Creates a new instance of ListItemResponse.
   * @param {string} id - The id of the list item.
   * @returns {ListItemResponse} - A new instance of ListItemResponse.
   */
  constructor(id: string) {
    super(id);
  }
}
