import { CreatedWithIdResponse } from './CreatedWithIdResponse';

export class SaveRecordResponse extends CreatedWithIdResponse {
  public warnings: string[];

  constructor(id: number, warnings: string[] = []) {
    super(id);
    this.warnings = warnings;
  }
}