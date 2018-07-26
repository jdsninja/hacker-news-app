import Cookie from 'js-cookie';
import Promise from 'bluebird';
import get from 'lodash/get';
import jwtDecode from 'jwt-decode';
import request from 'superagent-bluebird-promise';
import uuid from 'uuid/v4';
import history from './history';
import config from '../config';

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

export function parseText(response) {
  return response.text();
}

function errorHandler(err) {
  if (err) {
    if (this.store && this.store.dispatch) {
      if (err.status === 410) {
        if (get(err, 'response.body.data.message') === 'Expired reset password token') {
          history.push('/expired-token');
        } else {
        }
      } else if (err.status === 409) {
        history.push('/modified-order');
      }
    }

    const error = err instanceof Error ? err : new Error(err);
    console.error(error); // eslint-disable-line no-console
    if (window.Raven) {
      window.Raven.captureException(error);
    }
    throw error;
  }

  throw new Error('HTTP UnknownError');
}

let instance = null;

class Http {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.token = null;
    this.store = null;
    this.headers = {};

    return instance;
  }

  getHeaders(headers) {
    if (!headers) {
      return this.headers;
    }
    return Object.assign({}, this.headers, headers);
  }

  get(path, options = {}, auth = false) {
    if (!path) {
      return Promise.reject(new Error('No path found'));
    }

    const headers = this.getHeaders(options.headers);

    if (auth) {
      if (!this.token) {
        return Promise.reject(new Error('Missing token'));
      }
      headers.authorization = `Bearer ${this.token}`;
    }

    const req = request
      .get(`${config.api}${path}`)
      .type('application/json')
      .accept('application/json')
      .query(options && options.query)
      .set(headers)
      .catch(errorHandler.bind(this));

    return req;
  }

  getJsonFile(fileUri, customHeaders = {}) {
    const headers = Object.assign({}, customHeaders);
    const req = request
      .get(fileUri)
      .accept('application/json')
      .set(headers)
      .catch(errorHandler.bind(this));
    return req;
  }

  secureGet(path, options) {
    return this.get(path, options, true);
  }

  post(path, body, options = {}, auth = false) {
    const headers = this.getHeaders(options.headers);

    if (auth) {
      if (!this.token) {
        throw new Error('Missing token');
      }
      headers.authorization = `Bearer ${this.token}`;
    }

    const uri = `${config.api}${path}`;
    const req = request
      .post(uri)
      .type('application/json')
      .accept('application/json')
      .set(headers)
      .send(body)
      .catch(errorHandler.bind(this));

    return req;
  }

  securePost(path, body, options = {}) {
    return this.post(path, body, options, true);
  }

  put(path, body, options = {}, auth = false) {
    const headers = this.getHeaders(options.headers);

    if (auth) {
      if (!this.token) {
        throw new Error('Missing token');
      }
      headers.authorization = `Bearer ${this.token}`;
    }

    const uri = `${config.api}${path}`;
    const req = request
      .put(uri)
      .type('application/json')
      .accept('application/json')
      .set(headers)
      .send(body)
      .catch(errorHandler.bind(this));

    return req;
  }

  securePut(path, body, options = {}) {
    return this.put(path, body, options, true);
  }

  setStore(store) {
    if (store && this.store == null) {
      this.store = store;
    }
    return this;
  }

  setToken(token) {
    let decoded = null;

    try {
      decoded = jwtDecode(token);

      if (decoded.exp * 1000 < new Date()) {
        throw new Error('Expired token');
      }
    } catch (ex) {
      return null;
    }

    this.token = token;
    return this;
  }
}
const singleton = new Http();

export default singleton;
