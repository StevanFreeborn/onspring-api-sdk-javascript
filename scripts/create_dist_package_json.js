const fs = require('fs');
const path = require('path');

const esmPackageJson = `{
  "type": "module"
}`;

const cjsPackageJson = `{
  "type": "commonjs"
}`;

const parentDir = path.resolve(__dirname, '..');

fs.writeFileSync(path.join(parentDir, 'dist/esm/package.json'), esmPackageJson);
fs.writeFileSync(path.join(parentDir, 'dist/cjs/package.json'), cjsPackageJson);
