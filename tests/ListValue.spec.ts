import { ListValue } from '../src/models/ListValue';
import { expect } from 'chai';

describe('ListValue', function () {
  it('should be defined', function () {
    expect(ListValue).to.not.be.undefined;
  });

  it('should be a function', function () {
    expect(ListValue).to.be.a('function');
  });

  it('should have a constructor', function () {
    expect(ListValue).to.have.property('constructor');
  });

  it('should create a new ListValue', function () {
    const listValue = new ListValue('1', 'List Value', 1, 1, 'red');
    expect(listValue).to.be.an.instanceOf(ListValue);
  });

  it('should have an id property', function () {
    const listValue = new ListValue('1', 'List Value', 1, 1, 'red');
    expect(listValue).to.have.property('id');
  });

  it('should have a name property', function () {
    const listValue = new ListValue('1', 'List Value', 1, 1, 'red');
    expect(listValue).to.have.property('name');
  });

  it('should have a sortOrder property', function () {
    const listValue = new ListValue('1', 'List Value', 1, 1, 'red');
    expect(listValue).to.have.property('sortOrder');
  });

  it('should have a numericValue property', function () {
    const listValue = new ListValue('1', 'List Value', 1, 1, 'red');
    expect(listValue).to.have.property('numericValue');
  });

  it('should have a color property', function () {
    const listValue = new ListValue('1', 'List Value', 1, 1, 'red');
    expect(listValue).to.have.property('color');
  });
});
