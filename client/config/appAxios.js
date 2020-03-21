import axios from 'axios';

const instance = axios.create({
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  baseURL: 'https://sleepy-scrubland-83111.herokuapp.com',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default instance;
