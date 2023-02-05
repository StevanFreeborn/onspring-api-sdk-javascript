import { FormulaField } from '../src/models/FormulaField';
import { expect } from 'chai';

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

  it('should throw an error if the outputType is not a valid FormulaOutputType', function () {
    expect(
      () =>
        new FormulaField(
          1,
          1,
          'Formula Field',
          'Formula',
          'Enabled',
          false,
          false,
          'NotAType',
          []
        )
    ).to.throw();
  });

  it('should create a new FormulaField', function () {
    const formulaField = new FormulaField(
      1,
      1,
      'Formula Field',
      'Formula',
      'Enabled',
      false,
      false,
      'Text',
      []
    );
    expect(formulaField).to.be.an.instanceOf(FormulaField);
  });

  it('should have a outputType property', function () {
    const formulaField = new FormulaField(
      1,
      1,
      'Formula Field',
      'Formula',
      'Enabled',
      false,
      false,
      'Text',
      []
    );
    expect(formulaField).to.have.property('outputType');
  });

  it('should have a values property', function () {
    const formulaField = new FormulaField(
      1,
      1,
      'Formula Field',
      'Formula',
      'Enabled',
      false,
      false,
      'Text',
      []
    );
    expect(formulaField).to.have.property('values');
  });
});
