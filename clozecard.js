const ClozeCard = function(text, cloze) {
  let regCloze = new RegExp(cloze);
  if(regCloze.test(text)) {
    this.text = text;
    this.cloze = cloze;
  } else {
    console.log("Error: Cloze argument is not included in the text")
  }
}

//using regular expressions to decide what to do
ClozeCard.prototype.fullText = function() {
  return this.text;
}

ClozeCard.prototype.clozeOnly = function() {
  return this.cloze;
}

ClozeCard.prototype.openOnly = function() {
  let regCloze = new RegExp(this.cloze);
  return this.text.replace(regCloze, "- ... -");
}

module.exports = ClozeCard;