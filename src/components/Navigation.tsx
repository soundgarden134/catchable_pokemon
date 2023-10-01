import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';


export default function Navigation() {

    return (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/home">Poké-Catcher</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href={`mailto:nicolasavendanoj@gmail.com`}>Contact</Nav.Link>
              <Nav.Link href="https://github.com/soundgarden134/catchable_pokemon" target="_blank">GitHub</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      );

}