const FlashCard = function(front, back) {
  if(this instanceof FlashCard) {
    this.front = front;
    this.back = back;
  } else {
    return new FlashCard(front, back);
  }
}
FlashCard.prototype.getFront = function () {
  return this.front;
};
FlashCard.prototype.getBack = function () {
  return this.back;
};
FlashCard.prototype.check = function(text) {
  if(text.toLowerCase() == this.back.toLowerCase()) {
    return true;
  } else {
    return false;
  }
}


module.exports = FlashCard;