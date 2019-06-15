import * as Environment from '../utils/Environment';

class LoggerService {
  static debug(message) {
    if (Environment.DEBUG === 'true') {
      console.log(`[D ${this.timestamp()}] ${message}`);
    }
  }

  static error(message) {
    if (Environment.DEVELOPMENT) {
      console.error(`[E ${this.timestamp()}] ${message}`);
    }
  }

  static info(message) {
    if (Environment.DEVELOPMENT) {
      console.info(`[I ${this.timestamp()}] ${message}`);
    }
  }

  static warn(message) {
    if (Environment.DEVELOPMENT) {
      console.warn(`[W ${this.timestamp()}] ${message}`);
    }
  }

  static timestamp() {
    const now = new Date();
    const leadingZero = (num) => `0${num}`.slice(-2);
    return [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(leadingZero)
      .join(':');
  }
}

export default LoggerService;