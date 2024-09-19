import axios from 'axios';

const baseUrl = 'https://restcountries.com';
const apiVersion = 'v3.1';

const apiUrl = `${baseUrl}/${apiVersion}`;

export const GetCountries = async () => {
  const param = 'all';
  try {
    return await FetchDatas(param);
  } catch (error) {
    console.error('Error fetching countries: ', error);
    return null;
  }
};

export const GetCountry = async (code) => {
  const param = `alpha/${code}`;
  try {
    return await FetchDatas(param);
  } catch (error) {
    console.error('Error fetching countries: ', error);
    return null;
  }
};

async function FetchDatas(param) {
  const url = `${apiUrl}/${param}`;
  const response = await axios.get(url);

  return response.data;
}
