import { OnspringClient, Record, StringRecordValue } from '../../src';
import { expect } from 'chai';

async function addRecord(
  baseURL: string | undefined,
  apiKey: string | undefined
): Promise<number> {
  const client = new OnspringClient(baseURL, apiKey);

  if (process.env.TEST_SURVEY_ID === undefined) {
    expect.fail('TEST_SURVEY_ID is not defined');
  }

  if (process.env.TEST_TEXT_FIELD === undefined) {
    expect.fail('TEST_TEXT_FIELD is not defined');
  }

  const request = new Record(parseInt(process.env.TEST_SURVEY_ID), null);

  request.addValue(
    new StringRecordValue(parseInt(process.env.TEST_TEXT_FIELD), 'test')
  );

  const response = await client.saveRecord(request);

  if (response.data === null || response.data.id === undefined) {
    expect.fail('Record ID is not defined');
  }

  return response.data.id;
}

export { addRecord };
