import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Alert, Form, Row, Col } from 'react-bootstrap';
import CatchOptionsInfo from './components/CatchOptionsInfo';
import Papa from 'papaparse';
import './styles.css'
import { OBTAINABILITY_OPTIONS, POKEMON_GAMES, PokemonData } from './constants';


export default function App() {
  const [csvData, setCsvData] = useState<PokemonData[] | null>(null);
  const [catchablePokemons, setCatchablePokemons] = useState<PokemonData[]>([]);
  const [uncatchablePokemons, setUncatchablePokemons] = useState<PokemonData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCatchOptions, setSelectedCatchOptions] = useState<string[]>([]);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);



  useEffect(() => {
    fetch('/catchable_pokemon.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<PokemonData>(csvText, {
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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    if (event.target.checked) {
      setSelectedCatchOptions([...selectedCatchOptions, key]);
    } else {
      setSelectedCatchOptions(selectedCatchOptions.filter((selectedKey) => selectedKey !== key));
    }
  };

  const handleGameSelection = (game: string) => {
    if (selectedGames.includes(game)) {
      setSelectedGames(selectedGames.filter((selected) => selected !== game));
    } else {
      setSelectedGames([...selectedGames, game]);
    }
  };

  const filterPokemons = () => {
    if (!csvData) {
      return;
    }
    const filteredByGames = csvData.map((pokemon: any) => {
      const filteredItem: any = {};
      filteredItem['Generation'] = pokemon['Generation'];
      filteredItem['Number'] = pokemon['Number'];
      filteredItem['Name'] = pokemon['Name'];

      selectedGames.forEach((game) => {
        if (game in pokemon) {
          filteredItem[game] = pokemon[game];
        }
      })
      return filteredItem;
    });
    const newCatchablePokemons: any[] = [];
    const newUncatchablePokemons: any[] = [];

    filteredByGames.forEach((pokemon: any) => {
      // Check if the Pokemon has any of the selectedCatchOptions
      const hasSelectedCatchOption = selectedCatchOptions.some((option) => {
        return Object.keys(pokemon).some((key) => pokemon[key] === option);
      });
      if (hasSelectedCatchOption) {
        newCatchablePokemons.push(pokemon);
      } else {
        newUncatchablePokemons.push(pokemon);
      }
    });

    // Now, catchablePokemon and unCatchablePokemon contain the respective categories
    setCatchablePokemons(newCatchablePokemons);
    setUncatchablePokemons(newUncatchablePokemons);
    console.log("catch", newCatchablePokemons);
    console.log("uncatch", newUncatchablePokemons);
  }


  useEffect(() => {
    filterPokemons();

  }, [selectedGames, selectedCatchOptions])

  return (
    <Container>
      <h1>Pokemon Catcher</h1>
      <CatchOptionsInfo />
      <Form>
        <div className="checkbox-container">
          {Object.entries(OBTAINABILITY_OPTIONS).map(([key]) => (
            <div key={key} className="checkbox-item">
              <Form.Check
                type="checkbox"
                label={`${key}`}
                value={key}
                checked={selectedCatchOptions.includes(key)}
                onChange={handleCheckboxChange}
              />
            </div>
          ))}
        </div>
      </Form>
      <Container>
        <h2>Select Your Pokémon Games</h2>
        <Form>
          <div className="pokemon-games-container">
            {POKEMON_GAMES.map((game) => (
              <div key={game} className="pokemon-games-item">
                <Form.Check
                  type="checkbox"
                  id={game}
                  label={game}
                  checked={selectedGames.includes(game)}
                  onChange={() => handleGameSelection(game)}
                />
              </div>
            ))}
          </div>
        </Form>
      </Container>
      <Row>
        <Col lg={4}>
          <h2>Catchable Pokémon</h2>
          <Table striped bordered responsive>
            <thead>
              <tr>
                <th>Generation</th>
                <th>Number</th>
                <th>Name</th>
                {selectedGames.map((game) => (
                  <th key={game}>{game}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {catchablePokemons.map((pokemon) => (
                <tr key={pokemon.Name}>
                  <td>{pokemon.Generation}</td>
                  <td>{pokemon.Number}</td>
                  <td>{pokemon.Name}</td>
                  {selectedGames.map((game) => (
                    <td key={`${pokemon.Name}-${game}`}>{pokemon[game]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col lg={4}>
          <h2>Uncatchable Pokémon</h2>
          <Table>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Generation</th>
                  <th>Number</th>
                  <th>Name</th>
                  {selectedGames.map((game) => (
                    <th key={game}>{game}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uncatchablePokemons.map((pokemon) => (
                  <tr key={pokemon.Name}>
                    <td>{pokemon.Generation}</td>
                    <td>{pokemon.Number}</td>
                    <td>{pokemon.Name}</td>
                    {selectedGames.map((game) => (
                      <td key={`${pokemon.Name}-${game}`}>{pokemon[game]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}