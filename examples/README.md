# fw-registry Examples

This provides examples on building and using a workflow.


## Setup

Follow the instructions from the `README.md` file at the root of this repository.

If using the `fw-cli`, then these examples require that the `wd` (Working Directory) for `fw-registry` to be set to this examples sub-directory.

This documentation's `curl` examples are based on the expectation that `mod-workflow` is started on port `9001` (via something like `SERVER_PORT=9001`).

Such as:
```shell
fw config set wd fw-registry/examples
```

The `wd` variable in the `fw-cli` configuration should then look something like this:
```
  "wd": "fw-registry/examples",
```


## Workflows

- [Example Compress File Task (Zip)](#example-compress-file-task-zip)
- [Example Database Connection Task](#example-database-connection-task)
- [Example Database Query Task](#example-database-query-task)
- [Example Email Task](#example-email-task)
- [Example File Task](#example-file-task)
- [Example FOLIO Login (JavaScript)](#example-folio-login-javascript)
- [Example FOLIO Request Task](#example-folio-request-task)
- [Example Input Task](#example-input-task)
- [Example Request Task](#example-request-task)
- [Example Script Task (JavaScript)](#example-script-task-javascript)
- [Example Script Task (Ruby)](#example-script-task-ruby)
- [Example Token Utility (JavaScript)](#example-token-utility-javascript)


### Example Compress File Task (Zip)

**Workflow Name**: `example-compressfiletask-zip`.

This workflows creates a file in a specified path and compresses it in a **ZIP** format.

These variables are required when **building** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------
| exampleFileName  | file name      | The name of the file within the specified directory path representing the file to compress (do not prefix with a starting slash).
| exampleFilePath  | directory path | The full directory path on the system where the source file and the compressed file will be stored on the server (exclude trailing slash after the directory).

```shell
fw config set exampleFilePath "/tmp/examples/path"
fw config set exampleFileName "file.txt"
```

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

The `exampleFilePath` will have `/testFileCreate` appended before adding the `exampleFileName`.
Given the example settings above, the full file path would therefore be `/tmp/examples/path/testFileCreate/file.txt`.

To build and activate:
```shell
fw build example-compressfiletask-zip
fw activate example-compressfiletask-zip
```

To manually execute via:
```shell
fw run example-compressfiletask-zip
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-compressfiletask-zip/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ }'
```


### Example Database Connection Task

**Workflow Name**: `example-databaseconnectiontask`.

This workflows connects to and disconnects from a given server/database.

These variables are required when **building** the workflow:

| Variable Name           | Allowed Values | Short Description
| ----------------------- | -------------- | -----------------
| exampleDatabasePassword | string         | The password of the database you want to connect to.
| exampleDatabaseURI      | URL            | The URI of the database you want to connect to.
| exampleDatabaseUser     | string         | The user name of the database you want to connect to.

```shell
fw config set exampleDatabasePassword ***
fw config set exampleDatabaseURI "jdbc:postgresql://localhost:5432/my_database"
fw config set exampleDatabaseUser "user"
```

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

To build and activate:
```shell
fw build example-databaseconnectiontask
fw activate example-databaseconnectiontask
```

To manually execute via:
```shell
fw run example-databaseconnectiontask
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-databaseconnectiontask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ }'
```


### Example Database Query Task

**Workflow Name**: `example-databasequerytask`.

This workflow connects to a database / server, queries the database, prints the response via Ruby scripting language, and disconnects from the database / server.

```shell
fw config set exampleDatabasePassword "examples"
fw config set exampleDatabaseURI "jdbc:postgresql://localhost:5432/examples"
fw config set exampleDatabaseUser "examples"
fw config set exampleQuery "SELECT id, name FROM users;"
```

These variables are required when **building** the workflow:

| Variable Name           | Allowed Values | Short Description
| ----------------------- | -------------- | -----------------
| exampleDatabasePassword | string         | The password of the database you want to connect to.
| exampleDatabaseURI      | URL            | The URI of the database you want to connect to.
| exampleDatabaseUser     | string         | The user name of the database you want to connect to.
| exampleQuery            | string         | The query.

The example query above requires the database to exist in the chosen database.
This can be done as a follows.

Make sure the `pg_hba.conf` is configured to allow user `examples` to connect to database `examples`:
```
host  examples examples 127.0.0.1/32 scram-sha-256
local examples examples              scram-sha-256
```

Populate the database:
```sql
CREATE USER examples password examples;
CREATE DATABASE examples OWNER examples;
```

Connect to the database:
```shell
psql -U examples examples
```

Create and populate the table:
```sql
CREATE TABLE users (id int, name text);
INSERT INTO users (id, name) VALUES ((1, "Me"), (2, "You"));
```

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

To build and activate:
```shell
fw build example-databasequerytask
fw activate example-databasequerytask
```

To manually execute via:
```shell
fw run example-databasequerytask
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-databasequerytask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ }'
```


### Example Email Task

**Workflow Name**: `example-emailtask`.

This workflows sends an email to the user who's email address is specified in the config file or as a user input.

These variables are required when **building** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------
| exampleEmailFrom | e-mail address | The source e-mail address to send from.

```shell
fw config set exampleEmailFrom "user@example.com"
```

These variables are available or required when **triggering** the workflow:

| Variable Name  | Allowed Values | Short Description
| -------------- | -------------- | -----------------
| exampleEmailTo | e-mail address | The destination e-mail address to send to.

To build and activate:
```shell
fw build example-emailtask
fw activate example-emailtask
```

To manually execute via:
```shell
fw run example-emailtask
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-emailtask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "exampleEmailTo": "you@example.com" }'
```


### Example File Task

**Workflow Name**: `example-filetask`.

This workflows creates a file in a specified path.

These variables are required when **building** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------
| exampleFileName  | file name      | The name of the file within the specified directory path representing the CSV file to process (do not prefix with a starting slash).
| exampleFilePath  | directory path | The full directory path on the system where the CSV file will be stored on the server (exclude trailing slash after the directory).

```shell
fw config set exampleFileName "file.txt"
fw config set exampleFilePath "/tmp/examples/path"
```

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

The `exampleFilePath` will have `/testFileCreate` appended before adding the `exampleFileName`.
Given the example settings above, the full file path would therefore be `/tmp/examples/path/testFileCreate/file.txt`.


To build and activate:
```shell
fw build example-filetask
fw activate example-filetask
```

To manually execute via:
```shell
fw run example-filetask
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-filetask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ }'
```


### Example FOLIO Login (JavaScript)

**Workflow Name**: `example-foliologin-js`.

This workflows tests logging into the FOLIO system, such as OKAPI`.
This performs the login, extracts the `Set-Cookie` header, and produces an `X-Okapi-Token`.
This `X-Okapi-Token` is then printed as the **Access Token**.

This also prints the the **Access Token** during processing when `logLevel` is set to `DEBUG`.

These variables are required when **building** the workflow:

| Variable Name  | Allowed Values | Short Description
| -------------- | -------------- | -----------------
| folioLoginPath | URL Path       | The FOLIO login path.
| gatewayUrl     | Gateway URL    | The FOLIO gateway URL.
| password       | String         | The FOLIO pass word.
| username       | String         | The FOLIO user name.

```shell
fw config set folioLoginPath "authn/login-with-expiry"
fw config set gatewayUrl "https://kong:8000"
fw config set password ***
fw config set username ***
```

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

To build and activate:
```shell
fw build example-foliologin-js
fw activate example-foliologin-js
```

To manually execute via:
```shell
fw run example-foliologin-js
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-foliologin-js/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{  }'
```


### Example FOLIO Request Task

**Workflow Name**: `example-foliorequesttask`.

This workflows sends a **GET** request to a given resource and prints the response using javaScript scripting language.

These variables are required when **building** the workflow:

| Variable Name         | Allowed Values | Short Description
| --------------------- | -------------- | -----------------
| exampleFolioUrlPath   | URL            | The FOLIO URL to send a GET request to.

```shell
fw config set exampleFolioUrlPath "http://www.example.com"
```

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

To build and activate:
```shell
fw build example-foliorequesttask
fw activate example-foliorequesttask
```

To manually execute via:
```shell
fw run example-foliorequesttask
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-foliorequesttask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ }'
```


### Example Input Task

**Workflow Name**: `example-inputtask`.

This workflows provides an example `InputTask`.

Testing this task requires that the tester to:
  1. log into the **Operaton Admin UI**.
  2. Find the `Example InputTask`.
  3. Select the running instance.
  4. Navigate to `User Tasks`.
  5. Add appropriate user (such as `admin`) as the `Assignee`.
  6. Select the `Task ID` link.
  7. Add a `String` variable named `field_1` with a value like `example`.
  8. Complete the form.

These variables are required when **building** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

```shell
fw config set exampleUrlPath ***
```

No variables are required when triggering the workflow.

To build and activate:
```shell
fw build example-inputtask
fw activate example-inputtask
```

To manually execute via:
```shell
fw run example-inputtask
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-inputtask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku'
```


### Example Request Task

**Workflow Name**: `example-requesttask`.

This workflows sends a **GET** request to a given resource and prints the response using Ruby scripting language.

```shell
fw config set exampleNormalUrlPath "http://www.example.com"
```

These variables are required when **building** the workflow:

| Variable Name        | Allowed Values | Short Description
| -------------------- | -------------- | -----------------
| exampleNormalUrlPath | URL            | The URL to send a GET request to.

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

To build and activate:
```shell
fw build example-requesttask
fw activate example-requesttask
```

To manually execute via:
```shell
fw run example-requesttask
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-requesttask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ }'
```


### Example Script Task (JavaScript)

**Workflow Name**: `example-scripttask-js`.

This workflows prints a variable and, based on a build variable substitution, will print the original or alternate value.

These variables are available or required when **building** the workflow:

| Variable Name      | Allowed Values | Short Description
| ------------------ | -------------- | -----------------
| exampleInjectValue | String or null | When empty, original value is printed. When non-empty, the value of this is printed.
| gatewayUrl         | Gateway URL    | The FOLIO gateway URL.

```shell
fw config set exampleInjectValue "Custom Value"
fw config set gatewayUrl "https://kong:8000"
```

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

To build and activate:
```shell
fw build example-scripttask-js
fw activate example-scripttask-js
```

To manually execute via:
```shell
fw run example-scripttask-js
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-scripttask-js/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ }'
```


### Example Script Task (Ruby)

**Workflow Name**: `example-scripttask-ruby`.

This workflows prints a hello world message on the screen utilizing Ruby as a scripting language.

These variables are available or required when **building** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

To build and activate:
```shell
fw build example-scripttask-ruby
fw activate example-scripttask-ruby
```

To manually execute via:
```shell
fw run example-scripttask-ruby
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/example-scripttask-ruby/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ }'
```


### Example Token Utility (JavaScript)

**Workflow Name**: `example-tokenutility-js`.

This workflows tests the loading of a cookie using the `TokenUtility` Java class.
A unit test-like behavior is performed, producing results of success or failure if the expected token is received or not.

This also prints the JavaScript version when `logLevel` is set to `DEBUG`.

These variables are available or required when **building** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

These variables are available or required when **triggering** the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------

To build and activate:
```shell
fw build example-tokenutility-js
fw activate example-tokenutility-js
```

To manually execute via:
```shell
fw run example-tokenutility-js
```

Trigger the workflow using an **HTTP** request, such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-tokenutility-js/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ }'
```
