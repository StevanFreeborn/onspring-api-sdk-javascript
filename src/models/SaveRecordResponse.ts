import { CreatedWithIdResponse } from './CreatedWithIdResponse.js';

export class SaveRecordResponse extends CreatedWithIdResponse<number> {
  public warnings: string[];

  constructor(id: number, warnings: string[] = []) {
    super(id);
    this.warnings = warnings;
  }
}
