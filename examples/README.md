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


## example-compressfiletask-zip

### Example Compress File Task (Zip)

This workflows creates a file in a specified path and compresses it in a **ZIP** format.

```shell
fw config set exampleFilePath "/tmp/examples/path"
fw config set exampleFileName "file.txt"
```

These variables are available or required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------
| exampleFileName  | file name      | The name of the file within the specified directory path representing the file to compress (do not prefix with a starting slash).
| exampleFilePath  | directory path | The full directory path on the system where the source file and the compressed file will be stored on the server (exclude trailing slash after the directory).
| logLevel         | [INFO,DEBUG]   | Desired log level.

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
  --data-raw '{ "logLevel": "INFO" }'
```


## example-databaseconnectiontask

### Example Database Connection Task

This workflows connects to and disconnects from a given server/database.

```shell
fw config set exampleDatabasePassword ***
fw config set exampleDatabaseURI "jdbc:postgresql://localhost:5432/my_database"
fw config set exampleDatabaseUser "user"
```

These variables are available or required when triggering the workflow:

| Variable Name           | Allowed Values | Short Description
| ----------------------- | -------------- | -----------------
| exampleDatabasePassword | string         | The password of the database you want to connect to.
| exampleDatabaseURI      | URL            | The URI of the database you want to connect to.
| exampleDatabaseUser     | string         | The user name of the database you want to connect to.
| logLevel                | [INFO,DEBUG]   | Desired log level.

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
  --data-raw '{ "logLevel": "INFO" }'
```


## example-databasequerytask

### Example Database Query Task

This workflow connects to a database / server, queries the database, prints the response via Ruby scripting language, and disconnects from the database / server.

```shell
fw config set exampleDatabasePassword "examples"
fw config set exampleDatabaseURI "jdbc:postgresql://localhost:5432/examples"
fw config set exampleDatabaseUser "examples"
fw config set exampleQuery "SELECT id, name FROM users;"
```

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

These variables are available or required when triggering the workflow:

| Variable Name           | Allowed Values | Short Description
| ----------------------- | -------------- | -----------------
| exampleDatabasePassword | string         | The password of the database you want to connect to.
| exampleDatabaseURI      | URL            | The URI of the database you want to connect to.
| exampleDatabaseUser     | string         | The user name of the database you want to connect to.
| exampleQuery            | string         | The query.
| logLevel                | [INFO,DEBUG]   | Desired log level.

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
  --data-raw '{ "logLevel": "INFO" }'
```


## example-emailtask

### Example Email Task

This workflows sends an email to the user who's email address is specified in the config file or as a user input.

```shell
fw config set exampleEmailFrom "user@example.com"
```

These variables are available or required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------
| exampleEmailFrom | e-mail address | The source e-mail address to send from.
| exampleEmailTo   | e-mail address | The destination e-mail address to send to.
| logLevel         | [INFO,DEBUG]   | Desired log level

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
  --data-raw '{ "logLevel": "INFO", "exampleEmailTo": "you@example.com" }'
```


## example-filetask

### Example File Task

This workflows creates a file in a specified path.

```shell
fw config set exampleFileName "file.txt"
fw config set exampleFilePath "/tmp/examples/path"
```

These variables are available or required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------
| exampleFileName  | file name      | The name of the file within the specified directory path representing the CSV file to process (do not prefix with a starting slash).
| exampleFilePath  | directory path | The full directory path on the system where the CSV file will be stored on the server (exclude trailing slash after the directory).
| logLevel         | [INFO,DEBUG]   | Desired log level.

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
  --data-raw '{ "logLevel": "INFO" }'
```


## example-inputtask

### Example Input Task

This workflows provides an example `InputTask`.

Testing this task requires that the tester to log into the Camunda Admin UI, find the `Example InputTask`, select the running instance, navigate to `User Tasks`, add appropriate user (such as `admin`) as the `Assignee`, select the `Task ID` link, add a `String` variable named `field_1` with a value like `example`, and complete the form.

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
fw run example-requesttask
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl -w '\n' --location --request POST 'http://localhost:9001/events/example-inputtask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku'
```


## example-requesttask

### Example Request Task

This workflows sends a **GET** request to a given resource and prints the response using Ruby scripting language.

```shell
fw config set exampleUrlPath "http://www.example.com"
```

These variables are available or required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------
| exampleUrlPath   | URL            | The URL to send a GET request to.
| logLevel         | [INFO,DEBUG]   | Desired log level.

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
  --data-raw '{ "logLevel": "INFO" }'
```


## example-scripttask-js

### Example Script Task (JavaScript)

This workflows prints a variable and, based on a build variable substitution, will print the original or alternate value.

These variables are available or required when triggering the workflow:

| Variable Name      | Allowed Values | Short Description
| ------------------ | -------------- | -----------------
| logLevel           | [INFO,DEBUG]   | Desired log level.
| exampleInjectValue | String or null | When empty, original value is printed. When non-empty, the value of this is printed. |

```shell
fw config set exampleInjectValue "Custom Value"
```

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
  --data-raw '{ "logLevel": "INFO" }'
```


## example-scripttask-ruby

### Example Script Task (Ruby)

This workflows prints a hello world message on the screen utilizing Ruby as a scripting language.

These variables are available or required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------
| logLevel         | [INFO,DEBUG]   | Desired log level.

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
  --data-raw '{ "logLevel": "INFO" }'
```


## example-tokenutility-js

### Example Token Utility (JavaScript)

This workflows tests the loading of a cookie using the `TokenUtility` Java class.
A unit test-like behavior is performed, producing results of success or failure if the expected token is received or not.

This also prints the JavaScript version when `logLevel` is set to `DEBUG`.

```shell
fw config set logLevel "DEBUG"
```

These variables are available or required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description
| ---------------- | -------------- | -----------------
| logLevel         | [INFO,DEBUG]   | Desired log level.

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
  --data-raw '{ "logLevel": "INFO" }'
```
