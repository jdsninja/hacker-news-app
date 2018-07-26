import Promise from 'bluebird';
import get from 'lodash/get';
import jwtDecode from 'jwt-decode';
import request from 'superagent-bluebird-promise';
import queryString from 'query-string';

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

function errorHandler(args, err) {
  if (!err) {
    throw new Error('HTTP UnknownError');
  }

  if (get(this, 'store.dispatch') && (err.status === 401)) {
    // this.store.dispatch(logoutAndRedirect());
    return null;
  }

  let path = null;

  if (path) {
    window.location = `${window.location.origin}${path}`;
  }

  const error = err instanceof Error ? err : new Error(err);

  if (window.Raven) {
    const message = error && error.message;
    if (error && error.body) {
      window.Raven.captureBreadcrumb({
        message: `body: ${message}`,
        category: 'http',
        data: error.body,
      });
    }
    window.Raven.captureBreadcrumb({
      message: `args: ${message}`,
      category: 'http',
      data: args,
    });
    window.Raven.captureException(error);
  } else {
    console.error(error.message); // eslint-disable-line no-console
  }
  return null;
}

const getPath = (path, { basePath }) => `${path}`;

function getHeaders({ headers, options }) {
  let result = {
    ...headers,
  };

  if (options && options.headers) {
    result = {
      ...result,
      ...options.headers,
    };
  }

  return result;
}

function getSecureHeaders({ headers, auth, token }) {
  if (auth) {
    if (!token) {
      throw new Error('Missing token');
    }
    return {
      ...headers,
      authorization: `Bearer ${token}`,
    };
  }

  return {
    ...headers,
  };
}


let instance = null;

class Http {
  constructor() {
    if (!instance) {
      instance = this;
    }

    this.token = null;
    this.store = null;
  
    return instance;
  }

  get({ path, basePath = '', auth = false }) {
    if (!path) {
      return Promise.reject(new Error('No path found'));
    }
    const options = {
      basePath,
    };

    // TODO: this is a good candidate for function composition
    const headers = getSecureHeaders({
      headers: getHeaders({ headers: this.headers, options }),
      auth,
      token: this.token,
    });

    const uri = getPath(`${basePath}${path}`, options);
    const req = request
      .get(uri) // eslint-disable-line no-undef
      .responseType(options.responseType || undefined)
      .type('application/json')
      .accept('application/json')
      .query(options && options.query)
      .set(headers)
      .promise()
      .tapCatch(errorHandler.bind(this, [...arguments])); // eslint-disable-line prefer-rest-params

    return req;
  }

  delete({ path, data, basePath, auth = false }) {
    const options = {
      basePath,
    };
    // TODO: this is a good candidate for function composition
    const headers = getSecureHeaders({
      headers: getHeaders({ headers: this.headers, options }),
      auth,
      token: this.token,
    });
    

    const uri = getPath(`${path}`, options);
    const req = request
      .delete(uri)
      .type('application/json')
      .accept('application/json')
      .set(headers)
      .send(data)
      .promise()
      .tapCatch(errorHandler.bind(this, [...arguments])); // eslint-disable-line prefer-rest-params

    return req;
  }

  post({ path, data, basePath, auth = false }) {
    const options = {
      basePath,
    };
    // TODO: this is a good candidate for function composition
    const headers = getSecureHeaders({
      headers: getHeaders({ headers: this.headers, options }),
      auth,
      token: this.token,
    });

    const uri = getPath(`${path}`, options);
    const req = request
      .post(uri)
      .type('application/json')
      .accept('application/json')
      .set(headers)
      .send(data)
      .promise()
      .tapCatch(errorHandler.bind(this, [...arguments])); // eslint-disable-line prefer-rest-params

    return req;
  }

  put({ path, data, basePath, auth = false }) {
    const options = {
      basePath,
    };
    const headers = getHeaders({ headers: this.headers, options, auth, token: this.token });

    const uri = getPath(`${path}`, options); // eslint-disable-line no-undef
    const req = request
      .put(uri)
      .type('application/json')
      .accept('application/json')
      .set(headers)
      .send(data)
      .promise()
      .tapCatch(errorHandler.bind(this, [...arguments])); // eslint-disable-line prefer-rest-params

    return req;
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
      if (this.store && this.store.dispatch) {
        // this.store.dispatch(logoutAndRedirect());
      }

      return null;
    }

    this.token = token;
    return this;
  }
}

const singleton = new Http();

export default singleton;
