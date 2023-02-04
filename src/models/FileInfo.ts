import { FieldType } from '../enums/FieldType';

export class FileInfo {
  public type: FieldType;
  public contentType: string;
  public name: string;
  public createdDate: Date;
  public modifiedDate: Date;
  public owner: string;
  public notes: string;
  public fileHref: string;

  constructor(
    type: string,
    contentType: string,
    name: string,
    createdDate: Date,
    modifiedDate: Date,
    owner: string,
    notes: string,
    fileHref: string
  ) {
    if (FieldType[type] === undefined) {
      throw new Error(`The type '${type}' is not a valid FieldType.`);
    }

    this.type = FieldType[type];
    this.contentType = contentType;
    this.name = name;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
    this.owner = owner;
    this.notes = notes;
    this.fileHref = fileHref;
  }
}
