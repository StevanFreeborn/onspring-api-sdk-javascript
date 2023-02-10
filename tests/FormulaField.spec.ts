import { FormulaField } from '../src/models/FormulaField';
import { expect } from 'chai';
import { FieldType } from '../src/enums/FieldType';
import { FieldStatus } from '../src/enums/FieldStatus';
import { FormulaOutputType } from '../src/enums/FormulaOutputType';

describe('FormulaField', function () {
  it('should be defined', function () {
    expect(FormulaField).to.not.be.undefined;
  });

  it('should be a function', function () {
    expect(FormulaField).to.be.a('function');
  });

  it('should have a constructor', function () {
    expect(FormulaField).to.have.property('constructor');
  });

  it('should create a new FormulaField', function () {
    const formulaField = new FormulaField(
      1,
      1,
      'Formula Field',
      FieldType.Formula,
      FieldStatus.Enabled,
      false,
      false,
      FormulaOutputType.Text,
      []
    );
    expect(formulaField).to.be.an.instanceOf(FormulaField);
  });

  it('should have a outputType property', function () {
    const formulaField = new FormulaField(
      1,
      1,
      'Formula Field',
      FieldType.Formula,
      FieldStatus.Enabled,
      false,
      false,
      FormulaOutputType.Text,
      []
    );
    expect(formulaField).to.have.property('outputType');
  });

  it('should have a values property', function () {
    const formulaField = new FormulaField(
      1,
      1,
      'Formula Field',
      FieldType.Formula,
      FieldStatus.Enabled,
      false,
      false,
      FormulaOutputType.Text,
      []
    );
    expect(formulaField).to.have.property('values');
  });
});
