import axios from 'axios';
import { URL_API } from '../utils/URL_API';

export const LoginService = async (data) => {
  const response = await axios.post(`${URL_API}/login`, data)
  return response;
};
