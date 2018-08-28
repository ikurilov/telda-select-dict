const fs = require('fs'),
  libPackagePath = './src/lib/';

fs.unlinkSync(libPackagePath + 'package.json');
