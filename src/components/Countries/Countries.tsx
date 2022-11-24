import React from "react";
import { ApiCountry } from "../../types";
import Country from "./Country";

interface Props {
  countries: ApiCountry[];
  onClickEvent: (id: string) => void;
}

const Countries: React.FC<Props> = ({ countries, onClickEvent }) => {
  return (
    <div className="col-4 border border-white p-4 rounded-5">
      <h3>Countries</h3>
      <div
        className="d-flex flex-column overflow-auto mt-3"
        style={{ height: "80vh" }}
      >
        <ul>
          {countries.map((country) => (
            <Country
              key={country.alpha3Code}
              country={country}
              onClick={() => onClickEvent(country.alpha3Code)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Countries;