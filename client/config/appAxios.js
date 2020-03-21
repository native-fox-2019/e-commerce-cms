import axios from 'axios';

const instance = axios.create({
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  baseURL: 'http://localhost:3000',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default instance;
