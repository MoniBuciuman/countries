import React from "react";
import { useState, useEffect } from "react";
import { Col, Row, ListGroup } from "react-bootstrap";
import { fetchCountries } from "../apis";
import { CountryType } from "../model/CountryType";

export const CountriesList = () => {
  const [countries, setCountries] = useState<Array<CountryType>>([]);

  useEffect(() => {
    fetchCountries((countries: any[]) => {
      setCountries(countries);
    });
  }, []);

  return (
    <ListGroup as="ol">
      <Row>
        {countries
          ? countries.map((country) => {
              return (
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
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
  );
};
