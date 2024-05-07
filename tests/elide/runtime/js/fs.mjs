import { ok, equal } from "node:assert";
import path from "node:path";
import fs from "node:fs";

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
