import { FormulaOutputType } from '../enums/FormulaOutputType';
import { Field } from './Field';
import { type ListValue } from './ListValue';

export class FormulaField extends Field {
  public outputType: FormulaOutputType;
  public values: ListValue[];

  constructor(
    id: number,
    appId: number,
    name: string,
    type: string,
    status: string,
    isRequired: boolean,
    isUnique: boolean,
    outputType: string,
    values: ListValue[]
  ) {
    super(id, appId, name, type, status, isRequired, isUnique);

    if (FormulaOutputType[outputType] === undefined) {
      throw new Error(
        `The outputType ${outputType} is not a valid FormulaOutputType.`
      );
    }

    this.outputType = FormulaOutputType[outputType];
    this.values = values;
  }
}
