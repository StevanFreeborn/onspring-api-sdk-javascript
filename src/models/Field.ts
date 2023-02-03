import { FieldStatus } from '../enums/FieldStatus';
import { FieldType } from '../enums/FieldType';

export class Field {
  public id: number;
  public appId: number;
  public name: string;
  public type: FieldType;
  public status: FieldStatus;
  public isRequired: boolean;
  public isUnique: boolean;

  public constructor(
    id: number,
    appId: number,
    name: string,
    type: string,
    status: string,
    isRequired: boolean,
    isUnique: boolean
  ) {
    if (FieldType[type] === undefined) {
      throw new Error(`The type '${type}' is not a valid FieldType.`);
    }

    if (FieldStatus[status] === undefined) {
      throw new Error(`The status '${status}' is not a valid FieldStatus.`);
    }

    this.id = id;
    this.appId = appId;
    this.name = name;
    this.type = FieldType[type];
    this.status = FieldStatus[status];
    this.isRequired = isRequired;
    this.isUnique = isUnique;
  }
}
