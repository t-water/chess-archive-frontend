import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import './NavMenu.css';

class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-dark border-bottom box-shadow mb-3" dark>
          <Container>
            <NavbarBrand to="/" className="text-white">Play Chess</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink className="text-white nav-link" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white nav-link" to="/analysis">Analysis</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white nav-link" to="/analysis">Game Search</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="text-white nav-link" to="/analysis">Browse Players</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

export default NavMenu;