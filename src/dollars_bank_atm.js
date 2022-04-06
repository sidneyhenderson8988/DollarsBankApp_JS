const { timeStamp, print5Stamps } = require('./customer_account');

const prompt = require("prompt-sync")();

var allAccounts = [];

module.exports = {
    createAccount: function () {

        console.log("\n+-------------------------------+\n" + "| Enter details for new account |\n"
        + "+-------------------------------+\n")
        
        const regex = new RegExp("^(?=.*[0-9])" + "(?=.*[a-z])(?=.*[A-Z])" + "(?=.*[@#$%^&+=])" + "(?=\\S+$).{8,20}$");
        

        const custName = prompt("Enter Customer Name: ");
        const custAddr = prompt("Enter Customer Address: ");
        const custNum = prompt("Enter Customer Number: ");
        const custID = prompt("Enter Customer ID: ");
        var custPass = prompt("Enter Customer Password (8 character minimum With Lower, Upper, & Special): ");
        if(!regex.test(custPass))
        do{
          console.log("Password does not meet criteria, please try again.")
          custPass = prompt("Enter Customer Password (8 character minimum With Lower, Upper, & Special): ");
        }while(!regex.test(custPass))

        const amount = parseFloat(prompt("Enter Initial Amount: "));

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
        var username = prompt("\nUser ID: ");
        var password = prompt("Password: ")
        
        for (let i = 0; i < allAccounts.length; i++) {
        if(username == allAccounts[i].customer.ID && password == allAccounts[i].customer.password){
            console.log("Account Found!");
            loggedCust = allAccounts[i];
            found = true;
            break;
        }}

        if(found == false)
        console.log("Invalid Credentials, please try again.")

      }while(found == false)

        return loggedCust;
    },

    custMenu: function(loggedAccount){

        var custMenuChoice = prompt("Please make a choice: ");

        switch(custMenuChoice) {
            case '1':
              console.log("\nDeposit for account: " + loggedAccount.customer.ID);
              console.log("Current balance: " + loggedAccount.savingAccount.amount);
              var deposit = parseFloat(prompt("Enter an amount to deposit: "));
              loggedAccount.savingAccount.amount += deposit;
              console.log("Your Current Total is: " + loggedAccount.savingAccount.amount);
              
              var transType = "Deposit of " + deposit + " occurred at: ";
              timeStamp(transType);

              break;
          
            case '2':
              console.log("\nWithdrawal for account: " + loggedAccount.customer.ID);
              console.log("Current balance: " + loggedAccount.savingAccount.amount);
              var withdraw = parseFloat(prompt("Enter an amount to withdraw: "));
              if(withdraw <= loggedAccount.savingAccount.amount){
              loggedAccount.savingAccount.amount -= withdraw;
              }
              else {console.log("\nOperation Failed: Not enough funds to withdraw amount")}

              console.log("Your Current Total is: " + loggedAccount.savingAccount.amount);

              var transType = "Withdrawal of " + withdraw + " occurred at: ";
              timeStamp(transType);
              break;
          
            case '3':
              transCust = {}
              found = false;
              console.log("\nTransfer for account: " + loggedAccount.customer.ID);
              transID = prompt("Enter the user you want to transfer funds to: ");
              for (let i = 0; i < allAccounts.length; i++) {
                if(transID == allAccounts[i].customer.ID){
                    console.log("Match Found!");
                    found = true;
                    transCust = allAccounts[i];
                    break;
                }
            }
                if(found == false){
                    console.log("Account not found.");
                }

                transAmount = parseFloat(prompt("How much would you like to transfer?"));
                loggedAccount.savingAccount.amount -= transAmount;
                transCust.savingAccount.amount += transAmount;

                console.log("You have transfered: " + transAmount + "$");
                console.log("\nYou have $" + loggedAccount.savingAccount.amount + " leftover in your account.");
                console.log(transCust.customer.ID + " has $" + transCust.savingAccount.amount + " leftover in their account.");
              
              break;

            case '4':
              print5Stamps();
              break;

            case '5':
              console.log(loggedAccount);
              break;
            
            case '6':
              console.log("\nEnter '2' to sign out: ")
              break;
          }

    }

  };