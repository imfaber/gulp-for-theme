'use strict';
const inquirer          = require('inquirer');
const inquirerDirectory = require('inquirer-directory');
const path              = require('path');


inquirer.registerPrompt('directory', inquirerDirectory);
inquirer.prompt([{
  type:     'directory',
  name:     'themePath',
  message:  'Where is your theme?',
  basePath: path.resolve(process.cwd(), '..')
}]).then(answers => {
  console.log(answers.themePath);
  console.log(path.resolve(process.cwd(), answers.themePath));
});


//
// inquirer.prompt([{
//   name: 'whereTo',
//   type: 'list',
//   message: 'Here are a few helpful resources.\n\nI will open the link you select in your browser for you',
//   choices: [{
//     name: 'Take me to the documentation',
//     value: 'http://yeoman.io/learning/'
//   }, {
//     name: 'View Frequently Asked Questions',
//     value: 'http://yeoman.io/learning/faq.html'
//   }, {
//     name: 'File an issue on GitHub',
//     value: 'http://yeoman.io/contributing/opening-issues.html'
//   }, {
//     name: 'Take me back home, Yo!',
//     value: 'home'
//   }]
// }]).then(answer => {
//   app.insight.track('yoyo', 'help', answer);
//
//   if (answer.whereTo === 'home') {
//     console.log('I get it, you like learning on your own. I respect that.');
//     app.navigate('home');
//     return;
//   }
//
//   opn(answer.whereTo);
// });