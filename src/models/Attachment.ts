export class Attachment {
  public fileId: number;
  public fileName: string;
  public notes: string;
  public storageLocation: string;

  constructor(
    fileId: number,
    fileName: string,
    notes: string,
    storageLocation: string
  ) {
    this.fileId = fileId;
    this.fileName = fileName;
    this.notes = notes;
    this.storageLocation = storageLocation;
  }
}
