import React from "react";
import { useState, useEffect } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import { fetchCountries } from "../apis";
import { CountryType } from "../model/CountryType";
import { SortFilterComponent } from "./SortFilterComponent";
import { SortDirection } from "../const";

export const CountriesList = () => {
  const [countries, setCountries] = useState<Array<CountryType>>([]);
  const [filteredCountries, setFilteredCountries] = useState<
    Array<CountryType>
  >([]);

  useEffect(() => {
    fetchCountries((countries: any[]) => {
      setCountries(countries);
      setFilteredCountries(countries);
    });
  }, []);

  const onSort = (sortDirection: SortDirection) => {
    let collator = new Intl.Collator();

    const sortedCountries = [...filteredCountries].sort((a, b) => {
      return sortDirection === SortDirection.AtoZ
        ? collator.compare(a.name, b.name)
        : -collator.compare(a.name, b.name);
    });

    setFilteredCountries(sortedCountries);
  };

  const onFilter = (searchedRegion: string, searchedCountry: string) => {
    let filteredCountries = [...countries];

    if (searchedRegion) {
      filteredCountries = filteredCountries.filter(
        (country) => country.region === searchedRegion
      );
    }

    if (searchedCountry) {
      const countryArea = countries.find(
        (country) => country.name === searchedCountry
      )?.area;

      filteredCountries = filteredCountries.filter(
        (country) => (country?.area ?? 0) < (countryArea ?? 0)
      );
    }

    setFilteredCountries(filteredCountries);
  };

  const onReset = () => {
    setFilteredCountries(countries);
  };

  return (
    <>
      <SortFilterComponent
        onSort={onSort}
        onFilter={onFilter}
        onReset={onReset}
      />
      <ListGroup as="ol">
        {filteredCountries
          ? filteredCountries.map((country) => {
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
