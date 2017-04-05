const ClozeCard = require("./ClozeCard");
const FlashCard = require('./FlashCard')
const fs = require('fs');
const inquirer = require('inquirer');



const cardCLI = {
  getCardArray: () => {
    //I use readFileSync because the file is relatively short and
    //I want to avoid deeply nesting callbacks
    let result = fs.readFileSync('cards.json', "utf8");
    let cards = JSON.parse(result);
    let cardArray = [];
    for(card in cards) {
      if(cards[card].type == "flash") {
        cardArray.push(FlashCard(cards[card].question, cards[card].answer));
      } else if(cards[card].type == "cloze") {
        cardArray.push(ClozeCard(cards[card].question, cards[card].answer));
      }
    }
    return cardArray;
  },

  doCLQuiz: (cardArr) => {
    let num = cardArr.length;
    let i = 0;
    let ask = function() {
      if(num > 0) {
        let question = cardArr[i];
        let mess = "";
        if(question instanceof FlashCard){
          mess = cardArr[i].getFront();
        } else {
          mess = cardArr[i].openOnly();
        }
        inquirer.prompt([
          {
            name: "response",
            message: mess
          }
        ]).then(function(answers){
          if(cardArr[i].check(answers.response)){
            console.log("Correct!, Good Job");
          } else {
            console.log("Incorrect, read a book.");
          }
          i++;
          num --;
          ask();
        });
      } else {
        console.log("Quiz Over!");
      }
    }
    return ask;
  },
  addQuestion: () => {
    inquirer.prompt([
      {
        name: "type",
        message: "Please Enter a Card type (Flash or Cloze)."
      },
      {
        name: "question",
        message: "Please Enter the Question/Full Text."
      },
      {
        name: "answer",
        message: "Please Enter the Answer/Cloze."
      }
    ]).then(answers => {
      //ensure proper answers before writing.
      let type = answers.type.toLowerCase();
      answers.type = answers.type.toLowerCase();
      if(type != "cloze" && type != "flash"){
        console.log(`Error: type '${type}' is Not valid, Enter a valid card type.`);
        return;
      }
      if(!answers.question.length){
        console.log(`Error: Question Body is Not valid. Enter a valid Question.`);
        return;
      }
      if(!answers.answer.length){
        console.log(`Error: Answer is Not valid. Enter a valid Answer.`);
        return;
      }

      let data = JSON.parse(fs.readFileSync("cards.json", "utf8"));
      let nextCard = ++data.numCards;
      data[nextCard] = answers;
      fs.writeFile("cards.json", JSON.stringify(data, null, 2), err => {
        err ? console.log(err) : console.log("Question Added");
      });
    })
  }
}

process.argv[2] == "-a"
  ? cardCLI.addQuestion()
  : cardCLI.doCLQuiz(cardCLI.getCardArray())();

