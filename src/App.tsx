import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { fetchCountries } from "./apis";
import { CountryType } from "./model/CountryType";

function App() {
  const [countries, setCountries] = useState<Array<CountryType>>([]);

  useEffect(() => {
    fetchCountries((countries: any[]) => {
      setCountries(countries);
    });
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <th>Country Name</th>
          <th>Region</th>
          <th>Area Size</th>
        </tr>

        {countries ? (
          countries.map((country) => {
            return (
              <tr key={country.name}>
                <td>{country.name}</td>
                <td>{country.region}</td>
                <td>{country.area || "N/A"}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={3}>Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default App;
