import React from "react";
import { useState, useEffect } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import { fetchCountries } from "../apis";
import { CountryType } from "../model/CountryType";
import { SortFilterComponent } from "./SortFilterComponent";
import { SortDirection } from "../const";

const name = "JOHN";

export const CountriesList = () => {
  const [countries, setCountries] = useState<Array<CountryType>>([]);

  useEffect(() => {
    fetchCountries((countries: any[]) => {
      setCountries(countries);
    });
  }, []);

  const onSort = (sortDirection: SortDirection) => {
    const sortedCountries = [...countries].sort((a, b) => {
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

    setCountries(sortedCountries);
  };

  return (
    <>
      <SortFilterComponent onSort={onSort} name={name} />
      <ListGroup as="ol">
        <Row>
          {countries
            ? countries.map((country) => {
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
        </Row>
      </ListGroup>
    </>
  );
};
