const cardCLI = require('./cardCLI.js');
process.argv[2] == "-a"
  ? cardCLI.addQuestion()
  : cardCLI.doCLQuiz(cardCLI.getCardArray())();

