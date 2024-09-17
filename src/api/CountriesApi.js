import axios from 'axios';

const baseUrl = 'https://restcountries.com';
const apiVersion = 'v3.1';

const apiUrl = `${baseUrl}/${apiVersion}`;

export const GetCountries = async () => {
};

async function FetchDatas(param) {
  const url = `${apiUrl}/${param}`;
  const response = await axios.get(url);
  
  return response.data;
}
