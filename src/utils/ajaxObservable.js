import { ajax } from 'rxjs/observable/dom/ajax';


class Ajax {
  constructor() {
    this.config = {
      crossDomain: true,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  delete(url, options = {}) {
    return ajax({
      ...this.config,
      url,
      ...options,
      method: 'DELETE',
    });
  }

  get(url, options = {}) {
    return ajax({
      ...this.config,
      url,
      ...options,
      method: 'GET',
    });
  }

  post(url, options = {}) {
    return ajax({
      ...this.config,
      url,
      ...options,
      method: 'POST',
    });
  }

  put(url, options = {}) {
    return ajax({
      ...this.config,
      url,
      ...options,
      method: 'PUT',
    });
  }
}

export default new Ajax();
