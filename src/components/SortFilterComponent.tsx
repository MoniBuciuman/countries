import React, { useState } from "react";
import { Button, Row, Col, InputGroup, Form } from "react-bootstrap";
import { SortDirection } from "../const";

interface SortFilterComponentProps {
  onSort: (sosortDirectionrt: SortDirection) => void;
  onFilterByAreaSize: (country: string) => void;
  onFilterByRegion: (region: string) => void;
  onReset: () => void;
}

export const SortFilterComponent: React.FC<SortFilterComponentProps> = ({
  onSort,
  onFilterByAreaSize,
  onFilterByRegion,
  onReset,
}) => {
  const [sortDirection, setSortDirection] = useState(SortDirection.AtoZ);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const handleClick = () => {
    const latestSortDirection =
      sortDirection === SortDirection.AtoZ
        ? SortDirection.ZtoA
        : SortDirection.AtoZ;

    setSortDirection(latestSortDirection);
    onSort(latestSortDirection);
  };

  const handleFilterByArea = () => {
    onFilterByAreaSize(country);
  };

  const handleArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const handleRegion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(event.target.value);
  };

  const handleFilterByRegion = () => {
    onFilterByRegion(region);
  };

  const handleReset = () => {
    onReset();
    setCountry("");
    setRegion("");
  };

  return (
    <Row className="mb-2">
      <Col sm={10}>
        <Row>
          <InputGroup className="mb-1">
            <InputGroup.Text id="countryToFilterBy">
              Countries smaller than
            </InputGroup.Text>
            <Form.Control
              placeholder="ex: Lithuania"
              value={country}
              onChange={handleArea}
            />
            <Button
              variant="outline-secondary"
              id="countryToFilterByBtn"
              onClick={handleFilterByArea}
            >
              Filter
            </Button>
          </InputGroup>
        </Row>
        <Row>
          <InputGroup className="mb-1">
            <InputGroup.Text id="region">Filter by region</InputGroup.Text>
            <Form.Control
              placeholder="ex: Oceania"
              value={region}
              onChange={handleRegion}
            />
            <Button
              variant="outline-secondary"
              id="regionBtn"
              onClick={handleFilterByRegion}
            >
              Filter
            </Button>
          </InputGroup>
        </Row>
        <Button variant="success" className="mb-1" onClick={handleReset}>
          Reset
        </Button>
      </Col>
      <Col align="end">
        <Button
          variant="outline-success"
          className="ms-auto mb-3"
          onClick={handleClick}
        >
          {sortDirection === SortDirection.AtoZ
            ? String.fromCharCode(8595)
            : String.fromCharCode(8593)}
        </Button>
      </Col>
    </Row>
  );
};
