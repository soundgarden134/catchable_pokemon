import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function About() {

    const pokemons = [
        {
            Name: 'Nidoking',
            Number: 34,
        },
        {
            Name: 'Gengar',
            Number: 94,
        },
        {
            Name: 'Blastoise',
            Number: 9,
        },
        {
            Name: 'Aggron',
            Number: 306,
        },
        {
            Name: 'Salamence',
            Number: 373,
        },
        {
            Name: 'Dragonite',
            Number: 149,
        },
    ];


    return (
        <Container>
            <Container className='general-container'>
                <h2>About Poké-Catcher</h2>
                <p>
                    Welcome to Poké-Catcher! Our website is dedicated to helping you find
                    out which Pokémon you can catch in a variety of Pokémon games. We
                    provide a simple and user-friendly tool that allows you to select
                    specific Pokémon games and capture options to see which Pokémon are
                    obtainable in those games.
                </p>
                <p>
                    Poké-Catcher is an open-source project with no commercial purposes. Our
                    goal is to make it easier for Pokémon enthusiasts to plan their Pokémon
                    adventures. You can access the source code for this project on our
                    GitHub page.
                </p>
                <p>
                    GitHub Repository:{' '}
                    <a
                        href="https://github.com/soundgarden134/catchable_pokemon"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        https://github.com/soundgarden134/catchable_pokemon
                    </a>
                </p>

                <p>
                    Special thanks to{' '}
                    <a
                        href="https://bulbapedia.bulbagarden.net/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Bulbapedia
                    </a>{' '}
                    for providing valuable data about Pokémon availability in games, and to{' '}
                    <a
                        href="https://www.pokemon.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Pokémon.com
                    </a>{' '}
                    for hosting the Pokémon images used on this website.
                </p>
            </Container>
            <Container>
                <Row>
                    {pokemons.map((pokemon) => (
                        <Col key={pokemon.Name} xs={4} sm={2} md={2} lg={2}>
                            <Card>
                                <Card.Img
                                    variant="top"
                                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon.Number.toString().padStart(3, '0')}.png`}
                                    alt={pokemon.Name}
                                />
                                <Card.Body>
                                    <Card.Title>{pokemon.Name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}
