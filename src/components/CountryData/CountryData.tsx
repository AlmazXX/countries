import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { ApiBorder, ApiCountryData } from "../../types";

const ALPHA_URL = "/alpha/";

interface Props {
  alpha: null | string;
}

const CountryData: React.FC<Props> = ({ alpha }) => {
  const [country, setCountry] = useState<null | ApiCountryData>(null);

  const fetchCountry = useCallback(async (alpha: string) => {
    const countryResponse = await axios.get<ApiCountryData>(
      ALPHA_URL + alpha + "?fields=name,flag,capital,population,borders"
    );

    const promises = countryResponse.data.borders.map(async (border) => {
      const borderResponse = await axios.get<ApiBorder>(
        ALPHA_URL + border + "?fields=name"
      );
      return borderResponse.data.name;
    });
    const borders = await Promise.all(promises);

    const countryData = {
      name: countryResponse.data.name,
      flag: countryResponse.data.flag,
      capital: countryResponse.data.capital,
      population: countryResponse.data.population,
      borders: borders,
    };
    setCountry(countryData);
  }, []);

  useEffect(() => {
    if (alpha) {
      fetchCountry(alpha).catch((e) => console.error(e));
    }
  }, [alpha, fetchCountry]);

  return (
    country && (
      <div className="col-7 border border-white p-4 rounded-5">
        <div className="px-5">
          <div className="d-flex align-items-start mb-5">
            <h2 className="me-3">{country.name}</h2>
            <img
              className="w-25 rounded-2"
              src={country.flag}
              alt={country.name}
            />
          </div>
          <p>
            <strong>Capital:</strong> <span>{country.capital}</span>
          </p>
          <p>
            <strong>Population:</strong> <span>{country.population}</span>
          </p>
          <div>
            <p className="m-0">
              <strong>Neighboring countries:</strong>
            </p>
            <ul>
              {country.borders.length ? (
                country.borders.map((border) => <li key={border}>{border}</li>)
              ) : (
                <span>Country has no neighbors</span>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default CountryData;