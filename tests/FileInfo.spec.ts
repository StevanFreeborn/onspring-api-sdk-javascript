import { FileInfo } from '../src/models/FileInfo';
import { expect } from 'chai';

describe('FileInfo', function () {
  it('should be defined', function () {
    expect(FileInfo).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(FileInfo).to.have.property('constructor');
  });

  it('should have 8 parameters', function () {
    expect(FileInfo).to.have.lengthOf(8);
  });

  it('should create a new instance of FileInfo', function () {
    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      new Date(),
      new Date(),
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo).to.be.an.instanceOf(FileInfo);
  });

  it('should throw an error when the type is not a valid FieldType', function () {
    expect(() => {
      new FileInfo(
        'InvalidType',
        'application/pdf',
        'FileName.pdf',
        new Date(),
        new Date(),
        'File Owner',
        'notes',
        'https://api.onspring.dev'
      );
    }).to.throw("The type 'InvalidType' is not a valid FieldType.");
  });

  it('should have a type property', function () {
    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      new Date(),
      new Date(),
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo).to.have.property('type');
  });

  it('should have a contentType property', function () {
    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      new Date(),
      new Date(),
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo).to.have.property('contentType');
  });

  it('should have a name property', function () {
    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      new Date(),
      new Date(),
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo).to.have.property('name');
  });

  it('should have a createdDate property', function () {
    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      new Date(),
      new Date(),
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo).to.have.property('createdDate');
  });

  it('should have a modifiedDate property', function () {
    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      new Date(),
      new Date(),
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo).to.have.property('modifiedDate');
  });

  it('should have a owner property', function () {
    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      new Date(),
      new Date(),
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo).to.have.property('owner');
  });

  it('should have a notes property', function () {
    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      new Date(),
      new Date(),
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo).to.have.property('notes');
  });

  it('should have a fileHref property', function () {
    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      new Date(),
      new Date(),
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo).to.have.property('fileHref');
  });

  it('should set properties to the correct values passed to the constructor', function () {
    const date = new Date();

    const fileInfo = new FileInfo(
      'Attachment',
      'application/pdf',
      'FileName.pdf',
      date,
      date,
      'File Owner',
      'notes',
      'https://api.onspring.dev'
    );

    expect(fileInfo.type).to.equal('Attachment');
    expect(fileInfo.contentType).to.equal('application/pdf');
    expect(fileInfo.name).to.equal('FileName.pdf');
    expect(fileInfo.createdDate).to.be.deep.equal(date);
    expect(fileInfo.modifiedDate).to.be.deep.equal(date);
    expect(fileInfo.owner).to.equal('File Owner');
    expect(fileInfo.notes).to.equal('notes');
    expect(fileInfo.fileHref).to.equal('https://api.onspring.dev');
  });
});
