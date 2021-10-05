import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem,
    // NavLink,
    Button,
    // Row,
    // Col,
    // Jumbotron
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
// import CocktailsGet from '../components/cocktails/CocktailsGet';
// import CommentsMineGet from '../components/comments/CommentsMineGet';
//import { Link } from 'react-router-dom';

interface NavigationBarProps {
    token : string | null;
}
 
interface NavigationBarState {
    isOpen :boolean;
    isCollapsed :boolean;
    sessionToken: string | null;
}
 
class NavigationBar extends React.Component<NavigationBarProps, NavigationBarState> {
    constructor(props: NavigationBarProps, ) {
        super(props);
        this.state = { 
            isOpen: false,
            isCollapsed: false,
            sessionToken: this.props.token
        };

    }

    toggleNavbar() {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    }

    CocktailsGet() {
        return null;
    }

    CommentsGet() {
        return null;
    }

    CommentsMineGet() {
        return null;
    }

    ClearToken() {
        localStorage.setItem("token", "");
        this.setState({
            sessionToken: ""
        });
    }

    render() {
        return ( 
            <div className="nav-container">
            <Navbar light>
                      <NavbarBrand
                          href="/"
                          className="mr-auto">Let's Talk Cocktails!</NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse isOpen={!this.state.isCollapsed} navbar>
                <Nav navbar>
                  <NavItem>
                      <Button
                        style={{ marginLeft: "1em" }}
                        onClick={this.ClearToken.bind(this)}>Logout</Button>
                              </NavItem>
                              <br></br>
                  <NavItem>
                      <Button
                        style={{ marginLeft: "1em" }}
                        onClick={this.CocktailsGet.bind(this)}>Cocktail List</Button>
                  </NavItem>
                  <NavItem>
                      <Button
                        style={{ marginLeft: "1em" }}
                        onClick={this.CommentsMineGet.bind(this)}>Comments List</Button>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
         );
    }
}
 
export default NavigationBar;
