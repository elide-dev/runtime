import { ok, equal } from "node:assert";
import path from "node:path";

ok(path);
ok(path.sep);
ok(path.delimiter);
ok(path.basename);
ok(path.dirname);
ok(path.extname);
ok(path.join);
ok(path.resolve);
ok(path.normalize);
ok(path.isAbsolute);
ok(path.relative);
ok(path.parse);
ok(path.format);
ok(path.posix);
ok(path.win32);

equal(path.posix.join('/hello', 'hi'), '/hello/hi');
