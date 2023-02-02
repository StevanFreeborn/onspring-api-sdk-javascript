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

  it('should create a new instance of the App class with the correct properties and values', function () {
    const app = new App('href', 1, 'name');

    expect(app).to.have.property('href');
    expect(app).to.have.property('id');
    expect(app).to.have.property('name');
    expect(app.href).to.equal('href');
    expect(app.id).to.equal(1);
    expect(app.name).to.equal('name');
  });
});
