import { App } from '../src/models/App';
import { expect } from 'chai';

describe('App', function () {
  it('should be defined', function () {
    expect(App).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(App).to.have.property('constructor');
  });

  it('should have 3 parameters', function () {
    expect(App).to.have.lengthOf(3);
  });

  it('should create a new instance of the App class', function () {
    expect(() => new App('href', 1, 'name')).to.not.throw();
  });
});