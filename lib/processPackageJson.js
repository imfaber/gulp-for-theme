const chalk            = require('chalk');
const fs               = require('fs');
const ncp              = require('ncp').ncp;
const mergePackageJson = require('merge-package-json');

/**
 * Copy or merge package.json
 *
 * @returns {Promise}
 */
module.exports = function (config) {
  return new Promise((resolve, reject) => {

    const messages = [];

    // If the project contains an existing package.json try to merge it.
    // Else just copy it from the starter kit.
    if (fs.existsSync(config.paths.originalPackage)) {
      const originalPackage = require(config.paths.originalPackage);
      const kitPackage      = require(config.paths.kitPackage);

      ncp(config.paths.originalPackage, `${config.paths.originalPackage}.orig`, (err) => {
        if (err) {
          reject(err);
        }

        messages.push(chalk.green('Created package.json backup: ') + `${config.paths.originalPackage}.orig`);

        const newPackageJson = JSON.parse(mergePackageJson(kitPackage, originalPackage));
        fs.writeFile(config.paths.originalPackage, JSON.stringify(newPackageJson, null, 4), err => {
          if (err) {
            reject(err);
          }

          messages.push(chalk.green('Updated ') + config.paths.originalPackage);
          resolve(messages);
        });
      });
    }
    else {
      ncp(config.paths.kitPackage, config.paths.originalPackage, (err) => {
        if (err) {
          reject(err);
        }
        messages.push(chalk.green('Created ') + config.paths.originalPackage);
        resolve(messages);
      });
    }
  });
};