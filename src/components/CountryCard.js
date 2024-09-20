import React from 'react';

import '../styles/CountryCard.css';
import { FormateNumber } from '../helper/Formatter';
import { useTheme } from './ThemeContext';

export default function CountryCard({ country }) {
  const { mode } = useTheme();

  return (
    <div className={`card-country ${mode}`}>
      <div className="card-country-leading">
        <img className='card-country-flag' src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
      <div className="card-country-infos">
        <div className={`card-country-title ${mode}`}>
          <h1>{country.name.common}</h1>
        </div>
        <div className={`card-country-infos ${mode}`}>
          <p>
            <b>Population: </b>
            {FormateNumber(country.population)}
            <span class="spaced-br"></span>
            <b>Region: </b>
            {country.region}
            <span class="spaced-br"></span>
            <b>Capital: </b>
            {country.capital}
          </p>
        </div>
      </div>
    </div>
  );
}
