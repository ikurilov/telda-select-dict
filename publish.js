const fs = require('fs'),
  projectPackageJson = require('./package.json'),
  libPackagePath = './src/lib/';

const currentVersion = projectPackageJson.version;

console.log('update package.json for lib. version: ' + currentVersion);

const libConfig = JSON.parse(fs.readFileSync(libPackagePath + 'config.json', 'utf8'));

const {name, version, license, 'private': pr, dependencies} = projectPackageJson;

const resultPackageJson = {
  name,
  version,
  license,
  private: pr,
  peerDependencies: dependencies,
  ...libConfig
};

resultPackageJson.peerDependencies = projectPackageJson.dependencies;

fs.writeFileSync(libPackagePath + 'package.json', JSON.stringify(resultPackageJson) + '\n', null, '\t');
