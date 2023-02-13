/* 
This file represents an exhaustive list of possible record value
objects that can be returned from the API. It is used in the
ApiResponse.spec.ts file to test the ApiResponse class when it returns
types involving records.
 */
export const testFieldData: object[] = [
  {
    type: 'StringList',
    fieldId: 12891,
    value: ['list_value_1', 'list_value_2'],
  },
  {
    type: 'Integer',
    fieldId: 12144,
    value: 1,
  },
  {
    type: 'Date',
    fieldId: 12145,
    value: '2023-01-17T05:52:07.251Z',
  },
  {
    type: 'Date',
    fieldId: 12146,
    value: '2023-02-10T01:19:46.63Z',
  },
  {
    type: 'String',
    fieldId: 12152,
    value: 'stevan.freeborn@onspring.com',
  },
  {
    type: 'Date',
    fieldId: 12153,
    value: '2023-01-17T05:53:12.104Z',
  },
  {
    type: 'Integer',
    fieldId: 12160,
    value: 69,
  },
  {
    type: 'String',
    fieldId: 12165,
    value: 'stevan.freeborn+delegate@onspring.com',
  },
  {
    type: 'String',
    fieldId: 12166,
    value: 'stevan_delegate',
  },
  {
    type: 'ScoringGroupList',
    fieldId: 12167,
    value: [
      {
        delegateType: 'External',
        name: 'test_delegate',
        emailAddress: 'test@test.com',
        delegationType: 'AllPages',
        pageIds: [],
        answeredPageIds: [],
        canReadOtherPages: false,
        delegationDateTime: '2023-01-17T05:52:53.781Z',
        delegationCompletedDateTime: '2023-01-17T05:53:12.617Z',
        status: 'Pending',
        isDeleted: false,
        messagingDisplayText:
          'Delegate Name: test_delegate -- Delegate Completed On: 1/17/2023 5:53 AM',
        guid: '00000000-0000-0000-0000-000000000000',
      },
      {
        delegateType: 'External',
        name: undefined,
        emailAddress: 'test@test.com',
        delegationType: 'AllPages',
        pageIds: [],
        answeredPageIds: [],
        canReadOtherPages: false,
        delegationDateTime: '2023-01-17T05:52:53.781Z',
        delegationCompletedDateTime: undefined,
        status: 'Pending',
        isDeleted: false,
        messagingDisplayText:
          'Delegate Name: test_delegate -- Delegate Completed On: 1/17/2023 5:53 AM',
        guid: '00000000-0000-0000-0000-000000000000',
      },
      {
        delegateType: 'External',
        name: null,
        emailAddress: 'test@test.com',
        delegationType: 'AllPages',
        pageIds: [],
        answeredPageIds: [],
        canReadOtherPages: false,
        delegationDateTime: '2023-01-17T05:52:53.781Z',
        delegationCompletedDateTime: null,
        status: 'Pending',
        isDeleted: false,
        messagingDisplayText:
          'Delegate Name: test_delegate -- Delegate Completed On: 1/17/2023 5:53 AM',
        guid: '00000000-0000-0000-0000-000000000000',
      },
    ],
  },
  {
    type: 'IntegerList',
    fieldId: 12191,
    value: [1],
  },
  {
    type: 'IntegerList',
    fieldId: 12192,
    value: [925],
  },
  {
    type: 'String',
    fieldId: 12894,
    value: 'test',
  },
  {
    type: 'Decimal',
    fieldId: 12895,
    value: 10,
  },
  {
    type: 'Guid',
    fieldId: 12896,
    value: '2b70ebb9-af45-4165-9a23-da44acce7bf7',
  },
  {
    type: 'Date',
    fieldId: 12897,
    value: '2023-02-10T07:19:46.629Z',
  },
  {
    type: 'Integer',
    fieldId: 12144,
    value: 2,
  },
  {
    type: 'Date',
    fieldId: 12145,
    value: '2023-01-24T04:03:06.13Z',
  },
  {
    type: 'Date',
    fieldId: 12146,
    value: '2023-02-10T04:06:29.985Z',
  },
  {
    type: 'Date',
    fieldId: 12147,
    value: '2023-02-10T04:06:29.985Z',
  },
  {
    type: 'Integer',
    fieldId: 12148,
    value: 2,
  },
  {
    type: 'Integer',
    fieldId: 12149,
    value: 2,
  },
  {
    type: 'Integer',
    fieldId: 12150,
    value: 2,
  },
  {
    type: 'String',
    fieldId: 12151,
    value: 'Stevan Freeborn',
  },
  {
    type: 'String',
    fieldId: 12152,
    value: 'stevan.freeborn@onspring.com',
  },
  {
    type: 'Date',
    fieldId: 12153,
    value: '2023-01-24T04:03:06.128Z',
  },
  {
    type: 'Decimal',
    fieldId: 12155,
    value: 6,
  },
  {
    type: 'Decimal',
    fieldId: 12156,
    value: 9,
  },
  {
    type: 'Decimal',
    fieldId: 12157,
    value: 66.66666666666667,
  },
  {
    type: 'Integer',
    fieldId: 12160,
    value: 73,
  },
  {
    type: 'ScoringGroupList',
    fieldId: 12161,
    value: [
      {
        listValueId: '0eac7224-f4bc-4121-8ca5-1fe75f5cd576',
        name: 'group_one',
        score: 2,
        maximumScore: 3,
      },
      {
        listValueId: '743ddd0d-702d-414d-87d4-0aa4fe0c265e',
        name: 'group_two',
        score: 2,
        maximumScore: 4,
      },
      {
        listValueId: '4ff35205-bfe8-4639-8574-d0458fa7f85e',
        name: 'group_three',
        score: 2,
        maximumScore: 2,
      },
    ],
  },
  {
    type: 'Decimal',
    fieldId: 12162,
    value: 9,
  },
  {
    type: 'Decimal',
    fieldId: 12163,
    value: 66.66666666666667,
  },
  {
    type: 'ScoringGroupList',
    fieldId: 12164,
    value: [
      {
        listValueId: '0eac7224-f4bc-4121-8ca5-1fe75f5cd576',
        name: 'group_one',
        score: 2,
        maximumScore: 3,
      },
      {
        listValueId: '743ddd0d-702d-414d-87d4-0aa4fe0c265e',
        name: 'group_two',
        score: 2,
        maximumScore: 4,
      },
      {
        listValueId: '4ff35205-bfe8-4639-8574-d0458fa7f85e',
        name: 'group_three',
        score: 2,
        maximumScore: 2,
      },
    ],
  },
  {
    type: 'String',
    fieldId: 12165,
    value: 'stevan.freeborn@onspring.com',
  },
  {
    type: 'String',
    fieldId: 12166,
    value: 'Stevan Freeborn',
  },
  {
    type: 'IntegerList',
    fieldId: 12191,
    value: [2, 3, 4, 5, 6, 7],
  },
  {
    type: 'IntegerList',
    fieldId: 12192,
    value: [925],
  },
  {
    type: 'String',
    fieldId: 12263,
    value: '2',
  },
  {
    type: 'Date',
    fieldId: 12884,
    value: '2023-02-09T06:00:00Z',
  },
  {
    type: 'Guid',
    fieldId: 12885,
    value: 'e75b49cf-adb7-4b8e-a7e5-93ebf1948dba',
  },
  {
    type: 'Decimal',
    fieldId: 12886,
    value: 100,
  },
  {
    type: 'String',
    fieldId: 12887,
    value: 'this is a test',
  },
  {
    type: 'AttachmentList',
    fieldId: 12888,
    value: [
      {
        fileId: 1348,
        fileName: 'onspring-api-playground.py',
        notes: '',
        storageLocation: 'Internal',
      },
      {
        fileId: 1349,
        fileName: 'core_isolation_warning.png',
        notes: '',
        storageLocation: 'Internal',
      },
      {
        fileId: 1349,
        fileName: 'core_isolation_warning.png',
        notes: null,
        storageLocation: 'Internal',
      },
      {
        fileId: 1349,
        fileName: 'core_isolation_warning.png',
        notes: undefined,
        storageLocation: 'Internal',
      },
    ],
  },
  {
    type: 'FileList',
    fieldId: 12889,
    value: [1350, 1351],
  },
  {
    type: 'Integer',
    fieldId: 12890,
    value: 2,
  },
  {
    type: 'GuidList',
    fieldId: 12891,
    value: [
      'd7471a5f-6718-4368-8734-3e3e712bacd9',
      '3b3de61f-fa44-4e51-b70d-35992c2a1a6e',
    ],
  },
  {
    type: 'IntegerList',
    fieldId: 12892,
    value: [4, 5],
  },
  {
    type: 'TimeSpan',
    fieldId: 12893,
    value: {
      quantity: 10,
      increment: 'Days',
      recurrence: 'EndByDate',
      endAfterOccurrences: 10,
      endByDate: '2023-02-16T06:00:00Z',
    },
  },
  {
    type: 'TimeSpan',
    fieldId: 12893,
    value: {
      quantity: 10,
      increment: 'Days',
      recurrence: null,
      endAfterOccurrences: null,
      endByDate: null,
    },
  },
  {
    type: 'TimeSpan',
    fieldId: 12893,
    value: {
      quantity: 10,
      increment: 'Days',
      recurrence: undefined,
      endAfterOccurrences: undefined,
      endByDate: undefined,
    },
  },
  {
    type: 'String',
    fieldId: 12894,
    value: 'test',
  },
  {
    type: 'Decimal',
    fieldId: 12895,
    value: 10,
  },
  {
    type: 'Guid',
    fieldId: 12896,
    value: '2b70ebb9-af45-4165-9a23-da44acce7bf7',
  },
  {
    type: 'Date',
    fieldId: 12897,
    value: '2023-02-10T07:19:47.002Z',
  },
];
