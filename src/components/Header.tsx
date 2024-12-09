import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface HeaderProps {
  currentPage: string; // Indica a página atual
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            src="https://images.vexels.com/media/users/3/252027/isolated/preview/7d8e277792f119b7d5f52dfb0b4ca11c-a-rga-o-de-acidente-vascular-cerebral-humano.png"
            alt="Logo"
            style={{ width: '55px', height: '55px', marginRight: '10px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" active={currentPage === 'home'}>
              Clientes
            </Nav.Link>
            <Nav.Link as={Link} to="/financeiro" active={currentPage === 'financeiro'}>
              Financeiro
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
