import { expect } from 'chai';
import { SaveFileRequest } from '../src/models/SaveFileRequest';
import FormData from 'form-data';
import { Readable } from 'stream';

describe('SaveFileRequest', function () {
  it('should be defined', function () {
    expect(SaveFileRequest).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(SaveFileRequest).to.have.property('constructor');
  });

  it('should have 7 parameters', function () {
    expect(SaveFileRequest).to.have.lengthOf(7);
  });

  it('should create a new instance of the SaveFileRequest class', function () {
    expect(
      () =>
        new SaveFileRequest(
          1,
          1,
          'note',
          new Date(),
          'file',
          'contentType',
          new Readable()
        )
    ).to.not.throw();
  });

  it('should have a property named recordId', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      )
    ).to.have.property('recordId');
  });

  it('should set the recordId property to the value passed to the constructor', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      ).recordId
    ).to.equal(1);
  });

  it('should have a property named fieldId', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      )
    ).to.have.property('fieldId');
  });

  it('should set the fieldId property to the value passed to the constructor', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      ).fieldId
    ).to.equal(1);
  });

  it('should have a property named notes', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      )
    ).to.have.property('notes');
  });

  it('should set the notes property to the value passed to the constructor', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      ).notes
    ).to.equal('note');
  });

  it('should have a property named modifiedDate', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      )
    ).to.have.property('modifiedDate');
  });

  it('should set the modifiedDate property to the value passed to the constructor', function () {
    const modifiedDate = new Date();

    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        modifiedDate,
        'file',
        'contentType',
        new Readable()
      ).modifiedDate
    ).to.deep.equal(modifiedDate);
  });

  it('should have a property named fileName', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      )
    ).to.have.property('fileName');
  });

  it('should set the fileName property to the value passed to the constructor', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      ).fileName
    ).to.equal('file');
  });

  it('should have a property named contentType', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      )
    ).to.have.property('contentType');
  });

  it('should set the contentType property to the value passed to the constructor', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      ).contentType
    ).to.equal('contentType');
  });

  it('should have a property named fileStream', function () {
    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      )
    ).to.have.property('fileStream');
  });

  it('should set the fileStream property to the value passed to the constructor', function () {
    const stream = new Readable();

    expect(
      new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        stream
      ).fileStream
    ).to.deep.equal(stream);
  });

  describe('asFormData', function () {
    it('should be defined', function () {
      expect(SaveFileRequest.prototype.asFormData).to.not.be.undefined;
    });

    it('should have 0 parameters', function () {
      expect(SaveFileRequest.prototype.asFormData).to.have.lengthOf(0);
    });

    it('should return a FormData object', function () {
      const formData = new SaveFileRequest(
        1,
        1,
        'note',
        new Date(),
        'file',
        'contentType',
        new Readable()
      ).asFormData();

      expect(formData).to.be.instanceof(FormData);
    });
  });
});
