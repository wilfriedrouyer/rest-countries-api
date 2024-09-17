import React, { useEffect, useState } from 'react';

import { GetCountries } from '../api/CountriesApi';
import CountryCard from './CountryCard';

import '../styles/Countries.css';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCountries = async () => {
      const data = await GetCountries();
      if (data) {
        setCountries(data);
      } else {
        setError('Failed to load countries');
      }
    };

    loadCountries();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <ul className="country-list">
      {countries
        .sort((country, countryToCompare) =>
          country.name.common > countryToCompare.name.common
            ? 1
            : country.name.common < countryToCompare.name.common
            ? -1
            : 0
        )
        .map((country) => (
          <li key={country.cca3}>
            <CountryCard country={country} />
          </li>
        ))}
    </ul>
  );
}
