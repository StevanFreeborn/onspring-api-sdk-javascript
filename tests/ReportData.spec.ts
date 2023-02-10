import { ReportData } from '../src/models/ReportData';
import { expect } from 'chai';

describe('ReportData', function () {
  it('should be defined', function () {
    expect(ReportData).to.not.be.undefined;
  });

  it('should have a constructor with 2 parameters', function () {
    expect(ReportData).to.have.property('constructor');
    expect(ReportData).to.have.lengthOf(2);
  });

  it('should have a construct that sets its properties correctly', function () {
    const reportData = new ReportData(
      ['a', 'b'],
      [
        {
          recordId: 1,
          cells: [{}, {}],
        },
        {
          recordId: 2,
          cells: [{}, {}],
        },
      ]
    );

    expect(reportData)
      .to.have.property('columns')
      .that.is.an('array')
      .with.lengthOf(2);
    expect(reportData)
      .to.have.property('rows')
      .that.is.an('array')
      .with.lengthOf(2);

    reportData.columns.forEach((column) => {
      expect(column).to.be.a('string');
    });

    reportData.rows.forEach((row) => {
      expect(row).to.have.property('recordId').that.is.a('number');
      expect(row)
        .to.have.property('cells')
        .that.is.an('array')
        .with.lengthOf(2);
    });
  });

  it('should have a columns property', function () {
    expect(new ReportData(['a', 'b'], [])).to.have.property('columns');
  });

  it('should have a rows property', function () {
    expect(new ReportData(['a', 'b'], [])).to.have.property('rows');
  });
});
