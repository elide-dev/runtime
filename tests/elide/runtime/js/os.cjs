const { ok } = require('node:assert');
const os = require('node:os');

ok(os);
ok(os.EOL);
ok(os.constants);
ok(os.platform);
ok(os.platform());
