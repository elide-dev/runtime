const { ok, equal } = require('node:assert');
const path = require('node:path');
const fs = require('node:fs');

ok(path);
ok(fs);
ok(fs.readFile);
ok(fs.readFileSync);

const localSample = path.join('elide/tests/elide/runtime/js', 'sample-file-read.txt');
ok(localSample);
console.log('reading', localSample);
const localSampleContent = fs.readFileSync(localSample, 'utf8');
ok(localSampleContent);
equal(localSampleContent, 'sample content\n');
