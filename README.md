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
fw config set orcid-mail-to ***
fw config set orcid-mail-from ***
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
fw config set gobi-mail-to ***
fw config set gobi-mail-from ***
```

```
fw build gobi
fw activate gobi
```

## e-resource

E-resource Workflow.

```
fw config set e-resource-view LIBRARY_ERESOURCES
fw config set divit-cis-report-url ***
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
fw config set circ-fines-mail-to ***
fw config set circ-fines-mail-from ***
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

This utilizes LDP, which must have the table `dev.coral_extract` manually created.
Each execution of this workflow clears the LDP table `dev.coral_extract` near the start of the process.

```
fw config set coral-url ***
fw config set ldp-url ***
fw config set ldp-user ***
fw config set ldp-password ***
fw config set holdings-template-file ***
fw config set instance-template-file ***
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
fw config set medsci-gps-zone-file ***/grad_access.txt
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
