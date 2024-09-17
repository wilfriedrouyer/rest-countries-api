import React from 'react';

import '../styles/CountryCard.css';

export default function CountryCard({ country }) {
  const formatPopulation = (population) => {
    return population;
  };

  return (
    <div className="card-country">
      <div className="card-country-leading">
        <img className='card-country-flag' src={country.flags.png} alt={`Flag of ${country.name.commo}`} />
      </div>
      <div className="card-country-infos">
        <div className="card-country-title">
          <h1>{country.name.common}</h1>
        </div>
        <div className="card-country-infos">
          <p>
            <b>Population: </b>
            {formatPopulation(country.population)}
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
