import { File } from '../src/models/File';
import { expect } from 'chai';
import { Readable } from 'stream';

describe('File', function () {
  it('should be defined', function () {
    expect(File).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(File).to.have.property('constructor');
  });

  it('should have a stream property', function () {
    expect(
      new File(new Readable(), 'File Name', 'Content Type', 1)
    ).to.have.property('stream');
  });

  it('should have a fileName property', function () {
    expect(
      new File(new Readable(), 'File Name', 'Content Type', 1)
    ).to.have.property('fileName');
  });

  it('should have a contentType property', function () {
    expect(
      new File(new Readable(), 'File Name', 'Content Type', 1)
    ).to.have.property('contentType');
  });

  it('should have a contentLength property', function () {
    expect(
      new File(new Readable(), 'File Name', 'Content Type', 1)
    ).to.have.property('contentLength');
  });

  it('should have a constructor that sets the stream property', function () {
    const stream = new Readable();
    expect(
      new File(stream, 'File Name', 'Content Type', 1).stream
    ).to.deep.equal(stream);
  });

  it('should have a constructor that sets the fileName property', function () {
    expect(
      new File(new Readable(), 'File Name', 'Content Type', 1).fileName
    ).to.equal('File Name');
  });

  it('should have a constructor that sets the contentType property', function () {
    expect(
      new File(new Readable(), 'File Name', 'Content Type', 1).contentType
    ).to.equal('Content Type');
  });

  it('should have a constructor that sets the contentLength property', function () {
    expect(
      new File(new Readable(), 'File Name', 'Content Type', 1).contentLength
    ).to.equal(1);
  });
});
