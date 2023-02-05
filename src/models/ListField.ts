import { Multiplicity } from '../enums/Multiplicity';
import { Field } from './Field';
import { type ListValue } from './ListValue';

export class ListField extends Field {
  public multiplicity: Multiplicity;
  public listId: number;
  public values: ListValue[];

  constructor(
    id: number,
    appId: number,
    name: string,
    type: string,
    status: string,
    isRequired: boolean,
    isUnique: boolean,
    multiplicity: string,
    listId: number,
    values: ListValue[]
  ) {
    super(id, appId, name, type, status, isRequired, isUnique);

    if (Multiplicity[multiplicity] === undefined) {
      throw new Error(
        `The multiplicity ${multiplicity} is not a valid Multiplicity.`
      );
    }

    this.multiplicity = Multiplicity[multiplicity];
    this.listId = listId;
    this.values = values;
  }
}
