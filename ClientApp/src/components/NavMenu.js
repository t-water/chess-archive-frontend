import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
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
        <Navbar className="navbar-expand-sm navbar-toggleable-sm bg-danger border-bottom box-shadow mb-3" dark>
          <Container>
            <NavbarBrand href="home" className="text-white">Chess Archive</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <a className="text-white nav-link" href="home">Home</a>
                </NavItem>
                <NavItem>
                  <a className="text-white nav-link" href="browsegames">Browse Games</a>
                </NavItem>
                <NavItem>
                  <a className="text-white nav-link" href="browseplayers">Browse Players</a>
                </NavItem>
                <NavItem>
                  <a className="text-white nav-link" href="analysis">Analysis</a>
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