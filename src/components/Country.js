import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import '../styles/Country.css';
import { GetCountry } from '../api/CountriesApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FormateNumber } from '../helper/Formatter';

export default function Country() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingBorders, setLoadingBorders] = useState(true);

  useEffect(() => {
    const LoadCountry = async () => {
      if (location.state === null) {
        const fetchedCountry = await GetCountry(id);
        if (fetchedCountry) {
          setCountry(fetchedCountry[0]);
          setBorders([]);
        } else {
          console.log('Failed to load countries');
        }
      } else {
        setCountry(location.state.country);
        setBorders([]);
      }

      setLoadingCountries(false);
    };

    LoadCountry(id);
  }, [id, location.state, country]);

  useEffect(() => {
    const LoadBorders = () => {
      if (country !== null) {
        let error = false;
        if (borders.length === 0) {
          if (country.borders) {
            country.borders.forEach(async (borderCountry) => {
              const fetchedCountry = await GetCountry(borderCountry);
              if (fetchedCountry) {
                setBorders((prevBorders) => [
                  ...prevBorders,
                  fetchedCountry[0],
                ]);
              } else {
                error = true;
                console.log('Failed to load borders');
              }
            });
          }
        }

        if (!error) setLoadingBorders(false);
      }
    };

    LoadBorders();
  }, [country, borders]);

  const BackHome = () => {
    navigate('/');
  };

  const flexContainer = document.querySelector('.country-container');
  const items = document.querySelectorAll('.country-datas');

  const adjustJustifyContent = () => {
    if (flexContainer !== null) {
      const containerWidth = flexContainer.offsetWidth;
      const numberOfGaps = items.length - 1;
      const gapWidth = containerWidth * 0.05;

      const totalGapWidth = numberOfGaps * gapWidth;

      const totalWidth = Math.round(
        Array.from(items).reduce((acc, item) => acc + item.offsetWidth, 0) +
          totalGapWidth
      );

      if (totalWidth >= flexContainer.offsetWidth) {
        items.forEach((item) => {
          item.style.margin = 'auto';
        });
      } else {
        items.forEach((item) => {
          item.style.margin = '0';
        });
      }
    }
  };

  const GetNativeName = (nativeNames) => {
    const nativeNamesObject = Object.values(nativeNames);
    return nativeNamesObject[nativeNamesObject.length - 1].common;
  };

  window.addEventListener('resize', adjustJustifyContent);
  window.addEventListener('load', adjustJustifyContent);

  return (
    <>
      {!loadingCountries && !loadingBorders && (
        <div className="country-body">
          <Link
            className="back-home-button"
            to="/"
            type="button"
            value=""
            onClick={BackHome}
          >
            <div className="back-home-input">
              <FontAwesomeIcon className="icon-left-arrow" icon={faArrowLeft} />
              Back
            </div>
          </Link>
          <div className="country-container">
            <div className="country-container-flag country-datas">
              <img
                className="country-flag"
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
              />
            </div>
            <div className="country-infos country-datas">
              <div className="country-name country-detail-text">
                {country.name.common}
              </div>
              <div className="country-infos-detail">
                <div className="country-infos-detail-column country-infos-detail-first-column">
                  <div className="country-detail">
                    <p className="country-detail-text">
                      <b>Native Name:</b>&nbsp;
                      {GetNativeName(country.name.nativeName)}
                    </p>
                  </div>
                  <div className="country-detail">
                    <p className="country-detail-text">
                      <b>Population:</b>&nbsp;
                      {FormateNumber(country.population)}
                    </p>
                  </div>
                  <div className="country-detail">
                    <p className="country-detail-text">
                      <b>Region:</b>&nbsp;{country.region}
                    </p>
                  </div>
                  <div className="country-detail">
                    <p className="country-detail-text">
                      <b>Sub Region:</b>&nbsp;{country.subregion}
                    </p>
                  </div>
                  <div className="country-detail">
                    <p className="country-detail-text">
                      <b>Capital:</b>&nbsp;
                      {country.capital && country.capital[0]}
                    </p>
                  </div>
                </div>
                <div className="country-infos-detail-column country-infos-detail-second-column">
                  <div className="country-detail">
                    <p className="country-detail-text">
                      <b>Top Level Domain:</b>&nbsp;{country.tld.join(', ')}
                    </p>
                  </div>
                  <div className="country-detail">
                    <p className="country-detail-text">
                      <b>Currencies:</b>&nbsp;
                      {country.currencies &&
                        Object.values(country.currencies)
                          .map((country) => country.name)
                          .join(', ')}
                    </p>
                  </div>
                  <div className="country-detail">
                    <p className="country-detail-text">
                      <b>Languages:</b>&nbsp;
                      {country.languages &&
                        Object.values(country.languages).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="country-border">
                <p className="country-detail-text border-content">
                  <b>Border Countries:</b>
                  <div className="borders">
                  {country.borders &&
                    country.borders.map((border) => {
                      const borderCountry = borders.find(
                        (b) => b.cca3 === border
                      );
                      if (borderCountry) {
                        return (
                          <Link
                            className="border-link"
                            to={`/country/${borderCountry.ccn3}`}
                            state={{ country: borderCountry }}
                            key={borderCountry.ccn3}
                          >
                            {borderCountry.name.common}
                          </Link>
                        );
                      }

                      return null;
                    })}
                    </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
