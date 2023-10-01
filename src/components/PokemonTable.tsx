import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Alert, Form, Row, Col } from 'react-bootstrap';
import '../styles.css'

interface TableProps {
    selectedGames: string[];
    pokemons: any[];
    title: string,
}

export default function PokemonTable({ selectedGames, pokemons, title }: TableProps) {


    return (
        <div className="mx-auto"> {/* Center the container horizontally */}
            <div className="centered-title">
                <h2 className="pokemon-title">{title}</h2>
            </div>
            <div className="centered-content"> {/* Center the table */}
                <Table striped bordered hover responsive className="table-hover table-striped">
                    <thead className="table-header">
                        <tr>
                            <th style={{ width: '7.5%' }}>Generation</th>
                            <th style={{ width: '7.5%' }}>Number</th>
                            <th style={{ width: '15%' }}>Name</th>
                            <th style={{ width: '15%' }}>Image</th>
                            {selectedGames.map((game) => (
                                <th key={game}>{game}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {pokemons.map((pokemon) => (
                            <tr key={pokemon.Name}>
                                <td className="table-cell">{pokemon.Generation}</td>
                                <td className="table-cell">{pokemon.Number}</td>
                                <td className="table-cell">
                                    <a href={pokemon.ImageLink} target="_blank" rel="noopener noreferrer">
                                        {pokemon.Name}
                                    </a>
                                </td>
                                <td className="table-cell">
                                    <a href={pokemon.ImageLink} target="_blank" rel="noopener noreferrer">
                                        <img src={pokemon.ImageLink} alt={pokemon.Name} style={{ width: '100px' }} />
                                    </a>
                                </td>

                                {selectedGames.map((game) => (
                                    <td key={`${pokemon.Name}-${game}`}>{pokemon[game]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );

}