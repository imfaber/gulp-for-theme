/**
 *  gulpfile.js
 *  ===========
 *
 *  Rather than manage one giant configuration file responsible
 *  for creating multiple tasks, each task has been broken out into
 *  its own file in gulpfile/tasks. Any files in that directory get
 *  automatically required below.
 */

const path       = require('path'),
      requireDir = require('require-dir');

// Globally expose config objects.
global.TASK_CONFIG = require('./config.js');
global.PATH_CONFIG = {
  nodeModules: path.resolve(process.cwd(), './node_modules'),
  theme:  path.dirname(__dirname),
  public: path.resolve(path.dirname(__dirname), TASK_CONFIG.public)
};

// Require all tasks in gulpfile/tasks, including subfolders
requireDir('./tasks', {recurse: true});

