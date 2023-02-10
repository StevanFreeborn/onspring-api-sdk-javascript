import { ReferenceField } from '../src/models/ReferenceField';
import { expect } from 'chai';
import { FieldType } from '../src/enums/FieldType';
import { FieldStatus } from '../src/enums/FieldStatus';
import { Multiplicity } from '../src/enums/Multiplicity';

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

  it('should create a new ReferenceField', function () {
    const referenceField = new ReferenceField(
      1,
      1,
      'Reference Field',
      FieldType.Reference,
      FieldStatus.Enabled,
      false,
      false,
      Multiplicity.SingleSelect,
      1
    );
    expect(referenceField).to.be.an.instanceOf(ReferenceField);
  });

  it('should have a multiplicity property', function () {
    const referenceField = new ReferenceField(
      1,
      1,
      'Reference Field',
      FieldType.Reference,
      FieldStatus.Enabled,
      false,
      false,
      Multiplicity.SingleSelect,
      1
    );
    expect(referenceField).to.have.property('multiplicity');
  });

  it('should have a referencedAppId property', function () {
    const referenceField = new ReferenceField(
      1,
      1,
      'Reference Field',
      FieldType.Reference,
      FieldStatus.Enabled,
      false,
      false,
      Multiplicity.SingleSelect,
      1
    );
    expect(referenceField).to.have.property('referencedAppId');
  });
});
