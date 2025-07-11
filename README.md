# fw-registry

Copyright © 2019-2025 Texas A&M University Libraries under the [MIT license](LICENSE).

Start mod-workflow and mod-camunda.

```shell
cd mod-workflow
mvn clean install
cd service
mvn clean spring-boot:run
```

```shell
cd mod-camunda
mvn clean spring-boot:run
```

## Warnings

- Be sure to check and update the tenant header in all the curl requests documented below.

## Variable Substitution

The [Workflow](https://github.com/folio-org/mod-workflow/) JSON files are templates that are pre-processed by [fw-cli](https://github.com/TAMULib/fw-cli) using the [Handlebars template engine](https://handlebarsjs.com/). The Handlebars template engine follows the [Mustache Syntax](https://mustache.github.io/mustache.5.html). Some properties are also processed using the [Free Marker Template Utilities](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/ui/freemarker/FreeMarkerTemplateUtils.html) by the Workflow engine called [Camunda](https://github.com/folio-org/mod-camunda/). Camunda may then perform its own pre-processing of the templates while using the [BPMN](https://www.bpmn.org/) based on the [JUEL Syntax](https://jcp.org/aboutJava/communityprocess/mrel/jsr245/index.html). See also the [JUEL Project Page](http://juel.sourceforge.net/).

***These variables might be used to hold credentials/secrets in the fw-cli configurations within the home directory of the user using the fw-cli script.***

1. **Build time** arguments are processed and substituted during the use of `fw build` from the fw-cli project.
1. The fw-cli build-time arguments use the two braces `{{}}` or three braces `{{{}}}` and follows the Mustache Syntax.
1. The two braces `{{}}` will result in HTML encoding of the substituted values.
1. The three braces `{{{}}}` will result in raw values being substituted.
1. **Run time** arguments use the dollar and one brace syntax `${}` from the Workflow) engine.
1. The JUEL Syntax uses minus signs for mathematical interpretation of variables and therefore minus signs `-` and plus signs `+` should be avoided (avoid using *kabab-case* variable names).
1. Workflow) engines other than Camunda may or may not follow the JUEL Syntax.

## patron

DivIT patron workflow. (Scheduled)

These variables are required when building and running the workflow:

|    Variable Name    | Allowed Values | Brief Description |
| ------------------- | -------------- | ----------------- |
| divit-password      | string         | DivIt login password. |
| divit-url           | URL            | DivIt URL. |
| divit-user          | string         | DivIt login username. |
| overridePatronEmail | string or null | Forcibly replace all e-mails with this (for testing and debugging only). |

```shell
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
fw config set overridePatronEmail ***
```

```shell
fw build patron
fw activate patron
```

## orcid

Extract for ORCID workflow.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| divit-password  | string         | DivIt login password. |
| divit-url       | URL            | DivIt URL. |
| divit-user      | string         | DivIt login username. |
| orcid-mail-from | e-mail address | The e-mail address of the sender. |
| orcid-mail-to   | e-mail address | The e-mail address of the recipient. |

```shell
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
fw config set orcid-mail-from ***
fw config set orcid-mail-to ***
```

```shell
fw build orcid
fw activate orcid
```

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/orcid/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: diku' \
--data-raw '{"emailTo": "you@example.com"}'
```

## gobi

ISBN report to GOBI workflow. (Scheduled)

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| gobi-mail-from | e-mail address | The e-mail address of the sender. |
| gobi-mail-to   | e-mail address | The e-mail address of the recipient. |
| ldp-password   | string         | LDP login password. |
| ldp-url        | URL            | LDP URL. |
| ldp-user       | string         | LDP login username. |

```shell
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set gobi-mail-from ***
fw config set gobi-mail-to ***
```

```shell
fw build gobi
fw activate gobi
```

## e-resource

E-resource Workflow.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| divit-password | string         | DivIt login password. |
| divit-url      | URL            | DivIt URL. |
| divit-user     | string         | DivIt login username. |
| resource-view  | string         | The name of the resource view. |

```shell
fw config set e-resource-view LIBRARY_ERESOURCES
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
```

```shell
fw build e-resource
fw activate e-resource
```

```shell
fw run e-resource
```

or

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/e-resource/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: diku' \
--data-raw '{}'
```

## purchase-orders

Purchase Orders Workflow.

These variables are required when building and running the workflow:

|  Variable Name   | Allowed Values | Brief Description |
| ---------------- | -------------- | ----------------- |
| callNumberTypeId | string         | A call number type ID to use. |
| eHoldingsType    | string         | An e-holdings type to use. |
| emailFrom        | e-mail address | The e-mail address of the sender. |
| emailTo          | e-mail address | The e-mail address of the recipient. |
| eMaterialType    | string         | An e-material type to use. |
| file             | file name      | The file path within the specified directory path representing the MARC file to process. |
| fiscalYearCode   | string         | A fiscal year code to use. |
| holdingsType     | string         | A holdings type to use. |
| logLevel         | string         | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |
| materialType     | string         | A material type to use. |
| noteType         | string         | A Note type. |
| okapiUrl         | URL            | The (public or external) Okapi URL. |
| okapi-internal   | URL            | The (internal) Okapi URL. |
| password         | string         | Okapi login password. |
| path             | directory path | The directory on the system where the MARC file is stored. |
| permELocation    | string         | A permanent e-location to use. |
| permLoanType     | string         | A permanent Loan type to use. |
| permLocation     | string         | A permanent location to use. |
| statisticalCode  | string         | A statistical code to use. |
| tempLoanType     | string         | A temporary Loan type to use. |
| tempLocation     | string         | A temporary location to use. |
| username         | string         | Okapi login username. |

```shell
fw config set okapi-internal ***
```

```shell
fw build purchase-orders
fw activate purchase-orders
```

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/purchase-orders/start' \
--header 'Content-Type: multipart/form-data' \
--header 'X-Okapi-Tenant: diku' \
--form 'callNumberTypeId="95467209-6d7b-468b-94df-0f5d7ad2747d"' \
--form 'eHoldingsType="Unknown"' \
--form 'emailFrom="me@example.com"' \
--form 'emailTo="you@example.com"' \
--form 'eMaterialType="computer -- online resource"' \
--form 'file=@"/example.mrc"' \
--form 'fiscalYearCode="FY2021"' \
--form 'holdingsType="Monograph"' \
--form 'logLevel="INFO"' \
--form 'materialType="unmediated -- volume"' \
--form 'noteType="General note"' \
--form 'okapiUrl="https://okapi"' \
--form 'password="***"' \
--form 'path="/mnt/po"' \
--form 'permELocation="www_evans"' \
--form 'permLoanType="normal"' \
--form 'permLocation="Evans stk"' \
--form 'statisticalCode="ybppapp"' \
--form 'tempLoanType="newbook"' \
--form 'tempLocation="Evans nbs"' \
--form 'username="***"'
```

## circ-fines

Circulation Fees/Fines Daily Report. (Scheduled)

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| ldp-password         | string         | LDP login password. |
| ldp-url              | URL            | LDP URL. |
| ldp-user             | string         | LDP login username. |
| medsci-gps-zone-from | e-mail address | The e-mail address of the sender. |
| medsci-gps-zone-to   | e-mail address | The e-mail address of the recipient. |

```shell
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set circ-fines-mail-from ***
fw config set circ-fines-mail-to ***
```

```shell
fw build circ-fines
fw activate circ-fines
```

## rapid-print-serials

Rapid ILS Print Serials Monthly Report. (Scheduled)

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| ldp-password   | string         | LDP login password. |
| ldp-url        | URL            | LDP URL. |
| ldp-user       | string         | LDP login username. |

```shell
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```shell
fw build rapid-print-serials
fw activate rapid-print-serials
```

## rapid-print-monos

Rapid ILS Print Monos Monthly Report. (Scheduled)

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| ldp-password   | string         | LDP login password. |
| ldp-url        | URL            | LDP URL. |
| ldp-user       | string         | LDP login username. |

```shell
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```shell
fw build rapid-print-monos
fw activate rapid-print-monos
```

## rapid-electronic-serials

Rapid ILS Electronic Serials Monthly Report. (Scheduled)

```shell
fw build rapid-electronic-serials
fw activate rapid-electronic-serials
```

## coral-extract

Extract Coral Data and Import it into Folio (Scheduled).

This utilizes LDP, which must have tables `mis.coral_extract` and `mis.coral_instances` manually created.
Each execution of this workflow clears the LDP table `mis.coral_extract` near the start of the process.

```sql
CREATE SCHEMA mis AUTHORIZATION ldpadmin;

GRANT USAGE ON SCHEMA mis TO ldp;
GRANT USAGE ON SCHEMA mis TO ldpadmin;

ALTER DEFAULT PRIVILEGES IN SCHEMA mis GRANT ALL PRIVILEGES ON TABLES TO ldp;
ALTER DEFAULT PRIVILEGES IN SCHEMA mis GRANT ALL PRIVILEGES ON TABLES TO ldpadmin;

CREATE TABLE mis.coral_extract (
coralid int2 NOT NULL,
contributor varchar(256) NULL,
title varchar(256) NULL,
publisher varchar(256) NULL,
summary varchar(4000) NULL,
natureofcontentterm varchar(200) NULL,
electronicaccess varchar(2000) NULL,
status varchar(8) NULL,
CONSTRAINT coral_extract_pkey PRIMARY KEY (coralid)
);

CREATE TABLE mis.coral_instances (
coralid int2 NOT NULL,
instanceid varchar(36) NULL,
CONSTRAINT coral_instances_pkey PRIMARY KEY (coralid)
);
```

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| coral-url      | URL            | Coral server URL. |
| ldp-password   | string         | LDP login password. |
| ldp-url        | URL            | LDP URL. |
| ldp-user       | string         | LDP login username. |

```shell
fw config set coral-url ***
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```shell
fw build coral-extract
fw activate coral-extract
```

```shell
fw run coral-extract
```

or wait for the cron job to be auto-triggered.

## medsci-gps-zone

MedSci GPS Zone

For the `medsci-gps-zone-file` setting, the file name (without the path part) should likely be `grad_access.txt`.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| divit-password       | string         | DivIt login password. |
| divit-url            | URL            | DivIt URL. |
| divit-user           | string         | DivIt login username. |
| medsci-gps-zone-from | e-mail address | The e-mail address of the sender. |
| medsci-gps-zone-to   | e-mail address | The e-mail address of the recipient. |

```shell
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
fw config set medsci-gps-zone-from ***
fw config set medsci-gps-zone-to ***
```

```shell
fw build medsci-gps-zone
fw activate medsci-gps-zone
```

```shell
fw run medsci-gps-zone
```

## hathitrust

HathiTrust Export

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| ldp-password   | string         | LDP login password. |
| ldp-url        | URL            | LDP URL. |
| ldp-user       | string         | LDP login username. |

```shell
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```shell
fw build hathitrust
fw activate hathitrust
```

```shell
fw run hathitrust
```

## create-tags

Create Tags Workflow.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| file                    | file name      | The file path within the specified directory path representing the CSV file to process (do not prefix with a starting slash). |
| logLevel                | string         | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |
| mis-catalog-reports-url | URL            | Catalog Reports URL (must not include a trailing slash). |
| password                | string         | Okapi login password. |
| path                    | directory path | The system directory where the CSV file is stored on the server that also contains the `tenantPath` (include trailing slash after the directory). |
| username                | string         | Okapi login username.

```shell
fw build create-tags
fw activate create-tags

curl --location --request POST 'http://localhost:9001/mod-workflow/events/create-tags/start' \
--header 'Content-Type: multipart/form-data' \
--header 'X-Okapi-Tenant: diku' \
--form 'logLevel="INFO"' \
--form 'file=@"FOLIOTags.csv"' \
--form 'path="/mnt/workflows/diku/create-tags"' \
--form 'username="***"' \
--form 'password="***"'
```

## shelflist-holdings

Shelflist (holdings level) Report Workflow.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| batchId                      | UUID   | A batch ID. |
| createdDateEnd               | string | A created end date. |
| createdDateStart             | string | A created start date. |
| emailFrom                    | e-mail address | The e-mail address of the sender. |
| emailTo                      | e-mail address | The e-mail address of the recipient. |
| format                       | string | A JSON Array of formats. |
| issuance                     | string | An issuance name. |
| language                     | string | A JSON Array of languages. |
| ldp-password                 | string | LDP login password. |
| ldp-url                      | URL    | LDP URL. |
| ldp-user                     | string | LDP login username. |
| libraryName                  | string | A JSON Array of library names. |
| logLevel                     | string | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |
| locationDiscoveryDisplayName | string | A JSON Array of location names. |
| locationName                 | string | A JSON Array of location names. |
| mis-catalog-reports-url      | URL    | Catalog Reports URL (must not include a trailing slash). |
| resourceType                 | string | A JSON Array of resource types. |
| suppressHoldings             | boolean | Designate whether or not Holdings should be suppressed. |
| suppressInstance             | boolean | Designate whether or not Instances should be suppressed. |
| updatedDateEnd               | string | An updated end date. |
| updatedDateStart             | string | An updated start date. |

```shell
fw config set mis-catalog-reports-url https://localhost/catalog_reports/site
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```shell
fw build shelflist-holdings
fw activate shelflist-holdings

curl --location --request POST 'http://localhost:9001/mod-workflow/events/shelflist-holdings/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: diku' \
--data-raw '{ "logLevel": "INFO", "emailFrom": "me@example.com", "emailTo": "you@example.com", "libraryName": "[\"Example Library\"]", "locationDiscoveryDisplayName": "[]", "locationName": "[]", "language": "[]", "resourceType": "[]", "format": "[]", "batchId": "", "issuance": "", "suppressInstance": false, "suppressHoldings": false, "createdDateStart": "", "createdDateEnd": "", "updatedDateStart": "", "updatedDateEnd": "" }'
```

## shelflist-items

Shelflist (items level) Report Workflow.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| batchId                      | UUID   | A batch ID. |
| createdDateEnd               | string | A created end date. |
| createdDateStart             | string | A created start date. |
| emailFrom                    | e-mail address | The e-mail address of the sender. |
| emailTo                      | e-mail address | The e-mail address of the recipient. |
| itemStatus                   | string | A JSON Array of Item statuses. |
| ldp-password                 | string | LDP login password. |
| ldp-url                      | URL    | LDP URL. |
| ldp-user                     | string | LDP login username. |
| libraryName                  | string | A JSON Array of library names. |
| loanType                     | string | A JSON Array of loan types. |
| logLevel                     | string | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |
| locationDiscoveryDisplayName | string | A JSON Array of location names. |
| locationName                 | string | A JSON Array of location names. |
| materialType                 | string | A JSON Array of material types. |
| mis-catalog-reports-url      | URL    | Catalog Reports URL (must not include a trailing slash). |
| updatedDateEnd               | string | An updated end date. |
| updatedDateStart             | string | An updated start date. |

```shell
fw config set mis-catalog-reports-url https://localhost/catalog_reports/site
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```shell
fw build shelflist-items
fw activate shelflist-items
```

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/shelflist-items/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: diku' \
--data-raw '{ "logLevel": "INFO", "emailFrom": "me@example.com", "emailTo": "you@example.com", "libraryName": "[\"Example Library\"]", "locationDiscoveryDisplayName": "[]", "locationName": "[]", "loanType": "[]", "materialType": "[]", "itemStatus": "[]", "createdDateStart": "", "createdDateEnd": "", "updatedDateStart": "", "updatedDateEnd": "" }'
```

## item-history-update

Item History Update Workflow.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| ldp-password   | string         | LDP login password. |
| ldp-url        | URL            | LDP URL. |
| ldp-user       | string         | LDP login username. |

```shell
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```shell
fw build item-history-update
fw activate item-history-update
fw run item-history-update
```

## nbs-items-note

### New Bookshelf Items Note Workflow (Scheduled)

This workflows adds a special check-in note for *New Bookshelf Items* for a specific temporary location **UUID**.
If the check-in note already exists, then the new note is not added.

This utilizes **LDP** in order to fine-tune the query in ways not normally allowed via the **FOLIO** **REST** end points.
These fetched *Items* are then used to fetch an up to date version using the appropriate **FOLIO** **REST** end point and updates the *Items* as appropriate using the appropriate **FOLIO** **REST** end point.

The scheduled event is for **12:00pm UTC**, which is **7:00am in CDT**.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| ldp-password   | string         | LDP login password. |
| ldp-url        | URL            | LDP URL. |
| ldp-user       | string         | LDP login username. |
| okapi-internal | URL            | The (internal) Okapi URL. |
| password       | string         | Okapi login password. |
| username       | string         | Okapi login username. |

```shell
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set okapi-internal ***
fw config set username ***
fw config set password ***
```

To build and activate:
```shell
fw build nbs-items-note
fw activate nbs-items-note
```

Either wait for scheduled event to occur or manually execute via:
```shell
fw run nbs-items-note
```

## create-notes

### FOLIO Create Notes Workflow

This workflow adds a given note, specified by the *Note Type UUID*, with the given *Note Text* message and the given *Staff Only* setting.
If a given Note already exists on an Item then that Note is not added multiple times to the Item.

This utilizes **LDP** in order to fine-tune the query in ways not normally allowed via the **FOLIO** **REST** end points.
These fetched *Items* are then used to fetch an up to date version using the appropriate **FOLIO** **REST** end point and updates the *Items* as appropriate using the appropriate **FOLIO** **REST** end point.

At the end of this process, an e-mail is set to the given destination address.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| emailFrom      | e-mail address | The e-mail address of the sender. |
| emailTo        | e-mail address | The e-mail address of the recipient. |
| file           | file name      | The file path within the specified directory path representing the CSV file to process (do not prefix with a starting slash). |
| itemNoteTypeId | UUID           | The Item Note Type UUID to be used for the Note. |
| noteText       | string         | A message used as the Note. |
| ldp-password   | string         | LDP login password. |
| ldp-url        | URL            | LDP URL. |
| ldp-user       | string         | LDP login username. |
| logLevel       | string         | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |
| okapi-internal | URL            | The (internal) Okapi URL. |
| password       | string         | Okapi login password. |
| path           | directory path | The system directory where the CSV file is stored on the server that also contains the `tenantPath` (include trailing slash after the directory). |
| staffOnly      | boolean        | Designate whether or not this is a *Staff Only* note. |
| username       | string         | Okapi login username. |

```shell
fw config set okapi-internal ***
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

To build and activate:
```shell
fw build create-notes
fw activate create-notes
```

Trigger the workflow using an **HTTP** request such as with **Curl**:
```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/create-notes/start' \
  --header 'Content-Type: multipart/form-data' \
  --header 'X-Okapi-Tenant: diku' \
  --form 'logLevel="INFO"' \
  --form 'emailFrom="me@example.com"' \
  --form 'emailTo="you@example.com"' \
  --form 'file=@"itemBarcodes.csv"' \
  --form 'path="/mnt/workflows/diku/create-notes/"' \
  --form 'itemNoteTypeId="d5684236-e4ab-4a64-97b3-2aa7a595cfc4"' \
  --form 'noteText="This is a note text message."' \
  --form 'staffOnly=false' \
  --form 'username="***"' \
  --form 'password="***"'
```

## remove-books-from-nbs

For the uploaded CSV of call numbers, remove items that have been on the new bookshelf location for more than 30 days.

These variables are required when building and running the workflow:

| Variable Name  | Allowed Values | Brief Description |
| -------------- | -------------- | ----------------- |
| nbs-mail-from  | e-mail address | The e-mail address of the sender. |
| emailTo        | e-mail address | The e-mail address of the recipient. |
| file           | file name      | The file path within the specified directory path representing the CSV file to process (do not prefix with a starting slash). |
| logLevel       | string         | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |
| password       | string         | Okapi login password. |
| path           | directory path | The system directory where the CSV file is stored on the server that also contains the `tenantPath` (include trailing slash after the directory). |
| username       | string         | Okapi login username. |

```shell
fw config set okapi-internal ***
fw config set nbs-mail-from ***
```

To build and activate:
```shell
fw build remove-books-from-nbs
fw activate remove-books-from-nbs
```

Trigger the workflow using an **HTTP** request such as with **Curl**:
```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/remove-books-from-nbs/start' \
  --header 'Content-Type: multipart/form-data' \
  --header 'X-Okapi-Tenant: diku' \
  --form 'logLevel="INFO"' \
  --form 'emailTo="you@example.com"' \
  --form 'file=@"itemBarcodes.csv"' \
  --form 'path="/mnt/workflows/diku/remove-books-from-nbs/"' \
  --form 'username="***"' \
  --form 'password="***"'
```

## books-call-number

### Books Checked Out By Call Number Report Workflow

This workflow queries checked-out books within a specific call number range, generates a list, and emails this list to the specified recipient.

These variables are required when building and running the workflow:

| Variable Name           | Allowed Values | Brief Description |
| --------------          | -------------- | ----------------- |
| bcnMailFrom             | e-mail address | The e-mail address of the sender. |
| bcnMailTo               | e-mail address | The e-mail address of the recipient. |
| endRange                | string         | End range of call number. |
| metadb-password         | string         | MetaDb login password. |
| metadb-url              | URL            | MetaDb URL. |
| metadb-user             | string         | MetaDb login username. |
| locationName            | string         | A JSON Array of location names from the reporting table `item_ext`. |
| logLevel                | string         | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |
| mis-catalog-reports-url | URL            | Catalog Reports URL (must not include a trailing slash). |
| password                | string         | Okapi login password. |
| path                    | directory path | The directory on the system where the files, like the CSV file, are stored within on the server and contain the `tenantPath` (include trailing slash after the directory). |
| startRange              | string         | Start Range of call number. |
| username                | string         | Okapi login username. |

This utilizes **MetaDB** to get the query result which gets written to: */mnt/workflows/tamu/books-call-number* path.

```shell
fw config set metadb-url ***
fw config set metadb-user ***
fw config set metadb-password ***
fw config set bcnMailFrom ***
fw config set mis-catalog-reports-url https://localhost/catalog_reports/site
```

To build and activate:

```shell
fw build books-call-number
fw activate books-call-number
```

The user initiates the form submission using the Catalog Reports Book-Call-Number Report.

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/books-call-number/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{"bcnMailTo": "recipient@tamu.edu", "endRange":"b9", "locationName": "[]", "logLevel": "INFO", "password":"*", "path": "/mnt/workflows/diku/bcn", "startRange": "a0", "username":"*" }'
```

## evans-pres-repr

### Evans Pres Repr Workflow (Scheduled)

This workflow sends a monthly email containing a list of all items with 'temporary location' set to "Eva Pres Repr" to a specifically configured email address `evansPresReprFrom`.

These variables are required when building and running the workflow:

| Variable Name           | Allowed Values | Brief Description |
| --------------          | -------------- | ----------------- |
| evansPresReprFrom       | e-mail address | The e-mail address of the sender. |
| evansPresReprTo         | e-mail address | The e-mail address of the recipient. |
| ldp-url                 | URL            | LDP URL. |
| ldp-user                | string         | LDP login username. |
| ldp-password            | string         | LDP login password. |
| logLevel                | string         | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |

This utilizes **LDP** to get the query result which gets written to: */mnt/workflows/tamu/evans-pres-repr* path.

The scheduled event is for **8:00AM UTC** on the first day of every month.

```shell
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set evansPresReprFrom ***
fw config set evansPresReprTo ***
```

To build and activate:
```shell
fw build evans-pres-repr
fw activate evans-pres-repr
```

Either wait for scheduled event to occur or manually execute via:
```shell
fw run evans-pres-repr
```

## duplicate-instance-report

### Instance Duplication Report Workflow (Scheduled)

This workflow emails a CSV report for Call Number, ISBN, LCCN, ISSN, and OCLC matches as well as a full instance duplication CSV report compressed with ZIP format.

The full instance duplication CSV has the following columns. The title and author columns are wrapped in double quotes.

```
HRID, HRID2, OCLC, ISBN, ISSN, CALL_NUMBER, LCCN, TITLE, TITLE2, AUTHOR, AUTHOR2
```

Requires following path `/mnt/workflows/${tenantId}/duplicate-instance-report`.


These variables are required when building and running the workflow:

| Variable Name                  | Allowed Values | Brief Description |
| ------------------------------ | -------------- | ----------------- |
| ldp-url                        | URL            | LDP URL. |
| ldp-user                       | string         | LDP login username. |
| ldp-password                   | string         | LDP login password. |
| duplicate-instance-report-from | e-mail address | The e-mail address of the report sender. |
| duplicate-instance-report-to   | e-mail address | The e-mail address of the report recipient. |

The scheduled event is for **12:00 AM UTC**, on the first of the month, only in January, April, July, and October.

```shell
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set duplicate-instance-report-from ***
fw config set duplicate-instance-report-to ***
```

To build and activate:
```shell
fw build duplicate-instance-report
fw activate duplicate-instance-report
```

Either wait for scheduled event to occur or manually execute via:
```shell
fw run duplicate-instance-report
```

## hegis-purchase-order

### Hegis Purchase Order Workflow

The user initiates the form submission using the Catalog Reports Hegis Purchase Order Workflow.

Requires following path `/mnt/workflows/${tenantId}/hegis-po`.

These variables are required when building and running the workflow:

| Variable Name           | Allowed Values | Brief Description |
| ----------------------- | -------------- | ----------------- |
| logLevel                | string         | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |
| ldp-password            | string         | LDP login password. |
| ldp-url                 | URL            | LDP URL. |
| ldp-user                | string         | LDP login username. |
| hegisPoEmailFrom        | e-mail address | The e-mail address of the sender. |
| emailTo                 | e-mail address | The e-mail address of the recipient. |
| mis-catalog-reports-url | URL            | Catalog Reports URL (must not include a trailing slash). |
| hegis                   | string         | A JSON Array of Hegis codes. |
| sysUnitCodes            | string         | A JSON Array of system unit codes. |
| poType                  | string         | The purchase order type. |


```shell
fw config set mis-catalog-reports-url https://localhost/catalog_reports/site
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set hegisPoEmailFrom ***
```

To build and activate:
```shell
fw build hegis-po
fw activate hegis-po
```

Trigger the workflow using an **HTTP** request such as with **Curl**:
```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/hegis-po/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: diku' \
--data-raw '{ "logLevel": "DEBUG", "emailTo": "you@example.com", "hegis": "[\"Example Hegis Code\"]", "sysUnitCodes": "[\"Example System Unit Code\"]", "poType": "[\"Example Purchase Order Type\"]" }'
```
