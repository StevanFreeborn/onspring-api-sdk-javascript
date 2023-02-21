# Onspring API Javascript SDK

[![lint_format_test](https://github.com/StevanFreeborn/onspring-api-sdk-javascript/actions/workflows/lint_format_test.yaml/badge.svg?branch=master)](https://github.com/StevanFreeborn/onspring-api-sdk-javascript/actions/workflows/lint_format_test.yaml)
[![codecov](https://codecov.io/github/StevanFreeborn/onspring-api-sdk-javascript/branch/master/graph/badge.svg?token=G1L3GKE0LV)](https://codecov.io/github/StevanFreeborn/onspring-api-sdk-javascript)
[![build_publish](https://github.com/StevanFreeborn/onspring-api-sdk-javascript/actions/workflows/build_publish.yml/badge.svg?branch=master)](https://github.com/StevanFreeborn/onspring-api-sdk-javascript/actions/workflows/build_publish.yml)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

The javascript SDK for the Onspring API is meant to simplify development in Javascript for Onspring customers who want to build integrations with their Onspring instance.

Note: This is an unofficial SDK for the Onspring API. It was not built in consultation with Onspring Technologies LLC or a member of their development team.

This SDK was developed independently using their existing C# SDK, their swagger page, and api documentation as the starting point with the intention of making development of integrations done in Javascript with an Onspring instance quicker and more convenient.

## Dependencies

### Node.js

Requires use of [Node.js](https://nodejs.org/en/) 14.x or later.

### Axios

All methods for the `OnspringClient` make use of the [Axios](https://axios-http.com/) http client to interact with the Onspring API.

### Form-Data

When it is necessary to send requests to the Onspring API using `multi-part/form-data` the [Form-Data](https://www.npmjs.com/package/form-data) package is used.

## Installation

Install the SDK using [npm](https://www.npmjs.com/):

`npm install onspring-api-sdk`

## API Key

In order to successfully interact with the Onspring Api you will need an API key. API keys are obtained by an Onspring user with permissions to at least **Read** API Keys for your instance via the following steps:

1. Login to the Onspring instance.
2. Navigate to **Administration** > **Security** > **API Keys**
3. On the list page, add a new API Key - this will require **Create** permissions - or click an existing API key to view its details.
4. Click on the **Developer Information** tab.
5. Copy the **X-ApiKey Header** value from this tab.

## Start Coding

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
import { OnspringClient } from 'onspring-api-sdk';
import dotenv from 'dotenv';
dotenv.config();

const client = new OnspringClient(process.env.BASE_URL, process.env.API_KEY);
```

#### Axios Instance Configuration

By default when you construct an instance of the `OnspringClient` the a new `Axios` instance will also be created. Its `baseURL` property will always be set to the `baseUrl` parameter based to the `OnspringClient`'s constructor and its headers will always contain the proper `x-api-key` header.

You can though pass a third optional argument to the `OnspringClient` constructor that specifies additional configuration options for the `Axios` instance used to make requests.

```js

```

### `ApiResponse`

Each `OnspringClient` method - aside from `canConnect` - returns an `ApiResponse` object which will have the following properties:

- `statusCode` - The http status code of the response.
- `isSuccessful` - Indicates whether the request succeeded.
- `data` - If the request was successful will contain the response data deserialized to custom classes.
- `message` - A message that may provide more detail about the request when no successful

## CommonJS or ES Modules

There is support for using either CommonJS or ES Modules depending upon your preference. This documentation will use the later in the usage examples.

## Types

The package is written in typescript and all types are exported and availabe for you to use if you prefer to use typescript.

## Full API Documentation

You may wish to refer to the full [Onspring API documentation](https://software.onspring.com/hubfs/Training/Admin%20Guide%20-%20v2%20API.pdf) when determining which values to pass as parameters to some of the `OnspringClient` methods. There is also a [swagger page](https://api.onspring.com/swagger/index.html) that you can use for making exploratory requests.

### Connectivity

#### Verify connectivity

```js
import { client } from './onspringClient.mjs';

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
  console.log(app.name);
  console.log(app.id);
  console.log(app.href);
}
```

You can set your own page size and page number (max is 1,000) as well.

```js
import { PagingRequest } from 'onspring-api-sdk';

const res = await client.getApps(new PagingRequest(1, 1));
const apps = res.data.items;

for (const app of apps) {
  console.log(app.name);
  console.log(app.id);
  console.log(app.href);
}
```

#### Get App By Id

Returns an Onspring app or survey according to provided id.

```js
const res = await client.getAppById(130);
const app = res.data;

console.log(app.name);
console.log(app.id);
console.log(app.href);
```

#### Get Apps By Ids

Returns a collection of Onspring apps and/or surveys according to provided ids.

```js
const res = await client.getAppsByIds([130, 131]);
const apps = res.data.items;

for (const app of apps) {
  console.log(app.name);
  console.log(app.id);
  console.log(app.href);
}
```

### Fields

#### Get Field By Id

Returns an Onspring field according to provided id.

```js

```

#### Get Fields By Ids

Returns a collection of Onspring fields according to provided ids.

```js

```

#### Get Fields By App Id

Returns a paged collection of fields that can be paged through. By default the page size is 50 and page number is 1.

```js

```

You can set your own page size and page number (max is 1,000) as well.

```js

```

### Files

#### Get File Info By Id

Returns the Onspring file's metadata.

```js

```

#### Get File By Id

Returns the file itself.

```js

```

#### Save File

```js

```

#### Delete File By Id

```js

```

### Lists

#### Add Or Update List Value

To add a list value don't provide an id value.

```js

```

To update a list value provide an id value.

```js

```

#### Delete List Value

```js

```

### Records

#### Get Records By App Id

Returns a paged colletion of records that can be paged through. By default the page size is 50 and page number is 1.

```js

```

You can set your own page size and page number (max is 1,000) as well. In addition to specifying what field values to return and in what format (Raw vs. Formatted) to return them.

```js

```

#### Get Record By Id

Returns an onspring record based on the provided app and record ids.

```js

```

You can also specify what field values to return and in what format (Raw vs. Formatted) to return them.

```js

```

#### Get Records By Ids

Returns a collection of Onspring records based on the provided appId and recordIds.

```js

```

You can also specify what field values to return and in what format (Raw vs. Formatted) to return them.

```js

```

#### Query Records

Returns a paged colletion of records based on a criteria that can be paged through. By default the page size is 50 and page number is 1.

```js

```

You can set your own page size and page number (max is 1,000) as well. In addition to specifying what field values to return and in what format (Raw vs. Formatted) to return them.

```js

```

For further details on constructing the `filter` parameter please refer to the [documentation](https://software.onspring.com/hubfs/Training/Admin%20Guide%20-%20v2%20API.pdf) for v2 of the Onspring API.

#### Add or Update A Record

You can add a record by not providing a record id value. If successful will return the id of the added record.

```js

```

You can update a record by providing its id. If successful will return the id of record updated.

```js

```

#### Delete Records By Ids

```js

```

### Reports

#### Get Report By Id

Returns the report for the provided id.

```js

```

You can also specify the format of the data in the report as well as whether you are requesting the report's data or its chart data.

```js

```

#### Get Reports By App Id

Returns a paged collection of reports that can be paged through. By default the page size is 50 and page number is 1.

```js

```
