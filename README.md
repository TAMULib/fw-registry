# fw-registry

Start mod-workflow and mod-camunda.

```
cd mod-workflow
mvn clean install
cd service
mvn clean spring-boot:run
```

```
cd mod-camunda
mvn clean spring-boot:run
```

## Warnings

- Be sure to check and update the tenant header in all the curl requests documented below.

## patron

DivIT patron workflow. (Scheduled)

> Can use fw-cli mock okapi service to test. `yarn okapi`

```
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
```

```
fw build patron
fw activate patron
```

## orcid

Extract for ORCID workflow.

```
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
fw config set orcid-mail-from ***
fw config set orcid-mail-to ***
```

```
fw build orcid
fw activate orcid
```

```
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/orcid/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: diku' \
--data-raw '{"emailTo": "you@example.com"}'
```

## gobi

ISBN report to GOBI workflow. (Scheduled)

```
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set gobi-mail-from ***
fw config set gobi-mail-to ***
```

```
fw build gobi
fw activate gobi
```

## e-resource

E-resource Workflow.

```
fw config set e-resource-view LIBRARY_ERESOURCES
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
```

```
fw build e-resource
fw activate e-resource
```

```
fw run e-resource

or

curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/e-resource/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: diku' \
--data-raw '{}'
```

## purchase-orders

Purchase Orders Workflow.

```
fw build purchase-orders
fw activate purchase-orders

curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/purchase-orders/start' \
--header 'Content-Type: multipart/form-data' \
--header 'X-Okapi-Tenant: tern' \
--form 'logLevel="INFO"' \
--form 'file=@"/GOBI Print (1).mrc"' \
--form 'path="/mnt/po"' \
--form 'statisticalCode="ybppapp"' \
--form 'okapiUrl="https://folio-okapi-test.library.tamu.edu"' \
--form 'username="***"' \
--form 'password="***"' \
--form 'permLocation="Evans stk"' \
--form 'tempLocation="Evans nbs"' \
--form 'fiscalYearCode="FY2021"' \
--form 'permLoanType="normal"' \
--form 'tempLoanType="newbook"' \
--form 'noteType="General note"' \
--form 'materialType="unmediated -- volume"' \
--form 'permELocation="www_evans"' \
--form 'eMaterialType="computer -- online resource"' \
--form 'eHoldingsType="Unknown"' \
--form 'emailFrom="me@example.com"' \
--form 'emailTo="you@example.com"'
```

## circ-fines

Circulation Fees/Fines Daily Report. (Scheduled)

```
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set circ-fines-mail-from ***
fw config set circ-fines-mail-to ***
```

```
fw build circ-fines
fw activate circ-fines
```

## rapid-print-serials

Rapid ILS Print Serials Monthly Report. (Scheduled)

```
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```
fw build rapid-print-serials
fw activate rapid-print-serials
```

## rapid-print-monos

Rapid ILS Print Monos Monthly Report. (Scheduled)

```
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```
fw build rapid-print-monos
fw activate rapid-print-monos
```

## rapid-electronic-serials

Rapid ILS Electronic Serials Monthly Report. (Scheduled)

```
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

```
fw config set coral-url ***
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```
fw build coral-extract
fw activate coral-extract
```

```
fw run coral-extract

or

Wait for the cron job to execute.
```

## medsci-gps-zone

MedSci GPS Zone

For the `medsci-gps-zone-file` setting, the file name (without the path part) should likely be `grad_access.txt`.

```
fw config set divit-url ***
fw config set divit-user ***
fw config set divit-password ***
fw config set medsci-gps-zone-from ***
fw config set medsci-gps-zone-to ***
```

```
fw build medsci-gps-zone
fw activate medsci-gps-zone
```

```
fw run medsci-gps-zone
```

## hathitrust

HathiTrust Export

```
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```
fw build hathitrust
fw activate hathitrust
```

```
fw run hathitrust
```

## create-tags

Create Tags Workflow.

```
fw build create-tags
fw activate create-tags

curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/create-tags/start' \
--header 'Content-Type: multipart/form-data' \
--header 'X-Okapi-Tenant: tamu' \
--form 'logLevel="DEBUG"' \
--form 'file=@"FOLIOTags.csv"' \
--form 'path="/mnt/workflows/${tenantId}/create-tags"' \
--form 'username="***"' \
--form 'password="***"'
```

## shelflist-holdings

Shelflist (holdings level) Report Workflow.

```
fw config set mis-catalog-reports-url https://localhost/catalog_reports/site
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```
fw build shelflist-holdings
fw activate shelflist-holdings

curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/shelflist-holdings/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: tern' \
--data-raw '{ "logLevel": "INFO", "emailFrom": "folio@k1000.library.tamu.edu", "emailTo": "wwelling@library.tamu.edu", "libraryName': "[\"Texas A&M University Qatar Library\"], "locationDiscoveryDisplayName": "[]", "locationName": "[]", "language=": "[]", "resourceType": "[]", "format": "[]", "batchId": "", "issuance": "", "suppressInstance": false, "suppressHoldings": false, "createdDateStart": "", "createdDateEnd": "", "updatedDateStart": "", "updatedDateEnd": "" }'

```

## shelflist-items

Shelflist (items level) Report Workflow.

```
fw config set mis-catalog-reports-url https://localhost/catalog_reports/site
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```
fw build shelflist-holdings
fw activate shelflist-holdings

curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/shelflist-items/start' \
--header 'Content-Type: application/json' \
--header 'X-Okapi-Tenant: tern' \
--data-raw '{ "logLevel": "INFO", "emailFrom": "folio@k1000.library.tamu.edu", "emailTo": "wwelling@library.tamu.edu", "libraryName": "[\"Texas A&M University Qatar Library\"] ", "locationDiscoveryDisplayName": "[]", "locationName": "[]", "loanType": "[]", "materialType": "[]", "itemStatus": "[]", "createdDateStart": "", "createdDateEnd": "", "updatedDateStart": "", "updatedDateEnd": "" }'

```

## item-history-update

Item History Update Workflow.

```
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

```
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

```shell
fw config set okapi-internal ***
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
```

These variables are required when triggering the workflow:

| Variable Name  | Allowed Values | Short Description |
| -------------- | -------------- | ----------------- |
| path           | directory path | The directory on the system where the CSV file is stored within on the server and contain the `tenantPath` (include trailing slash after the directory). |
| file           | file name      | The file path within the specified directory path representing the CSV file to process (do not prefix with a starting slash). |
| emailFrom      | e-mail address | An e-mail address used as the "FROM" in the sent e-mails. |
| emailTo        | e-mail address | An e-mail address used as the "TO" in the sent e-mails. |
| itemNoteTypeId | UUID           | The Item Note Type UUID to be used for the Note. |
| noteText       | string         | A message used as the Note. |
| staffOnly      | boolean        | Designate whether or not this is a *Staff Only* note. |
| username       | string         | Okapi login username. |
| password       | string         | Okapi login password. |
| ldp-user       | string         | LDP login username. |
| ldp-password   | string         | LDP login password. |
| ldp-url        | URL            | LDP URL. |


To build and activate:
```shell
fw build create-notes
fw activate create-notes
```

Trigger the workflow using an **HTTP** request such as with **Curl**:
```shell
curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/create-notes/start' \
  --header 'Content-Type: multipart/form-data' \
  --header 'X-Okapi-Tenant: diku' \
  --form 'logLevel="INFO"' \
  --form 'emailFrom="folio@k1000.library.tamu.edu"' \
  --form 'emailTo="wwelling@library.tamu.edu"' \
  --form 'file=@"itemBarcodes.csv"' \
  --form 'path="/mnt/workflows/${tenantId}/create-notes/"' \
  --form 'itemNoteTypeId="d5684236-e4ab-4a64-97b3-2aa7a595cfc4"' \
  --form 'noteText="This is a note text message."' \
  --form 'staffOnly=false' \
  --form 'username="***"' \
  --form 'password="***"'
```

## books-call-number

### Books Checked Out By Call Number Report Workflow

This workflow queries checked-out books within a specific call number range, generates a list, and emails this list to the specified recipient.

These variables are required when triggering the workflow:

| Variable Name           | Allowed Values | Short Description |
| --------------          | -------------- | ----------------- |
| path                    | directory path | The directory on the system where the files, like the CSV file, are stored within on the server and contain the `tenantPath` (include trailing slash after the directory). |
| startRange              | string         | Start Range of call number. |
| endRange                | string         | End range of call number. |
| username                | string         | Okapi login username. |
| password                | string         | Okapi login password. |
| ldp-user                | string         | LDP login username. |
| ldp-password            | string         | LDP login password. |
| ldp-url                 | URL            | LDP URL. |
| bcn-mail-to             | e-mail address | An e-mail address used as the "TO" in the sent e-mails. |
| bcn-mail-from           | e-mail address | An e-mail address used on behalf of the workflow. |
| mis-catalog-reports-url | URL            | URL for the MIS Catalog Reports website. |
| logLevel                | string         | Designate the desired logging, such as "INFO", "WARN", or "DEBUG". |

This utilizes **LDP** to get the query result which gets written to: */mnt/workflows/tamu/books-call-number* path.

```shell

fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set bcn-mail-from ***
fw config set mis-catalog-reports-url https://localhost/catalog_reports/site

```

To build and activate:

```shell

fw build books-call-number
fw activate books-call-number

```

User inititates form submission from catalog_reports Book-Call-Number Report.

Trigger the workflow using an **HTTP** request such as with **Curl**:

```shell

curl --location --request POST 'http://localhost:9001/mod-workflow/events/workflow/books-call-number/start' \
  --header 'Content-Type: application/json' \
  --header 'X-Okapi-Tenant: diku' \
  --data-raw '{"logLevel": "INFO", "bcn-mail-from": "folio@k1000.library.tamu.edu", "startRange": "a0", "endRange":"b9","username":"*","password":"*", "bcm-mail-to": "recipient@tamu.edu", "path": "/mnt/workflows/${tenantId}/bcn" }'

```
