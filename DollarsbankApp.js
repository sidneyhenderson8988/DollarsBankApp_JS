var http = require('http');
const { welcomeScreen, loginScreen, loginWelcome } = require('./src/application_views');
const { createAccount, loginAccount, custMenu } = require('./src/dollars_bank_atm');
const prompt = require("prompt-sync")();

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
    //console.log(loggedAccount);

    do{

    loginWelcome();
    custMenu(loggedAccount);
    loginCon = parseInt(prompt("\nWould you like to make another query on your account? 1 for yes, 2 for no: "))
    
    }while(loginCon == 1)

    break;

  case '3':
    again = false;
    break;
}
}while(again);

console.log("Program has ended, goodbye!")

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(8080);
