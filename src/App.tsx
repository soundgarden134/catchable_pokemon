import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Alert } from 'react-bootstrap';
import Papa from 'papaparse';

interface CSVRow {
  [key: string]: string;
}

export default function App() {
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  

  console.log(csvData);

  useEffect(() => {
    fetch('/catchable_pokemon.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<CSVRow>(csvText, {
          header: true, // Treat the first row as headers
          dynamicTyping: true, // Automatically detect data types
          skipEmptyLines: true,
          complete: (result) => {
            if (result.errors.length > 0) {
              setError(result.errors[0].message);
            } else {
              setCsvData(result.data);
            }
          },
          error: (error: any) => {
            setError(error.message);
          },
        });
      })
      .catch((error) => {
        setError('Failed to fetch the CSV file');
      });
  }, []);

  return (
    <Container>
      <h2 className="my-4">Pokemon Catcher</h2>
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            {csvData.length > 0 &&
              Object.keys(csvData[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
