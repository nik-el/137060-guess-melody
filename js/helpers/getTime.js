export default class Timer {
  constructor(time) {
    this.time = time;
  }

  tick() {
    if (typeof this.time !== `number` || this.time < 0) {
      return null;
    }

    if (!this.time) {
      return -1;
    }

    return --this.time;
  }

}
