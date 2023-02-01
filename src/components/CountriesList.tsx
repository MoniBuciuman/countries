import React from "react";
import { useState, useEffect } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import { fetchCountries } from "../apis";
import { CountryType } from "../model/CountryType";
import { SortFilterComponent } from "./SortFilterComponent";
import { SortDirection } from "../const";

export const CountriesList = () => {
  const [countries, setCountries] = useState<Array<CountryType>>([]);
  const [parsedCountries, setParsedCountries] = useState<Array<CountryType>>(
    []
  );

  useEffect(() => {
    fetchCountries((countries: any[]) => {
      setCountries(countries);
    });
  }, []);

  useEffect(() => {
    setParsedCountries(countries);
  }, [countries]);

  const onSort = (sortDirection: SortDirection) => {
    const sortedCountries = [...parsedCountries].sort((a, b) => {
      if (a.name < b.name) {
        if (sortDirection === SortDirection.AtoZ) {
          return 1;
        } else {
          return -1;
        }
      }
      if (a.name > b.name) {
        if (sortDirection === SortDirection.AtoZ) {
          return -1;
        } else {
          return 1;
        }
      }

      return 0;
    });

    setParsedCountries(sortedCountries);
  };

  const onFilterByAreaSize = (countryName: string) => {
    const countryArea = countries.find(
      (country) => country.name === countryName
    )?.area;
    console.log(countryArea);

    let filteredCountriesByAreaSize = [];
    if (countryArea !== undefined && countryArea !== null) {
      filteredCountriesByAreaSize = [...countries].filter(
        (country) =>
          country.area !== undefined &&
          country.area !== null &&
          country.area < countryArea
      );
    } else {
      filteredCountriesByAreaSize = [...countries];
    }
    console.log(filteredCountriesByAreaSize);

    setParsedCountries(filteredCountriesByAreaSize);
  };

  const onFilterByRegion = (region: string) => {
    const filteredCountriesByRegion = [...countries].filter(
      (country) => country.region === region
    );
    setParsedCountries(filteredCountriesByRegion);
  };

  const onReset = () => {
    setParsedCountries(countries);
  };

  return (
    <>
      <SortFilterComponent
        onSort={onSort}
        onFilterByAreaSize={onFilterByAreaSize}
        onFilterByRegion={onFilterByRegion}
        onReset={onReset}
      />
      <ListGroup as="ol">
        {parsedCountries
          ? parsedCountries.map((country) => {
              return (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                  key={country.name}
                >
                  <Col className="ms-2 me-auto">
                    <Row className="fw-bold">{country.name}</Row>
                    <Row>{country.region}</Row>
                    <Row>{country.area}</Row>
                  </Col>
                </ListGroup.Item>
              );
            })
          : null}
      </ListGroup>
    </>
  );
};
