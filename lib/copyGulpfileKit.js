const chalk             = require('chalk');
const path              = require('path');
const fs                = require('fs');
const ncp               = require('ncp').ncp;

/**
 * Copy the gulpfile dir to the theme.
 *
 * @returns {Promise}
 */
module.exports = function (config) {
  return new Promise((resolve, reject) => {
    ncp(config.paths.kitGulpfile, path.resolve(config.paths.themeAbsolute, 'gulpfile'), (err) => {
      if (err) {
        reject(err);
      }

      resolve(chalk.green('Added gulpfile folder to theme.'));
    });
  });
};
