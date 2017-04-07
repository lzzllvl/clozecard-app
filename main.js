const cardCLI = require('./cardCLI.js');

if(process.argv[2] == "-add") {
  cardCLI.addQuestion()
} else if(process.argv[2] == undefined || process.argv[2] == ""){
  cardCLI.doCLQuiz(cardCLI.getCardArray())();
} else {
  const usage = "Usage: node main.js [-add]";
  console.log(usage);
}



