const EDIFACT_DEFAULT_SEPS=Object.freeze({component:":",element:"+",decimal:".",release:"?",reserved:" ",segment:"'",hasUNA:!1}),UNA_PREFIX="UNA",UNA_LEN=9,isString=e=>"string"==typeof e,isArray=Array.isArray,trim=e=>e.trim(),truthy=e=>Boolean(e),startsWithUNA=e=>e.startsWith("UNA")&&e.length>=9,parseUNA=e=>startsWithUNA(e)?Object.freeze({component:e[3],element:e[4],decimal:e[5],release:e[6],reserved:e[7],segment:e[8],hasUNA:!0}):EDIFACT_DEFAULT_SEPS,stripUNA=(e,t)=>t.hasUNA?e.slice(9):e,buildUNA=e=>`UNA${e.component}${e.element}${e.decimal}${e.release}${e.reserved}${e.segment}`,splitWithRelease=(e,t,l)=>{let n=[],r="",i=!1;for(let s=0;s<e.length;s++){let a=e[s];if(i){r+=a,i=!1;continue}if(a===l){i=!0;continue}a===t?(n.push(r),r=""):r+=a}return n.push(r),n},parseEdifact=e=>{let t=parseUNA(e),l=stripUNA(e,t),n=splitWithRelease(l,t.segment,t.release).map(trim).filter(truthy),r=n.map(e=>{let l=splitWithRelease(e,t.element,t.release),n=l[0]??"",r=l.slice(1).map(e=>e.includes(t.component)?splitWithRelease(e,t.component,t.release):e);return{tag:n,elements:r}});return{seps:t,segments:r,hasUNA:t.hasUNA}},encodeValue=e=>t=>{let l=new Set([e.component,e.element,e.segment,e.release]),n=String(t),r="";for(let i of n)l.has(i)&&(r+=e.release),r+=i;return r},serializeEdifact=(e,{keepUNA:t=!0}={})=>{let{seps:l,segments:n,hasUNA:r}=e,i=encodeValue(l),s=n.map(({tag:e,elements:t})=>{let n=t.map(e=>isArray(e)?e.map(i).join(l.component):i(e));return[e,...n].join(l.element)}),a=s.join(l.segment)+l.segment;return t&&r?buildUNA(l)+a:a},getRffQualifierValue=(e,t)=>{if("RFF"!==e.tag)return null;let l=e.elements[0];return isArray(l)?l[0]!==t?null:l[1]??null:isString(l)?l===t?"":l.startsWith(`${t}:`)?l.slice(t.length+1):null:null},findAccountNumber=e=>{let t=-1;for(let l=0;l<e.length;l++){let n=e[l];if("NAD"===n.tag&&"BY"===n.elements[0]){t=l;break}}let r=(t,l)=>{for(let n=t;n<l;n++){let r=getRffQualifierValue(e[n],"API");if(null!=r)return r}return null};if(t>=0){let i=e.length;for(let s=t+1;s<e.length;s++)if("NAD"===e[s].tag){i=s;break}let a=r(t+1,i);if(null!==a)return a}return r(0,e.length)},getUnbControlRef=e=>{let t=e.find(e=>"UNB"===e.tag);return t?.elements?.[4]??null},getUnzInfo=e=>{for(let t=e.length-1;t>=0;t--)if("UNZ"===e[t].tag)return{segment:e[t],controlRef:e[t].elements?.[1]??null};return{segment:null,controlRef:null}},buildUnzSegment=(e,t)=>{let l=e?.elements?e.elements.slice():[];return 0===l.length?(l.push("1"),null!=t&&l.push(t),{tag:"UNZ",elements:l}):(l[0]="1",null!=t&&(l.length>1?l[1]=t:l.push(t)),{tag:"UNZ",elements:l})},getUnhMessageRef=(e,t)=>{if(!e.length)return null;let l=e[0];if("UNH"!==l.tag)return null;let n=l.elements?.[0];if(null==n)return null;if(isArray(n))return n.map(String).join(t.component);let r=String(n);return r.length?r:null},sanitizeFilenamePart=e=>{let t=String(e??"").trim().replace(/[^A-Za-z0-9._-]+/g,"_");return t.replace(/^_+|_+$/g,"")},buildInvoiceFilename=({accountNumber:e,messageRef:t,index:l,filePrefix:n,fileExt:r,includeAccountInFilename:i})=>{let s=[];n&&s.push(n),i&&e&&s.push(e),t&&s.push(t);let a=s.map(sanitizeFilenamePart).filter(Boolean).join("_");a||(a=`invoice_${l+1}`);let u=r?r.startsWith(".")?r:`.${r}`:"";return`${a}${u}`},splitEdifactInvoices=(e,t={})=>{let l=parseEdifact(e),{segments:n}=l,{writeFiles:r=!1,outDir:i=".",filePrefix:s="invoice",fileExt:a=".edi",includeAccountInFilename:u=!0}=t,f=null,o=null;r&&(f=require("fs"),o=require("path"),f.mkdirSync(i,{recursive:!0}));let m=n.findIndex(e=>"UNH"===e.tag);if(-1===m)return[];let g=n.slice(0,m),{segment:c,controlRef:p}=getUnzInfo(n),h=p??getUnbControlRef(g),U=[];for(let A=m;A<n.length;A++){if("UNH"!==n[A].tag)continue;let N=-1;for(let d=A+1;d<n.length;d++)if("UNT"===n[d].tag){N=d;break}if(-1===N)break;let _=n.slice(A,N+1),$=findAccountNumber(_),b=g.concat(_),E=getUnhMessageRef(_,l.seps);(c||null!==h)&&b.push(buildUnzSegment(c,h));let R=serializeEdifact({seps:l.seps,segments:b,hasUNA:l.hasUNA},{keepUNA:!0}),F={account_number:$,edi:R};if(r){let I=buildInvoiceFilename({accountNumber:$,messageRef:E,index:U.length,filePrefix:s,fileExt:a,includeAccountInFilename:u}),z=o.join(i,I);f.writeFileSync(z,R,"utf8"),F.file_path=z}U.push(F),A=N}return U},buildEDIOutput=(e,t={})=>splitEdifactInvoices(e,{...t,writeFiles:!1}).map(({account_number:e,edi:t})=>({account_number:e,edi:t}));

// Split the raw EDIFACT input into one self-contained invoice message each.
// buildEDIOutput returns [{ account_number, edi }] where account_number is the
// invoice's account number parsed from the EDI (RFF+API under NAD+BY).
const splitInvoices = buildEDIOutput(inputFile);

// FOLIO Harrassowitz accounts from MetaDB: [{ acctname, acctno, account_digits }].
const folioAccounts = JSON.parse(accountNumbers);

// Optional subset filter. invoiceNumbers may be a JSON array or a comma / space /
// newline delimited list. Absent or blank means "process every invoice".
let requestedInvoiceNumbers = null;
const invoiceNumbersRaw = execution.hasVariable('invoiceNumbers')
  ? execution.getVariable('invoiceNumbers')
  : null;
if (invoiceNumbersRaw !== null && String(invoiceNumbersRaw).trim() !== '') {
  const raw = String(invoiceNumbersRaw).trim();
  try {
    requestedInvoiceNumbers = (raw.charAt(0) === '[')
      ? JSON.parse(raw).map(s => String(s).trim())
      : raw.split(/[\s,]+/).map(s => s.trim());
    requestedInvoiceNumbers = requestedInvoiceNumbers.filter(Boolean);
  } catch (e) {
    requestedInvoiceNumbers = null;
  }
}

const onlyDigits = s => String(s == null ? '' : s).replace(/\D/g, '');

// A split invoice's edi keeps the UNB header, so UNH is not segment[0]. The
// document invoice number lives in the BGM segment (BGM+<type>+<number>); fall
// back to the UNH message reference, then to a positional label.
const firstElement = v => (Array.isArray(v) ? v[0] : v);
const findInvoiceNumber = segments => {
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].tag === 'BGM') {
      const n = firstElement(segments[i].elements[1]);
      if (n) {
        return String(n);
      }
    }
  }
  for (let i = 0; i < segments.length; i++) {
    if (segments[i].tag === 'UNH') {
      const r = firstElement(segments[i].elements[0]);
      if (r) {
        return String(r);
      }
    }
  }
  return null;
};

// Match: the invoice account number is a SUBSTRING of the FOLIO account number
// (digit-normalized). Falls back to the extracted account_digits column.
const matchFolioAccount = invoiceAcct => {
  const needle = onlyDigits(invoiceAcct);
  if (!needle) {
    return null;
  }
  return folioAccounts.find(a =>
    onlyDigits(a.acctno).indexOf(needle) >= 0 ||
    onlyDigits(a.account_digits).indexOf(needle) >= 0
  ) || null;
};

const report = { total: splitInvoices.length, selected: [], skipped: [], matched: [], unmatched: [] };
const invoices = [];

splitInvoices.forEach((inv, index) => {
  const parsed = parseEdifact(inv.edi);
  const invoiceNumber = findInvoiceNumber(parsed.segments) || ('invoice_' + (index + 1));
  const invoiceAcct = inv.account_number || '';

  const folioAccount = matchFolioAccount(invoiceAcct);
  const folioAcctNo = folioAccount ? folioAccount.acctno : '';

  // Honor the optional subset filter.
  if (requestedInvoiceNumbers && requestedInvoiceNumbers.indexOf(invoiceNumber) < 0) {
    report.skipped.push(invoiceNumber);
    return;
  }

  invoices.push({
    invoice_number: invoiceNumber,
    invoice_account_number: invoiceAcct,
    account_number: folioAcctNo, // FOLIO account number; "" when unmatched (still imported)
    file_name: buildInvoiceFilename({
      accountNumber: folioAcctNo || invoiceAcct,
      messageRef: invoiceNumber,
      index: index,
      filePrefix: 'invoice',
      fileExt: '.edi',
      includeAccountInFilename: true
    }),
    edi: inv.edi
  });

  report.selected.push(invoiceNumber);
  if (folioAcctNo) {
    report.matched.push({ invoice_number: invoiceNumber, account_number: folioAcctNo });
  } else {
    report.unmatched.push({ invoice_number: invoiceNumber, invoice_account_number: invoiceAcct });
  }
});

execution.setVariable('invoices', S(JSON.stringify(invoices)));
execution.setVariable('ediImportReport', S(JSON.stringify(report)));
