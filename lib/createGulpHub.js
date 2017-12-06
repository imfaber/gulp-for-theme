const chalk             = require('chalk');
const path              = require('path');
const fs                = require('fs');
const ncp               = require('ncp').ncp;

/**
 * Create gulp hub
 *
 * @returns {Promise}
 */
module.exports = function (config) {
  return new Promise((resolve, reject) => {

    const gulpfileData = fs.readFileSync(path.resolve(config.paths.kit, 'gulpfile.js'), {
      encoding: 'utf8'
    }).replace('PATH_TO_THEME', `${config.paths.themeRelative}`);

    // If in the project root there is an exithing gulpfile append the content
    if (fs.existsSync(config.paths.originalGulpFile)) {
      fs.appendFile(config.paths.originalGulpFile, '\n\n\n' + gulpfileData, function (err) {
        if (err) {
          reject(err);
        }

        resolve(chalk.green('Updated ') + config.paths.originalGulpFile);
      });
    }
    else {
      console.log(gulpfileData);
      fs.writeFile(config.paths.originalGulpFile, gulpfileData, err => {
        if (err) {
          reject(err);
        }

        resolve(chalk.green('Created ') + config.paths.originalGulpFile);
      });
    }

  });
};
