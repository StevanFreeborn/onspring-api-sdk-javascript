import { ListField } from '../src/models/ListField';
import { expect } from 'chai';

describe('ListField', function () {
  it('should be defined', function () {
    expect(ListField).to.not.be.undefined;
  });

  it('should be a function', function () {
    expect(ListField).to.be.a('function');
  });

  it('should have a constructor', function () {
    expect(ListField).to.have.property('constructor');
  });

  it('should throw an error if the multiplicity is not valid', function () {
    expect(
      () =>
        new ListField(
          1,
          1,
          'List Field',
          'List',
          'Enabled',
          false,
          false,
          'Alone',
          1,
          []
        )
    ).to.throw();
  });

  it('should create a new ListField', function () {
    const listField = new ListField(
      1,
      1,
      'List Field',
      'List',
      'Enabled',
      false,
      false,
      'SingleSelect',
      1,
      []
    );
    expect(listField).to.be.an.instanceOf(ListField);
  });

  it('should have a multiplicity property', function () {
    const listField = new ListField(
      1,
      1,
      'List Field',
      'List',
      'Enabled',
      false,
      false,
      'SingleSelect',
      1,
      []
    );
    expect(listField).to.have.property('multiplicity');
  });

  it('should have a listId property', function () {
    const listField = new ListField(
      1,
      1,
      'List Field',
      'List',
      'Enabled',
      false,
      false,
      'SingleSelect',
      1,
      []
    );
    expect(listField).to.have.property('listId');
  });

  it('should have a values property', function () {
    const listField = new ListField(
      1,
      1,
      'List Field',
      'List',
      'Enabled',
      false,
      false,
      'SingleSelect',
      1,
      []
    );
    expect(listField).to.have.property('values');
  });
});
