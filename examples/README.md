# fw-registry Examples

This provides examples on building and using a workflow.

## Setup

Follow the instructions from the `Readme.md` file at the root of this repository.

If using the `fw-cli`, then these examples require that the `wd` (Working Directory) for `fw-registry` to be set to this examples sub-directory.

Such as:
```shell
fw config set wd fw-registry/examples
```

The `wd` variable in the `fw-cli` configuration should then look something like this:
```
  "wd": "fw-registry/examples",
```

## example-compressfiletask-zip

### Example Compress File Task (Zip) Workflow

This workflows creates a file in a specified path and compresses it in a zip format.

```shell
fw config set exampleFilePath ***
fw config set exampleFileName ***
```

These variables are required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description |
| ---------------- | -------------- | ----------------- |
| exampleFilePath  | directory path | The full directory path on the system where the CSV file will be stored on the server (exclude trailing slash after the directory).  |
| exampleFileName  | file name      | The name of the file within the specified directory path representing the CSV file to process (do not prefix with a starting slash). |
| logLevel         | [INFO,DEBUG]   | Desired log level. |

To build and activate:
```shell
fw build example-compressfiletask-zip
fw activate example-compressfiletask-zip
```

To manually execute via:
```shell
fw run example-compressfiletask-zip
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-compressfiletask-zip/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "logLevel": "INFO" }'
```

## example-database-connection-task

### Example DatabaseConnectionTask Workflow

This workflows connects to and disconnects from a given server/database.

```shell
fw config set exampleDatabaseURI ***
fw config set exampleDatabaseUser ***
fw config set exampleDatabasePassword ***
```

These variables are required when triggering the workflow:

| Variable Name           | Allowed Values | Short Description |
| ------------------------| -------------- | ----------------- |
| exampleDatabaseURI      | URL            | The URI of the database you want to connect to. |
| exampleDatabaseUser     | string         | The username of the database you want to connect to. |
| exampleDatabasePassword | string         | The password of the database you want to connect to. |
| logLevel                | [INFO,DEBUG]   | Desired log level. |

To build and activate:
```shell
fw build example-databasetask-connect
fw activate example-databasetask-connect
```

To manually execute via:
```shell
fw run example-databasetask-connect
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-databasetask-connect/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "logLevel": "INFO" }'
```

## example-database-query-task

### Example DatabaseQueryTask Workflow

This workflow connects to a database / server, queries the database, prints the response via Ruby scripting language, and disconnects from the database / server.

```shell
fw config set exampleDatabaseURI ***
fw config set exampleDatabaseUser ***
fw config set exampleDatabasePassword ***
fw config set exampleQuery ***
```

These variables are required when triggering the workflow:

| Variable Name           | Allowed Values | Short Description |
| ------------------------| -------------- | ----------------- |
| exampleDatabaseURI      | URL            | The URI of the database you want to connect to. |
| exampleDatabaseUser     | string         | The username of the database you want to connect to. |
| exampleDatabasePassword | string         | The password of the database you want to connect to. |
| exampleQuery            | string         | The query. |
| logLevel                | [INFO,DEBUG]   | Desired log level. |

To build and activate:
```shell
fw build example-databasetask-query
fw activate example-databasetask-query
```

To manually execute via:
```shell
fw run example-databasetask-query
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-databasetask-query/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "logLevel": "INFO" }'
```

## example-emailtask

### Example EmailTask Workflow

This workflows sends an email to the user who's email address is specified in the config file or as a user input.

```shell
fw config set exampleEmailFrom ***
```

These variables are required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description |
| ---------------- | -------------- | ----------------- |
| exampleEmailFrom | e-mail address | The source e-mail address to send from. |
| exampleEmailTo   | e-mail address | The destination e-mail address to send to. |
| logLevel         | [INFO,DEBUG]   | Desired log level |

To build and activate:
```shell
fw build example-emailtask
fw activate example-emailtask
```

To manually execute via:
```shell
fw run example-emailtask
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-emailtask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "logLevel": "INFO", "exampleEmailTo": "you@example.com" }'
```

## example file-task

### Example FileTask Workflow

This workflows creates a file in a specified path.

```shell
fw config set exampleFilePath ***
fw config set exampleFileName ***
```

These variables are required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description |
| ---------------- | -------------- | ----------------- |
| exampleFilePath  | directory path | The full directory path on the system where the CSV file will be stored on the server (exclude trailing slash after the directory).  |
| exampleFileName  | file name      | The name of the file within the specified directory path representing the CSV file to process (do not prefix with a starting slash). |
| logLevel         | [INFO,DEBUG]   | Desired log level. |


To build and activate:
```shell
fw build example-filetask
fw activate example-filetask
```

To manually execute via:
```shell
fw run example-filetask
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-filetask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "logLevel": "INFO" }'
```

## example-inputtask

### Example InputTask

This workflows provides an example `InputTask`.

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
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-inputtask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku'
```

## example-request-task

### Example RequestTask Workflow

This workflows sends a GET request to a given resource and prints the response using Ruby scripting language.

```shell
fw config set exampleUrlPath ***
```

These variables are required when triggering the workflow:

| Variable Name    | Allowed Values | Short Description |
| ---------------- | -------------- | ----------------- |
| exampleUrlPath   | URL            | The URL to send a GET request to. |
| logLevel         | [INFO,DEBUG]   | Desired log level. |

To build and activate:
```shell
fw build example-requesttask
fw activate example-requesttask
```

To manually execute via:
```shell
fw run example-requesttask
```

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/example-requesttask/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{ "logLevel": "INFO" }'
```

## example-scripttask-ruby

### Example ScriptTask Ruby Workflow

This workflows prints a hello world message on the screen utilizing Ruby as a scripting language.

To build and activate:
```shell
fw build example-scripttask-ruby
fw activate example-scripttask-ruby
```

To manually execute via:
```shell
fw run example-scripttask-ruby
```
