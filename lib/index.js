#!/usr/bin/env node
'use strict';
const _                  = require('lodash');
const chalk              = require('chalk');
const inquirer           = require('inquirer');
const inquirerDirectory  = require('inquirer-directory');
const path               = require('path');
const fs                 = require('fs');
const ncp                = require('ncp').ncp;
const co                 = require('co');
const copyGulpfileKit    = require('./copyGulpfileKit');
const processPackageJson = require('./processPackageJson');
const createGulpHub      = require('./createGulpHub');

const config = {
  paths: {
    originalPackage:  path.resolve(process.cwd(), 'package.json'),
    originalGulpFile: path.resolve(process.cwd(), 'gulpfile.js'),
    kit:              path.resolve(__dirname, '..', 'starterkit'),
    kitGulpfile:      path.resolve(__dirname, '..', 'starterkit', 'gulpfile'),
    kitGulpfileHub:   path.resolve(__dirname, '..', 'starterkit', 'gulpfile.js'),
    kitPackage:       path.resolve(__dirname, '..', 'starterkit', 'package.json'),
  }
};

inquirer.registerPrompt('directory', inquirerDirectory);
inquirer.prompt([{
  type:     'directory',
  name:     'themePath',
  message:  'Where is your theme?',
  basePath: '.'
}]).then(answers => {

  config.paths.themeAbsolute = path.resolve(process.cwd(), answers.themePath);
  config.paths.themeRelative = './' + answers.themePath;

  if (fs.existsSync(path.resolve(process.cwd(), answers.themePath, 'gulpfile'))) {
    inquirer.prompt([{
      type:    'confirm',
      name:    'overwrite',
      message: 'The theme is already gulpified. Do you want to overwrite?',
    }]).then(confirm => {
      if (confirm.overwrite) {
        gulpify();
      }
      else {
        console.log(chalk.green('Nothing to do. Bye!'));
      }
    })
  }
  else {
    gulpify();
  }
});


function gulpify() {
  co(function *() {
    const gulpkit     = copyGulpfileKit(config);
    const packageJson = processPackageJson(config);
    const gulpHub     = createGulpHub(config);
    return yield [gulpkit, packageJson, gulpHub];
  }).then(messages => {

    console.log();

    messages = _.flattenDeep(messages);
    _.forEach(messages, (message, i) => {
      console.log(message);
    });

    console.log(chalk.green('Done!'));
    console.log();
    console.log('---------------------------------------------');
    console.log();
    console.log('Now you just need to run the following:');
    console.log('$ ' + chalk.gray.bold('npm install'));
    console.log('$ ' + chalk.gray.bold('gulp'));

  }).catch(err => {
    console.error(chalk.red(err));
  });
}


