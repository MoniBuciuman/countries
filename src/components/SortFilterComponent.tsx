import React, { useState } from "react";
import { Button, Row, Col, InputGroup, Form } from "react-bootstrap";
import { SortDirection } from "../const";

interface SortFilterComponentProps {
  onSort: (sosortDirectionrt: SortDirection) => void;
  onFilter: (region: string, country: string) => void;
  onReset: () => void;
}

export const SortFilterComponent: React.FC<SortFilterComponentProps> = ({
  onSort,
  onFilter,
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

  const handleFilter = () => {
    onFilter(region, country);
  };

  const handleReset = () => {
    onReset();
    setCountry("");
    setRegion("");
  };

  const onChangeArea = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const onChangeRegion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(event.target.value);
  };

  return (
    <Row className="mb-2">
      <Col sm={10}>
        <Row>
          <InputGroup className="mb-1">
            <InputGroup.Text id="region">Filter by region</InputGroup.Text>
            <Form.Control
              placeholder="ex: Oceania"
              value={region}
              onChange={onChangeRegion}
            />
          </InputGroup>
        </Row>
        <Row>
          <InputGroup className="mb-1">
            <InputGroup.Text id="countryToFilterBy">
              Countries smaller than
            </InputGroup.Text>
            <Form.Control
              placeholder="ex: Lithuania"
              value={country}
              onChange={onChangeArea}
            />
          </InputGroup>
        </Row>
        <Button variant="success" className="mb-1 me-2" onClick={handleFilter}>
          Filter
        </Button>
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
