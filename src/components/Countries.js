import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { GetCountries } from '../api/CountriesApi';
import CountryCard from './CountryCard';

import '../styles/Countries.css';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  const [nameFilter, setNameFilter] = useState('');

  const [regionFilter, setRegionFilter] = useState('default');

  const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

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

  const filterCountry = (e) => {
    setNameFilter(e.target.value.toLowerCase());
  };

  const filterRegion = (e) => {
    let region = e.target.value;
    if (region === 'America') region = 'Americas';
    setRegionFilter(region);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="controls">
        <div className="search-country">
          <FontAwesomeIcon className="icon-search-bar" icon={faSearch} />
          <input
            className="control-country search-bar"
            placeholder="Search for a country..."
            onChange={filterCountry}
          />
        </div>
        <select
          className="control-country select-region"
          onChange={filterRegion}
        >
          <option value="default">Filter by Region</option>
          {regions.map((region) => (
            <option value={region} key={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <div className="country-list">
        {countries
          .sort((country, countryToCompare) =>
            country.name.common > countryToCompare.name.common
              ? 1
              : country.name.common < countryToCompare.name.common
              ? -1
              : 0
          )
          .filter((country) =>
            country.name.common.toLowerCase().startsWith(nameFilter)
          )
          .filter((country) => {
            if (regionFilter !== 'default')
              return country.region === regionFilter;

            return true;
          })
          .map((country) => {
            return (
              <>
                <Link to={`/country/${country.ccn3}`} state={{country: country}}>
                  <CountryCard country={country} />
                </Link>
              </>
            );
          })}
      </div>
    </div>
  );
}
