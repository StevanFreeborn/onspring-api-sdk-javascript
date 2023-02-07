import { ListItemRequest } from '../src/models/ListItemRequest';
import { expect } from 'chai';

describe('ListItemRequest', function () {
  it('should be defined', function () {
    expect(ListItemRequest).to.not.be.undefined;
  });

  it('should have a constructor with 5 parameters', function () {
    expect(ListItemRequest).to.have.property('constructor');
    expect(ListItemRequest).to.have.lengthOf(5);
  });

  it('should have a constructor that takes a listId, id, name, numericValue, and color and sets the listId, id, name, numericValue, and color properties', function () {
    const listId = 1;
    const id = '1';
    const name = 'name';
    const numericValue = 1;
    const color = 'color';
    const listItemRequest = new ListItemRequest(
      listId,
      id,
      name,
      numericValue,
      color
    );
    expect(listItemRequest).to.have.property('listId', listId);
    expect(listItemRequest).to.have.property('id', id);
    expect(listItemRequest).to.have.property('name', name);
    expect(listItemRequest).to.have.property('numericValue', numericValue);
    expect(listItemRequest).to.have.property('color', color);
  });
});
