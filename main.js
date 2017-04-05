const ClozeCard = require("./ClozeCard");
const FlashCard = require('./FlashCard')
const fs = require('fs');
const inquirer = require('inquirer');


//I use readFileSync because the file is relatively short and I want to avoid the xmas tree
const getCardArray = () => {
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
}

const doCLQuiz = (cardArr) => {
  let num = cardArr.length;
  let i = 0;
  var ask = function() {
    if(num > 0) {
      var question = cardArr[i];
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
}

doCLQuiz(getCardArray())();

