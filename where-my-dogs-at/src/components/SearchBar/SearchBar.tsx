import { Dispatch, FC, useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { SetStateAction } from 'jotai';
import { Col, Form, Row } from 'react-bootstrap';
import { Option } from 'react-bootstrap-typeahead/types/types';

import './SearchBar.scss';
import DogsModel from '../../models/DogsModel';

export interface SearchBarProps {
  setSelectedBreeds: Dispatch<SetStateAction<string[]>>;
}

const SearchBar: FC<SearchBarProps> = ({ setSelectedBreeds }) => {
  const [error, setError] = useState('');
  const [breeds, setBreeds] = useState<{ name: string }[]>([]);
  const [multiSelections, setMultiSelections] = useState<Option[]>([]);

  function getBreeds(): void {
    DogsModel.getBreeds()
      .then((response) => {
        if (response) {
          setBreeds(response);
        }
      })
      .catch((error: { message: string }) => {
        setError(error.message);
        console.error(error);
      });
  }

  useEffect(() => {
    if (breeds.length === 0) {
      getBreeds();
    }
  }, [breeds]);

  useEffect(() => {
    const selectedBreeds = multiSelections.map((option) =>
      typeof option === 'string' ? option : option['name'],
    );
    setSelectedBreeds(selectedBreeds);
  }, [multiSelections, setSelectedBreeds]);

  return (
    <Row className="flex-grow-1">
      <Col xs={6} sm={9}>
        <Form.Group className="mt-3 d-inline">
          {/* <Form.Label>Search by breed</Form.Label> */}
          <Typeahead
            id="basic-typeahead-multiple"
            labelKey="name"
            multiple
            onChange={setMultiSelections}
            options={breeds}
            placeholder="Search several breeds..."
            selected={multiSelections}
          />
        </Form.Group>
      </Col>
      <Col xs={6} sm={3}>
        <Form.Select aria-label="Default select example">
          <option>Sort options</option>
          <option value="asc">Breeds A-Z</option>
          <option value="desc">Breeds Z-A</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default SearchBar;
