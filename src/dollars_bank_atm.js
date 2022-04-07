const { timeStamp, print5Stamps } = require('./customer_account');
const chalk = require('chalk');
const prompt = require("prompt-sync")();

var allAccounts = [];

module.exports = {
    createAccount: function () {

        console.log(chalk.blue("\n+-------------------------------+\n" + "| Enter details for new account |\n"
        + "+-------------------------------+\n"))
        
        const regex = new RegExp("^(?=.*[0-9])" + "(?=.*[a-z])(?=.*[A-Z])" + "(?=.*[@#$%^&+=])" + "(?=\\S+$).{8,20}$");
        

        const custName = prompt(chalk.blue("Enter Customer Name: "));
        const custAddr = prompt(chalk.blue("Enter Customer Address: "));
        const custNum = prompt(chalk.blue("Enter Customer Number: "));
        const custID = prompt(chalk.blue("Enter Customer ID: "));
        var custPass = prompt(chalk.blue("Enter Customer Password (8 character minimum With Lower, Upper, & Special): "));
        if(!regex.test(custPass))
        do{
          console.log(chalk.red("Password does not meet criteria, please try again."))
          custPass = prompt(chalk.blue("Enter Customer Password (8 character minimum With Lower, Upper, & Special): "));
        }while(!regex.test(custPass))

        const amount = parseFloat(prompt(chalk.blue("Enter Initial Amount: ")));

        var customer = {"name":custName, "address":custAddr, "phone":custNum, "ID":custID, "password":custPass}
        var savingAccount = {"amount": amount}
        var account = {customer,savingAccount};
            
        allAccounts.push(account);    

        //Dummy Data 1:
        var customer = {"name":"John Fields", "address":"443 Townsville Ln", "phone":"4452309939", "ID":"jfields88", "password":"P@ssword1"};
        var savingAccount = {"amount": 400};
        var account = {customer,savingAccount};
        allAccounts.push(account);

        //Dummy Data 2:
        var customer = {"name":"Sarah Jacobs", "address":"1921 Halifax Rd", "phone":"9902431189", "ID":"sjacobs12", "password":"P@ssword2"};
        var savingAccount = {"amount": 400};
        var account = {customer,savingAccount};
        allAccounts.push(account);

        console.log(allAccounts);
    },

    loginAccount: function(){
        
        var loggedCust = {};
        var found = false;

        do{
        var username = prompt(chalk.yellow("User ID: "));
        var password = prompt(chalk.yellow("Password: "))
        
        for (let i = 0; i < allAccounts.length; i++) {
        if(username == allAccounts[i].customer.ID && password == allAccounts[i].customer.password){
            console.log(chalk.green("Account Found!"));
            loggedCust = allAccounts[i];
            found = true;
            break;
        }}

        if(found == false){
        console.log(chalk.red("Invalid Credentials, please try again."));
        }

      }while(found == false)

        return loggedCust;
    },

    custMenu: function(loggedAccount){

        var custMenuChoice = prompt(chalk.cyan("Please make a choice: "));

        switch(custMenuChoice) {
            case '1':
              console.log(chalk.green("\nDeposit for account: " + loggedAccount.customer.ID));
              console.log(chalk.green("Current balance: $" + loggedAccount.savingAccount.amount));
              var deposit = parseFloat(prompt(chalk.green("Enter an amount to deposit: ")));
              loggedAccount.savingAccount.amount += deposit;
              console.log(chalk.green("Your Current Total is: $" + loggedAccount.savingAccount.amount));
              
              var transType = chalk.green("Deposit of $" + deposit + " occurred at: ");
              timeStamp(transType);

              break;
          
            case '2':
              console.log(chalk.green("\nWithdrawal for account: " + loggedAccount.customer.ID));
              console.log(chalk.green("Current balance: $" + loggedAccount.savingAccount.amount));
              var withdraw = parseFloat(prompt(chalk.green("Enter an amount to withdraw: ")));

              if(withdraw <= loggedAccount.savingAccount.amount){
              loggedAccount.savingAccount.amount -= withdraw;
              var transType = chalk.green("Withdrawal of $" + withdraw + " occurred at: ");
              timeStamp(transType);
              }
              else {console.log(chalk.red("\nOperation Failed: Not enough funds to withdraw amount."))}

              console.log(chalk.green("Your Current Total is: $" + loggedAccount.savingAccount.amount));

              break;
          
            case '3':
              transCust = {}
              found = false;

              do{
              console.log(chalk.green("\nTransfer for account: " + loggedAccount.customer.ID));
              transID = prompt(chalk.green("Enter the user you want to transfer funds to: "));
              for (let i = 0; i < allAccounts.length; i++) {
                if(transID == allAccounts[i].customer.ID){
                    console.log(chalk.yellow("Match Found!"));
                    found = true;
                    transCust = allAccounts[i];
                    break;
                }
            }
                if(found == false){
                    console.log(chalk.red("Account not found."));
                }
              }while(found == false);

              transAmount = parseFloat(prompt(chalk.green("How much would you like to transfer: ")));

              if(transAmount <= loggedAccount.savingAccount.amount){
                loggedAccount.savingAccount.amount -= transAmount;
                transCust.savingAccount.amount += transAmount;

                console.log(chalk.cyan("You have transferred: $" + transAmount));
                console.log(chalk.cyan("\nYou have $" + loggedAccount.savingAccount.amount + " leftover in your account."));
                console.log(chalk.cyan(transCust.customer.ID + " has $" + transCust.savingAccount.amount + " leftover in their account."));
              
                var transType = chalk.green("Transferred $" + transAmount + " to " + transCust.customer.ID + " occurred at: ");
                timeStamp(transType);
                }
                else {console.log(chalk.red("\nOperation Failed: Not enough funds to withdraw amount."))}

              break;

            case '4':
              print5Stamps();
              break;

            case '5':
              console.log(chalk.yellow("| Customer Name: " + loggedAccount.customer.name + " | Customer Address: " + loggedAccount.customer.address + " | Customer Phone Number: " + loggedAccount.customer.phone + " | Customer ID: " + loggedAccount.customer.ID + " | Customer Password: " + loggedAccount.customer.password));
              console.log(chalk.yellow("| Customer Savings Account: $" + loggedAccount.savingAccount.amount));
              break;
            
            case '6':
              console.log(chalk.cyan("\nEnter '2' to sign out: "));
              break;
          }

    }

  };