import React from "react";
import { ApiCountry } from "../../types";

interface Props {
  country: ApiCountry;
  onClick: React.MouseEventHandler;
}

const Country: React.FC<Props> = ({ country, onClick }) => {
  return (
    <li>
      <a href={'#' + country.alpha3Code} className="text-decoration-none text-white" onClick={onClick}>
        {country.name}
      </a>
    </li>
  );
};

export default Country;