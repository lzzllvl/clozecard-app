const ClozeCard = require("./ClozeCard");




var test = new ClozeCard("Vegeta will never be as strong as Goku", "strong");

console.log(test);
 console.log("ClozeOnly: ", test.clozeOnly());
console.log("openOnly: ", test.openOnly());
console.log("fullText: ", test.fullText());