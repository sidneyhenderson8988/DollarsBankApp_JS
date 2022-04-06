const chalk = require('chalk');
var timeStamps = [];

module.exports = {

    timeStamp: function (transType) {
    var currentdate = new Date(); 

              var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

              timeStamps.push(transType + datetime);
    },

    print5Stamps: function () {
        console.log(chalk.magenta("\n*****Five most recent transactions*****\n"))
        var count = 0;
		for (var i = timeStamps.length; i-- > 0;) {

			console.log(chalk.magenta(timeStamps[i] + "\n"));
			count++;
			if (count == 5) {
				break;
			}
		}
    },


}