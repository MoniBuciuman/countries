import { countriesMock } from "../mockData";
import { CountryType } from "../model/CountryType";

export const fetchCountries = async (
  setCountries: (countries: CountryType[]) => void
) => {
  //   const data = await fetch(
  //     "https://restcountries.com/v2/all?fields=name,region,area",
  //     {
  //       method: "GET",
  //     }
  //   );
  //   const jsonData = await data.json();
  //   setCountries(jsonData);
  setCountries(countriesMock);
};
