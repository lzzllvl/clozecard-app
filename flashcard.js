const FlashCard = function(front, back) {
  if(this instanceof FlashCard) {
    this.front = front;
    this.back = back;
  } else {
    return new FlashCard(front, back);
  }
}

module.exports = FlashCard;