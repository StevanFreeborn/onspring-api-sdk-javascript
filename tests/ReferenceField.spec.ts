import { ReferenceField } from '../src/models/ReferenceField';
import { expect } from 'chai';

describe('ReferenceField', function () {
  it('should be defined', function () {
    expect(ReferenceField).to.not.be.undefined;
  });

  it('should be a function', function () {
    expect(ReferenceField).to.be.a('function');
  });

  it('should have a constructor', function () {
    expect(ReferenceField).to.have.property('constructor');
  });

  it('should throw an error if the multiplicity is not valid', function () {
    expect(
      () =>
        new ReferenceField(
          1,
          1,
          'Reference Field',
          'Reference',
          'Enabled',
          false,
          false,
          'Alone',
          1
        )
    ).to.throw();
  });

  it('should create a new ReferenceField', function () {
    const referenceField = new ReferenceField(
      1,
      1,
      'Reference Field',
      'Reference',
      'Enabled',
      false,
      false,
      'SingleSelect',
      1
    );
    expect(referenceField).to.be.an.instanceOf(ReferenceField);
  });

  it('should have a multiplicity property', function () {
    const referenceField = new ReferenceField(
      1,
      1,
      'Reference Field',
      'Reference',
      'Enabled',
      false,
      false,
      'SingleSelect',
      1
    );
    expect(referenceField).to.have.property('multiplicity');
  });

  it('should have a referencedAppId property', function () {
    const referenceField = new ReferenceField(
      1,
      1,
      'Reference Field',
      'Reference',
      'Enabled',
      false,
      false,
      'SingleSelect',
      1
    );
    expect(referenceField).to.have.property('referencedAppId');
  });
});
