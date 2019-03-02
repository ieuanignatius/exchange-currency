import axios from 'axios';

export const getUSDRates = (base = 'USD') => {
  return axios.get(`https://api.exchangeratesapi.io/latest`, {
    params: {
      base
    }
  });
};