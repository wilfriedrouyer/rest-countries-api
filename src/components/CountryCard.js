import React from 'react';

import '../styles/CountryCard.css';
import { FormateNumber } from '../helper/Formatter';

export default function CountryCard({ country }) {

  return (
    <div className="card-country">
      <div className="card-country-leading">
        <img className='card-country-flag' src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      </div>
      <div className="card-country-infos">
        <div className="card-country-title">
          <h1>{country.name.common}</h1>
        </div>
        <div className="card-country-infos">
          <p>
            <b>Population: </b>
            {FormateNumber(country.population)}
            <br />
            <b>Region: </b>
            {country.region}
            <br />
            <b>Capital: </b>
            {country.capital}
          </p>
        </div>
      </div>
    </div>
  );
}
