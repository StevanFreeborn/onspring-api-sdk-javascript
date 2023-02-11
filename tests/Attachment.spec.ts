import { Attachment } from '../src/models/Attachment';
import { expect } from 'chai';
import { FileStorageSite } from '../src/enums/FileStorageSite';

describe('Attachment', function () {
  it('should be defined', function () {
    expect(Attachment).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(Attachment).to.have.property('constructor');
  });

  it('should have a constructor that takes 4 parameters', function () {
    expect(Attachment).to.have.lengthOf(4);
  });

  it('should have a fileId property', function () {
    expect(
      new Attachment(1, 'test', 'test', FileStorageSite.Internal)
    ).to.have.property('fileId');
  });

  it('should have a fileName property', function () {
    expect(
      new Attachment(1, 'test', 'test', FileStorageSite.Internal)
    ).to.have.property('fileName');
  });

  it('should have a notes property', function () {
    expect(
      new Attachment(1, 'test', 'test', FileStorageSite.Internal)
    ).to.have.property('notes');
  });

  it('should have a storageLocation property', function () {
    expect(
      new Attachment(1, 'test', 'test', FileStorageSite.Internal)
    ).to.have.property('storageLocation');
  });

  it('should have a constructor that sets its properties correctly', function () {
    const fileId = 1;
    const fileName = 'test';
    const notes = 'test';
    const storageLocation = FileStorageSite.Internal;

    const attachment = new Attachment(fileId, fileName, notes, storageLocation);

    expect(attachment).to.have.property('fileId', fileId);
    expect(attachment).to.have.property('fileName', fileName);
    expect(attachment).to.have.property('notes', notes);
    expect(attachment).to.have.property('storageLocation', storageLocation);
  });
});
