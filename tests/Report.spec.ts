import { Report } from '../src/models/Report';
import { expect } from 'chai';

describe('Report', function () {
  it('should be defined', function () {
    expect(Report).to.be.not.undefined;
  });

  it('should have a constructor', function () {
    expect(Report).to.have.property('constructor');
  });

  it('should have a constructor that takes 4 arguments', function () {
    expect(Report).to.have.lengthOf(4);
  });

  it('should create a new instance of Report', function () {
    expect(
      new Report(1, 1, 'report', 'report description')
    ).to.be.an.instanceOf(Report);
  });

  it('should set its properties correctly', function () {
    const report = new Report(1, 1, 'report', 'report description');
    expect(report.id).to.be.equal(1);
    expect(report.appId).to.be.equal(1);
    expect(report.name).to.be.equal('report');
    expect(report.description).to.be.equal('report description');
  });

  it('should have an id property', function () {
    expect(new Report(1, 1, 'report', 'report description')).to.have.property(
      'id'
    );
  });

  it('should have an appId property', function () {
    expect(new Report(1, 1, 'report', 'report description')).to.have.property(
      'appId'
    );
  });

  it('should have a name property', function () {
    expect(new Report(1, 1, 'report', 'report description')).to.have.property(
      'name'
    );
  });

  it('should have a description property', function () {
    expect(new Report(1, 1, 'report', 'report description')).to.have.property(
      'description'
    );
  });
});
