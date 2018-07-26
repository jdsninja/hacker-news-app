import Ajax from './ajaxObservable';

let instance = null;

class Config {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.initialized = false;

    return instance;
  }

  getConfig() {
    const promise = process.env.REACT_APP_ENV === 'local'
      ? import('../config/local.json')
      : Ajax.get('/config.json');
    return promise.then(this.setConfig.bind(this));
  }

  setConfig(config) {
    if (this.initialized || !Object.keys(config).length) {
      return;
    }

    Object.keys(config).forEach((k) => {
      this[k] = Object.freeze(config[k]);
    });

    this.initialized = true;
  }
}

const singleton = new Config();

export default singleton;
