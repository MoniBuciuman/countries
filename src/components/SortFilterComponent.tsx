import React, { useState } from "react";
import { Button, Row, Stack } from "react-bootstrap";
import { SortDirection } from "../const";

interface SortFilterComponentProps {
  onSort: (sosortDirectionrt: SortDirection) => void;
  name: string;
}

export const SortFilterComponent: React.FC<SortFilterComponentProps> = ({
  onSort,
  name,
}) => {
  const [sortDirection, setSortDirection] = useState(SortDirection.AtoZ);

  const handleClick = () => {
    const latestSortDirection =
      sortDirection === SortDirection.AtoZ
        ? SortDirection.ZtoA
        : SortDirection.AtoZ;

    setSortDirection(latestSortDirection);
    onSort(latestSortDirection);
  };

  return (
    <Row>
      <Stack
        direction="horizontal"
        className="mb-2 padding-horizontal-off"
        gap={3}
      >
        <Button variant="success">Filter by</Button>
        <Button
          variant="outline-success"
          className="ms-auto"
          onClick={handleClick}
        >
          {sortDirection === SortDirection.AtoZ
            ? String.fromCharCode(8595)
            : String.fromCharCode(8593)}
        </Button>
      </Stack>
    </Row>
  );
};
