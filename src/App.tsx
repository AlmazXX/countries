import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Countries from "./components/Countries/Countries";
import CountryData from "./components/CountryData/CountryData";
import { ApiCountry } from "./types";

function App() {
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [selectedAlpha, setSelectedAlpha] = useState<null | string>(null);

  const fetchCountries = useCallback(async () => {
    const countriesResponse = await axios.get<ApiCountry[]>("/all?fields=alpha3Code,name");
    setCountries(countriesResponse.data);
  }, []);

  useEffect(() => {
    fetchCountries().catch((e) => console.error(e));
  }, [fetchCountries]);

  const onClickEvent = (alpha: string) => {
    setSelectedAlpha(alpha);
  };

  return (
    <React.Fragment>
      <div className="container py-5">
        <div className="row justify-content-between">
          <Countries countries={countries} onClickEvent={onClickEvent} />
          <CountryData alpha={selectedAlpha} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;