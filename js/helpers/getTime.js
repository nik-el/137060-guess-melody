const Timer = function (time) {
  this.timer = time;

  this.tick = () =>{
    if (typeof this.timer !== `number` || this.timer < 0) {
      return null;
    }

    if (this.timer) {
      return --this.timer;
    } else {
      return `Time is over!`;
    }
  };

};


export default Timer;
