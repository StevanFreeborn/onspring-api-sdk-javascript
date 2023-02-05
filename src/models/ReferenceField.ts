import { Multiplicity } from '../enums/Multiplicity';
import { Field } from './Field';

export class ReferenceField extends Field {
  public multiplicity: Multiplicity;
  public referencedAppId: number;

  constructor(
    id: number,
    appId: number,
    name: string,
    type: string,
    status: string,
    isRequired: boolean,
    isUnique: boolean,
    multiplicity: string,
    referencedAppId: number
  ) {
    super(id, appId, name, type, status, isRequired, isUnique);

    if (Multiplicity[multiplicity] === undefined) {
      throw new Error(
        `The multiplicity ${multiplicity} is not a valid Multiplicity.`
      );
    }

    this.multiplicity = Multiplicity[multiplicity];
    this.referencedAppId = referencedAppId;
  }
}
