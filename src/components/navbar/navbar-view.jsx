import React from 'react';
import { Container, Nav, Navbar, Button, } from 'react-bootstrap';

export function Navbar ({user}) {

  const onLoggedout = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if(typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
        return false;
    }
  };

  return (
    <Navbar className = "main-nav" sticky ="top" bg ="dark" expand ="lg" variant="dark">
      <Container>
      <Navbar.Brand className="navbar-logo" href="/">Welcome to myFlix!</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className = "ml-auto">
                              {isAuth() && (
                                      <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                              )} 
                             

                                 {isAuth() && (
                                <Button variant ="link" onClick={() => { onLoggedout()}}>Logout</Button>
                               )}
                                </Nav>
                                </Navbar.Collapse>
        
        </Container> 
        </Navbar>
  );
}
