import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import CatchOptionsInfo from './components/CatchOptionsInfo';
import PokemonTable from './components/PokemonTable';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import pokeball from '/pokeball.png'
import { OBTAINABILITY_OPTIONS, POKEMON_GAMES, PokemonData } from './constants';
import Navigation from './components/Navigation';


export default function App() {
  const [csvData, setCsvData] = useState<PokemonData[] | null>(null);
  const [catchablePokemons, setCatchablePokemons] = useState<PokemonData[]>([]);
  const [uncatchablePokemons, setUncatchablePokemons] = useState<PokemonData[]>([]);
  const [selectedCatchOptions, setSelectedCatchOptions] = useState<string[]>([]);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [showCatchOptionsInfo, setShowCatchOptionsInfo] = useState<boolean>(false);



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
      filteredItem['Raw Name'] = pokemon['Name'].split(' ')[0];
      filteredItem['Raw Name'] = pokemon['Name'].split(' ')[0];
      const rawName = filteredItem['Raw Name'];
      const encodedName = encodeURIComponent(rawName);
      filteredItem['BulbapediaLink'] = `https://bulbapedia.bulbagarden.net/wiki/${encodedName}_(Pok%C3%A9mon)`;
      filteredItem['ImageLink'] = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.Number.toString().padStart(3, '0')}.png`;
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
  }

  const handleToggleCatchOptionsInfo = () => {
    setShowCatchOptionsInfo(!showCatchOptionsInfo);
  };

  useEffect(() => {
    filterPokemons();

  }, [selectedGames, selectedCatchOptions])

  return (
    <>
      <Navigation />
      <Container className='main-container'>
        <Container className="centered-title">
          <h1 className="pokemon-title">
            <img src={pokeball} alt="" style={{ height: '2em', verticalAlign: 'middle' }} />
            <span style={{ fontSize: '1.5em', marginLeft: '10px', marginRight: '10px' }}>-Poké-Catcher-</span>
            <img src={pokeball} alt="" style={{ height: '2em', verticalAlign: 'middle' }} />
          </h1>
        </Container>
        <hr className="divider" />
        <Container>
          <Row>
            <Container className="centered-title">
              <h2 className="pokemon-title">Select Your Pokémon Games</h2>
            </Container>
          </Row>
          <Form>
            <Container className="pokemon-games-container">
              {POKEMON_GAMES.map((game) => (
                <Container key={game} className="pokemon-games-item">
                  <Form.Check
                    type="checkbox"
                    id={game}
                    label={
                      <Container>
                        <img src={pokeball} alt="" style={{ height: '1em', marginRight: '5px', verticalAlign: 'middle' }} />
                        {game}
                      </Container>
                    }
                    checked={selectedGames.includes(game)}
                    onChange={() => handleGameSelection(game)}
                  />
                </Container>
              ))}
            </Container>
          </Form>
        </Container>
        <hr className="divider" />
        <Container>
          <Form>
            <Row>
              <Container className="centered-title">
                <h2 className="pokemon-title">Select Capture Options</h2>
              </Container>
            </Row>
            <Container className="checkbox-container">
              {Object.entries(OBTAINABILITY_OPTIONS).map(([key]) => (
                <Container key={key} className="checkbox-item">
                  <Form.Check
                    type="checkbox"
                    label={`${key}`}
                    value={key}
                    checked={selectedCatchOptions.includes(key)}
                    onChange={handleCheckboxChange}
                  />
                </Container>
              ))}
              <Button
                onClick={handleToggleCatchOptionsInfo}
                className="pokeball-button"
              >
                <div className="pokeball-icon" style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={pokeball}
                    alt=""
                    style={{ height: '1em', marginRight: '5px' }}
                  />
                ?
                </div>
              </Button>
              {showCatchOptionsInfo && <CatchOptionsInfo />}
            </Container>
          </Form>
        </Container>
        <hr className="divider" />
        <Row>
            <PokemonTable selectedGames={selectedGames} pokemons={catchablePokemons} title={"Catchable Pokémon"} />

        </Row>
      </Container>
    </>
  );
}