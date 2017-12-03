# Gulp for themes

This is a gulp system to build theme assets such as images, CSS, Javascript, fonts etc...

## Key features:
 - Watch and build your themes from any directory in your project (no need to cd to the dir containing the gulpfile)
 - Watch and build multiple themes at the same time
 - SASS compilation, optimisation and minification
 - ES6 support 
 - JS validation, concatenation and minification
 - Images and SVG optimisation
 - Browser sync
 
 
## Installation

Clone or download the repo to the.<br>
* `git clone https://github.com/imfaber/gulp-for-theme.git PROJECTNAME`

Open the directory with the project.
* `cd PROJECTNAME`

Run npm install.<br>
* `npm install`

Open the project in your favorite editor.<br>
* `atom .`

Open the terminal and run `gulp` so that it starts running before you start making any changes.

* Every time you start working on your project, make sure to run `gulp` so all the files can be watched for changes and the tasks can run against those files.

### Note

In the gulpfile.js, browser sync is calling chrome canary. If you don't have or use chrome canary or chrome at all, you can change it to just google chrome or whatever browser you wish.<br>
```
    browserSync.init({
        server: './',
        browser: "google chrome canary"
    });
```

## Contribute

If you have a great package that can be added or you think something can be tweaked, by all means fork, clone, and submit a PR. I am welcome to everything.