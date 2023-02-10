import { Row } from '../src/models/Row';
import { expect } from 'chai';

describe('Row', function () {
  it('should be defined', function () {
    expect(Row).to.not.be.undefined;
  });

  it('should have a constructor with 2 parameters', function () {
    expect(Row).to.have.property('constructor');
    expect(Row).to.have.lengthOf(2);
  });

  it('should have a construct that sets its properties correctly', function () {
    const row = new Row(1, [{}, {}]);
    expect(row).to.have.property('recordId', 1);
    expect(row).to.have.property('cells').that.is.an('array').with.lengthOf(2);
  });

  it('should have a recordId property', function () {
    expect(new Row(1, [{}, {}])).to.have.property('recordId');
  });

  it('should have a cells property', function () {
    expect(new Row(1, [{}, {}])).to.have.property('cells');
  });
});
