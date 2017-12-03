#!/usr/bin/env node
'use strict';
const _                 = require('lodash');
const chalk             = require('chalk');
const inquirer          = require('inquirer');
const inquirerDirectory = require('inquirer-directory');
const path              = require('path');
const fs                = require('fs');
const mergePackageJson  = require('merge-package-json');
const ncp               = require('ncp').ncp;

const paths    = {
  originalPackage:  path.resolve(process.cwd(), 'package.json'),
  originalGulpFile: path.resolve(process.cwd(), 'gulpfile.js'),
  kit:              path.resolve(__dirname, '..', 'starterkit'),
  kitGulpfile:      path.resolve(__dirname, '..', 'starterkit', 'gulpfile'),
  kitGulpfileHub:   path.resolve(__dirname, '..', 'starterkit', 'gulpfile.js'),
  kitPackage:       path.resolve(__dirname, '..', 'starterkit', 'package.json'),
};
const messages = [];


inquirer.registerPrompt('directory', inquirerDirectory);
inquirer.prompt([{
  type:     'directory',
  name:     'themePath',
  message:  'Where is your theme?',
  basePath: '.'
}]).then(answers => {

  paths.themeAbsolute = path.resolve(process.cwd(), answers.themePath);
  paths.themeRelative = './' + answers.themePath;

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


const gulpify = () => {
  console.log();

  // Copy gulp file.
  copyGulpfile().then(() => {

    // Process package json.
    processPackageJson().then(() => {

      // Create gulp hub.
      createGulpHub().then(() => {

        _.forEach(messages, function(m) {
          console.log(m);
        });

        console.log(chalk.green('Done!'));
        console.log();
        console.log('---------------------------------------------');
        console.log();
        console.log('Now you just need to run the following:');
        console.log('$ ' + chalk.gray.bold('npm install'));
        console.log('$ ' + chalk.gray.bold('gulp'));

      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });

  }).catch(err => {
    console.log(err);
  });

};

/**
 * Copy the gulpfile dir to the theme.
 *
 * @returns {Promise}
 */
const copyGulpfile = () => {
  return new Promise((resolve, reject) => {
    ncp(paths.kitGulpfile, path.resolve(paths.themeAbsolute, 'gulpfile'), (err) => {
      if (err) {
        reject(console.log(chalk.red(err)));
      }

      messages.push(chalk.green('Added gulpfile folder to theme.'));
      resolve();
    });
  });
};

/**
 * Copy or merge package.json
 *
 * @returns {Promise}
 */
const processPackageJson = () => {
  return new Promise((resolve, reject) => {

    // If the project contains an existing package.json try to merge it.
    // Else just copy it from the starter kit.
    if (fs.existsSync(paths.originalPackage)) {
      const originalPackage = require(paths.originalPackage);
      const kitPackage      = require(paths.kitPackage);

      ncp(paths.originalPackage, `${paths.originalPackage}.orig`, (err) => {
        if (err) {
          reject(chalk.red(err));
        }

        messages.push(chalk.green('Created package.json backup: ') + `${paths.originalPackage}.orig`);

        const newPackageJson = JSON.parse(mergePackageJson(kitPackage, originalPackage));
        fs.writeFile(paths.originalPackage, JSON.stringify(newPackageJson, null, 4), err => {
          if (err) {
            reject(chalk.red(err));
          }

          messages.push(chalk.green('Updated ') + paths.originalPackage);
          resolve();
        });
      });
    }
    else {
      ncp(paths.kitPackage, paths.originalPackage, (err) => {
        if (err) {
          reject(chalk.red(err));
        }
        messages.push(chalk.green('Created ') + paths.originalPackage);
        resolve();
      });
    }
  });
};

/**
 * Create gulp hub
 *
 * @returns {Promise}
 */
const createGulpHub = () => {
  return new Promise((resolve, reject) => {

    const gulpfileData = fs.readFileSync(path.resolve(paths.kit, 'gulpfile.js'), {
      encoding: 'utf8'
    }).replace('PATH_TO_THEME', `${paths.themeRelative}`);

    // If in the project root there is an exithing gulpfile append the content
    if (fs.existsSync(paths.originalGulpFile)) {
      fs.appendFile(paths.originalGulpFile, '\n\n\n' + gulpfileData, function (err) {
        if (err) {
          reject(chalk.red(err));
        }

        messages.push(chalk.green('Updated ') + paths.originalGulpFile);
        resolve();
      });
    }
    else {
      console.log(gulpfileData);
      fs.writeFile(paths.originalGulpFile, gulpfileData, err => {
        if (err) {
          reject(chalk.red(err));
        }

        messages.push(chalk.green('Created ') + paths.originalGulpFile);
        resolve();
      });
    }

  });
};
