import { expect } from 'chai';
import { CollectionResponse } from '../src/models/CollectionResponse';

describe('CollectionResponse', function () {
  it('should be defined', function () {
    expect(CollectionResponse).to.not.be.undefined;
  });

  it('should have a constructor', function () {
    expect(CollectionResponse).to.have.property('constructor');
  });

  it('should have 2 parameters', function () {
    expect(CollectionResponse).to.have.lengthOf(2);
  });

  it('should create a new instance of the CollectionResponse class', function () {
    expect(() => new CollectionResponse(200, [1, 2, 3])).to.not.throw();
  });

  it('should have a property named count', function () {
    expect(new CollectionResponse(200, [1, 2, 3])).to.have.property('count');
  });

  it('should have a property named items', function () {
    expect(new CollectionResponse(200, [1, 2, 3])).to.have.property('items');
  });

  it('should set the count property to the value passed to the constructor', function () {
    expect(new CollectionResponse(200, [1, 2, 3]).count).to.equal(200);
  });

  it('should set the items property to the value passed to the constructor', function () {
    expect(new CollectionResponse(200, [1, 2, 3]).items).to.deep.equal([
      1, 2, 3,
    ]);
  });
});
