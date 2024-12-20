import axios from 'axios';

const url = '/api';
export const customFetch = axios.create({
  baseURL: url,
});
