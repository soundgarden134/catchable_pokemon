import React, { useState, useEffect } from 'react';
import { Button, Container, Table, Alert, Form, Row, Col } from 'react-bootstrap';
import Papa from 'papaparse';
import './styles.css'

interface TableProps {
    selectedGames: string[];
    catchablePokemons: any[];
    title: string,
  }

export default function PokemonTable({ selectedGames, catchablePokemons, title }: TableProps){


    return (
        <>
            <h2>{title}</h2>
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
        </>
    );
}