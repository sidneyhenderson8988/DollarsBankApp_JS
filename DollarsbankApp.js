const { welcomeScreen, loginScreen, loginWelcome } = require('./src/application_views');
const { createAccount, loginAccount, custMenu } = require('./src/dollars_bank_atm');
const prompt = require("prompt-sync")();
const chalk = require('chalk');

//App Start
var again = true;
var loginCon = 1;

do{

  welcomeScreen();
  var menuChoice = prompt();

switch(menuChoice) {
  case '1':
    createAccount();
    break;

  case '2':
    loginScreen();
    loggedAccount = loginAccount();

    do{

    loginWelcome();
    custMenu(loggedAccount);
    loginCon = parseInt(prompt(chalk.blue("Would you like to make another query on your account? 1 for yes, 2 for no: ")));
    
    }while(loginCon == 1)

    break;

  case '3':
    again = false;
    break;
}
}while(again);

console.log(chalk.red("Program has ended, goodbye!"));