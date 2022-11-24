export interface ApiCountry {
  name: string;
  alpha3Code: string; 
}

export interface ApiCountryData {
  name: string;
  flag: string;
  capital: string;
  population: number;
  borders: string[];
}

export interface ApiBorder {
  name: string;
}