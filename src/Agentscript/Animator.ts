import { Model, TwoDraw } from "ts-agent";

export default class Animator {
  timeoutID: any;
  fps: number;
  steps: number;
  ticks: number;
  stats: any;
  constructor(model: Model, twoDraw: TwoDraw, steps = -1, fps = 30) {
    const fcn = () => {
      model.step();
      twoDraw.draw();
    };
    Object.assign(this, { fcn, steps, fps, timeoutID: null, ticks: 0 });
    this.start();
    twoDraw.draw();
    this.stop();
  }
  start() {
    if (this.timeoutID) return; // avoid multiple starts
    this.timeoutID = setInterval(() => this.step(), 1000 / this.fps);
    return this; // chaining off ctor
  }
  stop() {
    if (this.timeoutID) clearInterval(this.timeoutID);
    this.timeoutID = null;
    return this; // chaining off ctor
  }
  step() {
    if (this.steps === 0) return this.stop();
    this.ticks++;
    this.steps--;
    this.fcn();
    if (this.stats) this.stats.update();
    return this; // chaining off ctor
  }
  fcn() {
    throw new Error("Method not implemented.");
  }

  isRunning() {
    return this.timeoutID != null;
  }

  // Stop and restart with the new steps & fps
  reset(steps = -1, fps = this.fps) {
    this.stop();
    this.steps = steps;
    this.ticks = 0;
    this.fps = fps;
    this.start();
  }
  // stop if running, start otherwise
  // if starting and steps === 0, reset with steps = -1, forever.
  toggle() {
    if (this.timeoutID) this.stop();
    else if (this.steps === 0) this.reset();
    else this.start();
  }
  // call the fcn once. stops if currently running
  once() {
    this.stop();
    this.step();
  }
}
