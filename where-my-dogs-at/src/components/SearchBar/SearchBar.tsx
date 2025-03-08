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
  setSortOrder: Dispatch<SetStateAction<'asc' | 'desc'>>;
}

const SearchBar: FC<SearchBarProps> = ({ setSelectedBreeds, setSortOrder }) => {
  const [breeds, setBreeds] = useState<{ name: string }[]>([]);
  const [multiSelections, setMultiSelections] = useState<Option[]>([]);

  useEffect(() => {
    DogsModel.getBreeds()
      .then((response) => {
        if (response) {
          setBreeds(response);
        }
      })
      .catch((error: { message: string }) => {
        console.error('Error fetching breeds:', error);
      });
  }, []);

  useEffect(() => {
    const selectedBreeds = multiSelections.map((option) =>
      typeof option === 'string' ? option : option['name'],
    );
    setSelectedBreeds(selectedBreeds);
  }, [multiSelections, setSelectedBreeds]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
  };

  return (
    <Row className="flex-grow-1">
      <Col xs={6} sm={9}>
        <Form.Group className="mt-3 d-inline">
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
        <Form.Select aria-label="Sort dogs" onChange={handleSortChange}>
          <option value="asc">Breeds A-Z</option>
          <option value="desc">Breeds Z-A</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default SearchBar;
