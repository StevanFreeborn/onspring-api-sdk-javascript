import { ListItemResponse } from '../src/models/ListItemResponse';
import { expect } from 'chai';

describe('ListItemResponse', function () {
  it('should be defined', function () {
    expect(ListItemResponse).to.not.be.undefined;
  });

  it('should have a constructor with 1 parameter', function () {
    expect(ListItemResponse).to.have.property('constructor');
    expect(ListItemResponse.constructor).to.have.lengthOf(1);
  });

  it('should have a constructor that takes an id and sets the id property', function () {
    const id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    const listItemResponse = new ListItemResponse(id);
    expect(listItemResponse).to.have.property('id', id);
  });
});
