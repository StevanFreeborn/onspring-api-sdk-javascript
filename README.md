# Onspring API Javascript SDK

[![lint_format_test](https://github.com/StevanFreeborn/onspring-api-sdk-javascript/actions/workflows/lint_format_test.yaml/badge.svg?branch=master)](https://github.com/StevanFreeborn/onspring-api-sdk-javascript/actions/workflows/lint_format_test.yaml)
[![codecov](https://codecov.io/github/StevanFreeborn/onspring-api-sdk-javascript/branch/master/graph/badge.svg?token=G1L3GKE0LV)](https://codecov.io/github/StevanFreeborn/onspring-api-sdk-javascript)
[![build_publish](https://github.com/StevanFreeborn/onspring-api-sdk-javascript/actions/workflows/build_publish.yml/badge.svg?branch=master)](https://github.com/StevanFreeborn/onspring-api-sdk-javascript/actions/workflows/build_publish.yml)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![NPM](https://img.shields.io/npm/l/onspring-api-sdk)](License.txt)
![npm](https://img.shields.io/npm/v/onspring-api-sdk)
![npm](https://img.shields.io/npm/dt/onspring-api-sdk)

The Javascript SDK for the Onspring API is meant to simplify development in Javascript for Onspring customers who want to build integrations with their Onspring instance.

**Note:** This is an unofficial SDK for the Onspring API. It was not built in consultation with Onspring Technologies LLC or a member of their development team.

This SDK was developed independently using Onspring's existing [C# SDK](https://github.com/onspring-technologies/onspring-api-sdk), the Onspring API's [swagger page](https://api.onspring.com/swagger/index.html), and [api documentation](https://software.onspring.com/hubfs/Training/Admin%20Guide%20-%20v2%20API.pdf) as the starting point with the intention of making development of integrations done in Javascript with an Onspring instance quicker and more convenient.

## 🛠️ Dependencies

### Node.js

![node-current](https://img.shields.io/node/v/onspring-api-sdk)

Requires use of [Node.js](https://nodejs.org/en/) 14.x or later.

### Axios

![npm (prod) dependency version](https://img.shields.io/npm/dependency-version/onspring-api-sdk/axios)

All methods for the `OnspringClient` make use of the [Axios](https://axios-http.com/) http client to interact with the Onspring API.

### Form-Data

![npm (prod) dependency version](https://img.shields.io/npm/dependency-version/onspring-api-sdk/form-data)

When it is necessary to send requests to the Onspring API using `multi-part/form-data` the [Form-Data](https://www.npmjs.com/package/form-data) package is used.

## 💾 Installation

Install the SDK using [npm](https://www.npmjs.com/):

`npm install onspring-api-sdk`

## 🔑 API Key

In order to successfully interact with the Onspring Api you will need an API key. API keys are obtained by an Onspring user with permissions to at least **Read** API Keys for your instance via the following steps:

1. Login to the Onspring instance.
2. Navigate to **Administration** > **Security** > **API Keys**
3. On the list page, add a new API Key - this will require **Create** permissions - or click an existing API key to view its details.
4. Click on the **Developer Information** tab.
5. Copy the **X-ApiKey Header** value from this tab.

**Important:**

- An API Key must have a status of `Enabled` in order to make authorized requests.
- Each API Key must have an assigned Role. This role controls the permissions for requests made. If the API Key used does not have sufficient permissions the requests made won't be successful.

### 🔒 Permission Considerations

You can think of any API Key as another user in your Onspring instance and therefore it is subject to all the same permission considerations as any other user when it comes to its ability to access data in your instance. The API Key you use needs to have all the correct permissions within your instance to access the data requested. Things to think about in this context are `role security`, `content security`, and `field security`.

## 🧑🏻‍💻 Start Coding

### `OnspringClient`

The most common way to use the SDK is to create an `OnspringClient` instance and call its methods. Its constructor requires two parameters:

- `baseUrl` - currently this should always be: `https://api.onspring.com`
- `apiKey` - the value obtained by following the steps in the **API Key** section

It is best practice to read these values in from a configuration file for both flexibility and security purposes.

Example `.env` file:

```env
API_KEY=000000ffffff000000ffffff/00000000-ffff-0000-ffff-000000000000
BASE_URL=https://api.onspring.com
```

Example constructing `OnspringClient`:

`CommonJS`

```js
const { OnspringClient } = require('onspring-api-sdk');
const dotenv = require('dotenv');
dotenv.config();

const client = new OnspringClient(process.env.BASE_URL, process.env.API_KEY);
```

`ES Module`

```js
import dotenv from 'dotenv';
import { OnspringClient } from 'onspring-api-sdk';
dotenv.config();

const client = new OnspringClient(process.env.BASE_URL, process.env.API_KEY);
```

### `Axios` Instance Configuration

By default when you construct an instance of the `OnspringClient` a new `Axios` instance will also be created. Its `baseURL` property will always be set to the `baseUrl` parameter based to the `OnspringClient`'s constructor and its headers will always contain the proper `x-api-key` header.

You can though pass a third optional argument to the `OnspringClient` constructor that specifies additional configuration options for the `Axios` instance used to make requests.

```js
import dotenv from 'dotenv';
import { OnspringClient } from 'onspring-api-sdk';
dotenv.config();

const configs = {
  timeout: 5000,
};

const client = new OnspringClient(
  process.env.BASE_URL,
  process.env.API_KEY,
  configs
);
```

### `ApiResponse`

Each `OnspringClient` method - aside from `canConnect` - returns an `ApiResponse` object which will have the following properties:

- `statusCode` - The http status code of the response.
- `isSuccessful` - Indicates whether the request succeeded.
- `data` - If the request was successful will contain the response data deserialized to custom classes.
- `message` - A message that may provide more detail about the request when no successful

### CommonJS or ES Modules

There is support for using either CommonJS or ES Modules depending upon your preference. This documentation will use the later in the usage examples.

### Types

The package is written in typescript and all types are exported and available for you to use.

### Full API Documentation

You may wish to refer to the full [Onspring API documentation](https://software.onspring.com/hubfs/Training/Admin%20Guide%20-%20v2%20API.pdf) when determining which values to pass as parameters to some of the `OnspringClient` methods. There is also a [swagger page](https://api.onspring.com/swagger/index.html) that you can use for making exploratory requests.

## 📋 Examples

Note the following code snippets assume you've already instantiated an `OnspringClient` as shown in the [OnspringClient](#onspringclient) section.

### Connectivity

#### Verify connectivity

```js
const res = await client.canConnect();
console.log(res); // true or false
```

### Apps

#### Get Apps

Returns a paged collection of apps and/or surveys that can be paged through. By default the page size is 50 and page number is 1.

```js
const res = await client.getApps();
const apps = res.data.items;

for (const app of apps) {
  console.log(app);
}
```

You can set your own page size and page number (max is 1,000) as well.

```js
import { PagingRequest } from 'onspring-api-sdk';

const res = await client.getApps(new PagingRequest(1, 1));
const apps = res.data.items;

for (const app of apps) {
  console.log(app);
}
```

#### Get App By Id

Returns an Onspring app or survey according to provided id.

```js
const res = await client.getAppById(130);
const app = res.data;

console.log(app);
```

#### Get Apps By Ids

Returns a collection of Onspring apps and/or surveys according to provided ids.

```js
const res = await client.getAppsByIds([130, 131]);
const apps = res.data.items;

for (const app of apps) {
  console.log(app);
}
```

### Fields

#### Get Field By Id

Returns an Onspring field according to provided id.

```js
const res = await client.getFieldById(4793);
const field = res.data;

console.log(field);
```

#### Get Fields By Ids

Returns a collection of Onspring fields according to provided ids.

```js
const res = await client.getFieldsByIds([4793, 4801]);
const fields = res.data.items;

for (const field of fields) {
  console.log(field);
}
```

#### Get Fields By App Id

Returns a paged collection of fields that can be paged through. By default the page size is 50 and page number is 1.

```js
const res = await client.getFieldsByAppId(132);
const fields = res.data.items;

for (const field of fields) {
  console.log(field);
}
```

You can set your own page size and page number (max is 1,000) as well.

```js
import { PagingRequest } from 'onspring-api-sdk';

const res = await client.getFieldsByAppId(132, new PagingRequest(1, 1));
const fields = res.data.items;

for (const field of fields) {
  console.log(field);
}
```

### Files

#### Get File Info By Id

Returns the Onspring file's metadata.

```js
const res = await client.getFileInfoById(1, 4806, 909);
const fileInfo = res.data;

console.log(fileInfo);
```

#### Get File By Id

Returns the file itself.

```js
import fs from 'fs';

const res = await client.getFileById(1, 4806, 909);
const file = res.data;

console.log(file.contentLength);
console.log(file.contentType);
console.log(file.fileName);
file.stream.pipe(fs.createWriteStream(file.fileName));
```

#### Save File

```js
import fs from 'fs';
import { SaveFileRequest } from 'onspring-api-sdk';

const request = new SaveFileRequest(
  1,
  4806,
  'notes',
  new Date(),
  'test-attachment.txt',
  'text/plain',
  fs.createReadStream('test-attachment.txt')
);

const res = await client.saveFile(request);
const fileId = res.data.id;

console.log(fileId);
```

#### Delete File By Id

```js
const res = await client.deleteFileById(1, 4806, 1505);

res.statusCode === 204
  ? console.log('File deleted')
  : console.log('Error deleting file');
```

### Lists

#### Add Or Update List Value

To add a list value don't provide an id value.

```js
import { ListItemRequest } from 'onspring-api-sdk';

const request = new ListItemRequest(638, null, 'New Value', 1, '#000000');
const res = await client.addOrUpdateListItem(request);
const itemId = res.data.id;

console.log(itemId);
```

To update a list value provide an id value.

```js
import { ListItemRequest } from 'onspring-api-sdk';

const request = new ListItemRequest(
  638,
  '35c79a46-04b8-4069-bbc1-161a175f962c',
  'Updated Value',
  1,
  '#000000'
);

const res = await client.addOrUpdateListItem(request);
const itemId = res.data.id;

console.log(itemId);
```

#### Delete List Value

```js
const res = await client.deleteListItemById(
  638,
  '35c79a46-04b8-4069-bbc1-161a175f962c'
);

res.statusCode === 204
  ? console.log('List item deleted')
  : console.log('Error deleting list item');
```

### Records

#### Get Records By App Id

Returns a paged collection of records that can be paged through. By default the page size is 50 and page number is 1.

```js
import { GetRecordsByAppIdRequest } from 'onspring-api-sdk';

const request = new GetRecordsByAppIdRequest(130);
const res = await client.getRecordsByAppId(request);
const records = res.data.items;

for (const record of records) {
  console.log(record);
}
```

You can set your own page size and page number (max is 1,000) as well. In addition to specifying what field values to return and in what format (Raw vs. Formatted) to return them.

```js
import {
  DataFormat,
  GetRecordsByAppIdRequest,
  PagingRequest,
} from 'onspring-api-sdk';

const request = new GetRecordsByAppIdRequest(
  130,
  [4804],
  DataFormat.Raw,
  new PagingRequest(1, 1)
);

const res = await client.getRecordsByAppId(request);
const records = res.data.items;

for (const record of records) {
  console.log(record);
}
```

#### Get Record By Id

Returns an onspring record based on the provided app and record ids.

```js
import { GetRecordRequest } from 'onspring-api-sdk';

const request = new GetRecordRequest(130, 1);
const res = await client.getRecordById(request);
const record = res.data;

console.log(record);
```

You can also specify what field values to return and in what format (Raw vs. Formatted) to return them.

```js
import { DataFormat, GetRecordRequest } from 'onspring-api-sdk';

const request = new GetRecordRequest(130, 1, [4804], DataFormat.Raw);
const res = await client.getRecordById(request);
const record = res.data;

console.log(record);
```

#### Get Records By Ids

Returns a collection of Onspring records based on the provided appId and recordIds.

```js
import { GetRecordsRequest } from 'onspring-api-sdk';

const request = new GetRecordsRequest(130, [1]);
const res = await client.getRecordsByIds(request);
const records = res.data.items;

for (const record of records) {
  console.log(record);
}
```

You can also specify what field values to return and in what format (Raw vs. Formatted) to return them.

```js
import { DataFormat, GetRecordsRequest } from 'onspring-api-sdk';

const request = new GetRecordsRequest(130, [1], [4804], DataFormat.Formatted);
const res = await client.getRecordsByIds(request);
const records = res.data.items;

for (const record of records) {
  console.log(record);
}
```

#### Query Records

Returns a paged collection of records based on a criteria that can be paged through. By default the page size is 50 and page number is 1.

```js
import {
  FilterOperators,
  QueryFilter,
  QueryRecordsRequest,
} from 'onspring-api-sdk';

const filter = new QueryFilter(4745, FilterOperators.GreaterThan, 0);
const request = new QueryRecordsRequest(130, filter);
const res = await client.queryRecords(request);
const records = res.data.items;

for (const record of records) {
  console.log(record);
}
```

You can set your own page size and page number (max is 1,000) as well. In addition to specifying what field values to return and in what format (Raw vs. Formatted) to return them.

```js
import {
  DataFormat,
  FilterOperators,
  PagingRequest,
  QueryFilter,
  QueryRecordsRequest,
} from 'onspring-api-sdk';

const filter = new QueryFilter(4745, FilterOperators.GreaterThan, 0);
const request = new QueryRecordsRequest(
  130,
  filter,
  [4804],
  DataFormat.Formatted,
  new PagingRequest(1, 1)
);

const res = await client.queryRecords(request);
const records = res.data.items;

for (const record of records) {
  console.log(record);
}
```

For further details on constructing the `filter` parameter please refer to the [documentation](https://software.onspring.com/hubfs/Training/Admin%20Guide%20-%20v2%20API.pdf) for the Onspring API.

#### Add or Update A Record

You can add a record by not providing a record id value. If successful will return the id of the added record.

```js
import { Record, StringRecordValue } from 'onspring-api-sdk';

const record = new Record(130, null);
const fieldValue = new StringRecordValue(4804, 'Test');
record.addValue(fieldValue);

const res = await client.saveRecord(record);
const newRecordId = res.data.id;

console.log(newRecordId);
```

You can update a record by providing its id. If successful will return the id of record updated.

```js
import { Record, StringRecordValue } from 'onspring-api-sdk';

const record = new Record(130, 607);
const fieldValue = new StringRecordValue(4804, 'Updated');
record.addValue(fieldValue);

const res = await client.saveRecord(record);
const updatedRecordId = res.data.id;

console.log(updatedRecordId);
```

#### Delete Record By Id

Delete an individual record based upon its id.

```js
const res = await client.deleteRecordById(130, 607);

res.statusCode === 204
  ? console.log('Record deleted')
  : console.log('Error deleting record');
```

#### Delete Records By Ids

Delete a batch of records based upon their ids.

```js
const res = await client.deleteRecordsByIds(130, [608, 609]);

res.statusCode === 204
  ? console.log('Records deleted')
  : console.log('Error deleting records');
```

### Reports

#### Get Report By Id

Returns the report for the provided id.

```js
const res = await client.getReportById(408);
const report = res.data;

console.log(report);
```

You can also specify the format of the data in the report as well as whether you are requesting the report's data or its chart data.

```js
import { DataFormat, ReportDataType } from 'onspring-api-sdk';

const res = await client.getReportById(
  409,
  DataFormat.Formatted,
  ReportDataType.ChartData
);
const report = res.data;

console.log(report);
```

#### Get Reports By App Id

Returns a paged collection of reports that can be paged through. By default the page size is 50 and page number is 1.

```js
const res = await client.getReportsByAppId(130);
const reports = res.data.items;

for (const report of reports) {
  console.log(report);
}
```

You can set your own page size and page number (max is 1,000) as well.

```js
import { PagingRequest } from 'onspring-api-sdk';

const res = await client.getReportsByAppId(130, new PagingRequest(1, 1));
const reports = res.data.items;

for (const report of reports) {
  console.log(report);
}
```
