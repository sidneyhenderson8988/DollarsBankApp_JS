

module.exports = {
    welcomeScreen: function () {
        console.log("\n+---------------------------+\n" + "| DOLLARSBANK Welcomes You! |\n"
        + "+---------------------------+\n" + "1. Create New Account.\n" + "2. Login.\n" + "3. Exit\n\n"
        + "Enter choice (1, 2, or 3) : ")
    },

    loginScreen: function() {
        console.log("\n+---------------------+\n" + "| Enter Login Details |\n" + "+---------------------+\n")
    },

    loginWelcome: function(){
        console.log("\n+---------------------+\n" + "|  Welcome Customer!  |\n" + "+---------------------+\n"
        + "1. Deposit Amount.\n" + "2. Withdraw Amount.\n" + "3. Funds Transfer\n"
        + "4. View 5 Recent Transactions.\n" + "5. Display Customer Information.\n" + "6. Sign Out\n\n"
        + "Enter choice (1, 2, 3, 4, 5, or 6) : ")
    }

  };