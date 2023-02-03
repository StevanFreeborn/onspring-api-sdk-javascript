import { expect } from 'chai';
import { Field } from '../src/models/Field';

describe('Field', function () {
  it('should be defined', function () {
    expect(Field).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(Field).to.have.property('constructor');
  });

  it('should have 7 parameters', function () {
    expect(Field).to.have.lengthOf(7);
  });

  it('should create a new instance of the Field class', function () {
    expect(
      () => new Field(1, 1, 'Text Field', 'Text', 'Enabled', true, false)
    ).to.not.throw();
  });

  it('should create a new instance of the Field class with the correct properties and values', function () {
    const field = new Field(1, 1, 'Text Field', 'Text', 'Enabled', true, false);

    expect(field).to.have.property('id');
    expect(field).to.have.property('appId');
    expect(field).to.have.property('name');
    expect(field).to.have.property('type');
    expect(field).to.have.property('status');
    expect(field).to.have.property('isRequired');
    expect(field).to.have.property('isUnique');
    expect(field.id).to.equal(1);
    expect(field.appId).to.equal(1);
    expect(field.name).to.equal('Text Field');
    expect(field.type).to.equal('Text');
    expect(field.status).to.equal('Enabled');
    expect(field.isRequired).to.equal(true);
    expect(field.isUnique).to.equal(false);
  });

  it('should throw an error when the type parameter is not a valid value', function () {
    expect(
      () => new Field(1, 1, 'Text Field', 'Invalid', 'Enabled', true, false)
    ).to.throw();
  });

  it('should throw an error when the status parameter is not a valid value', function () {
    expect(
      () => new Field(1, 1, 'Text Field', 'Text', 'Unabled', true, false)
    ).to.throw();
  });
});
