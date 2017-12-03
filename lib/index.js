#!/usr/bin/env node
'use strict';
const chalk             = require('chalk');
const inquirer          = require('inquirer');
const inquirerDirectory = require('inquirer-directory');
const path              = require('path');
const fs                = require('fs');
const mergePackageJson  = require('merge-package-json');
const ncp               = require('ncp').ncp;

inquirer.registerPrompt('directory', inquirerDirectory);
inquirer.prompt([{
  type:     'directory',
  name:     'themePath',
  message:  'Where is your theme?',
  basePath: '.'
}]).then(answers => {
  if (fs.existsSync(path.resolve(process.cwd(), answers.themePath, 'gulpfile'))) {
    inquirer.prompt([{
      type:    'confirm',
      name:    'overwrite',
      message: 'The theme is already gulpified. Do you want to overwrite?',
    }]).then(confirm => {
      if (confirm.overwrite) {
        gulpify(answers.themePath);
      }
      else {
        console.log(chalk.green('Nothing to do. Bye!'));
      }
    })
  }
  else {
    gulpify(answers.themePath);
  }
});


const gulpify = themePath => {
  console.log(themePath);
  const themeAbsolutePath    = path.resolve(process.cwd(), themePath),
        originalPackagePath  = path.resolve(process.cwd(), 'package.json'),
        originalGulpFilePath = path.resolve(process.cwd(), 'gulpfile.js'),
        kitPath              = path.resolve(__dirname, '..', 'starterkit'),
        kitGulpfilePath      = path.resolve(kitPath, 'gulpfile'),
        kitGulpfileHubPath   = path.resolve(kitPath, 'gulpfile.js'),
        kitPackagePath       = path.resolve(kitPath, 'package.json'),
        kitPackage           = require(kitPackagePath);

  // Copy gulpfile directory to theme.
  ncp(kitGulpfilePath, path.resolve(themeAbsolutePath, 'gulpfile'), (err) => {
    if (err) {
      console.log(chalk.red(err));
      return;
    }
    console.log(chalk.green('Added gulpfile to theme.'));
  });

  // If the project contains an existing package.json try to merge it.
  // Else just copy it from the starter kit.
  if (fs.existsSync(originalPackagePath)) {
    const originalPackage = require(originalPackagePath);

    ncp(originalPackagePath, `${originalPackagePath}.orig`, (err) => {
      if (err) {
        console.log(chalk.red(err));
        return;
      }
      console.log(chalk.green('Created package.json backup: ') + `${originalPackagePath}.orig`);

      const newPackageJson = JSON.parse(mergePackageJson(kitPackage, originalPackage));
      fs.writeFileS(originalPackagePath, JSON.stringify(newPackageJson, null, 4), err => {
        if (err) {
          console.log(chalk.red(err));
          return;
        }

        console.log(chalk.green('Updated ') + originalPackagePath);
      });
    });
  }
  else {
    ncp(kitGulpfileHubPath, originalPackagePath, (err) => {
      if (err) {
        console.log(chalk.red(err));
        return;
      }
      console.log(chalk.green('Created ') + originalPackagePath);
    });
  }


  // If in the project root there is an exithing gulpfile append the content
  if (fs.existsSync(originalGulpFilePath)) {
    const gulpfileData = fs.readFileSync(path.resolve(kitPath, 'gulpfile.js'), {
      encoding: 'utf8'
    }).replace('PATH_TO_THEME', `./${themePath}`);

    fs.appendFile(originalGulpFilePath, '\n\n\n' + gulpfileData, function (err) {
      if (err) {
        console.log(chalk.red(err));
        return;
      }
      console.log(chalk.green('Updated ') + originalGulpFilePath);
    });
  }
  else {
    ncp(kitPackagePath, originalGulpFilePath, (err) => {
      if (err) {
        console.log(chalk.red(err));
        return;
      }
      console.log(chalk.green('Created ') + originalGulpFilePath);
    });
  }

  console.log('');
  console.log(chalk.green('Done!'));
  console.log('');
  console.log('---------------------------------------------');
  console.log();


};
