import Http from './http';
import { API } from '../constants';

export const request = () => (method = 'get', props = {}) => {
  return Http[method]({
    ...props,
    basePath: API.URL,
  }).then((response) => response.body);
};
