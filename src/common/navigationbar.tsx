import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Nav,
    NavItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

interface NavigationBarProps {
    token: string | null;
}
 
interface NavigationBarState {
    isOpen: boolean;
    sessionToken: string | null;
    isLoggedIn: boolean;
    isAdmin: boolean;
}
 
class NavigationBar extends React.Component<NavigationBarProps, NavigationBarState> {
    constructor(props: NavigationBarProps, ) {
        super(props);
        this.state = { 
            isOpen: false,
            sessionToken: this.props.token,
            isLoggedIn: false,
            isAdmin: false
        };

    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    ClearToken() {
        localStorage.setItem("token", "");
        this.setState({
            sessionToken: ""
        });
    }

    render() {
        return ( 
            <Navbar color="light" light expand="lg">
              <NavbarBrand href="/">Let's Talk Cocktails!</NavbarBrand>
              <NavbarToggler aria-controls="basic-navbar-nav" onClick={this.toggle.bind(this)} />
              <Collapse id="basic-navbar-nav" isOpen={this.state.isOpen} navbar>
                <Nav navbar className="nav-justified navbar-nav w-100">
                    {/* Authenticated user Links */}
                    {this.state.isLoggedIn &&
                    <>
                        <NavItem>
                            <NavLink className="nav-link" to={{
                                pathname: this.state.isLoggedIn ? "/my-cocktails" : "/",
                                search: '',
                                state: { sessionToken: this.state.sessionToken }
                            }}
                            >
                                My Cocktails
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to={{
                                pathname: this.state.isLoggedIn ? "/my-comments" : "/",
                                search: '',
                                state: { sessionToken: this.state.sessionToken }
                            }}
                            >
                                My Comments
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to={{
                                pathname: this.state.isLoggedIn ? "/all-cocktails" : "/",
                                search: '',
                                state: { sessionToken: this.state.sessionToken }
                            }}
                            >
                                All Cocktails
                            </NavLink>
                        </NavItem>
                    </>
                    }
                    <NavItem>
                        <NavLink className="nav-link" to={{
                                pathname: "/random-cocktail",
                                search: '',
                                state: { sessionToken: this.state.sessionToken }
                            }}
                        >
                                Random Cocktail
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to={{
                                pathname: "/about",
                                search: '',
                                state: { sessionToken: this.state.sessionToken }
                            }}
                        >
                                About
                        </NavLink>
                    </NavItem>
                    {/* Admin Links */}
                    {this.state.isAdmin &&
                    <NavItem>
                        <NavLink className="btn btn-danger nav-link" to={{
                            pathname: this.state.isLoggedIn && this.state.isAdmin ? "/admin" : "/",
                            search: '',
                            state: { sessionToken: this.state.sessionToken }
                        }}>Admin</NavLink>
                    </NavItem>
                    }
                    {/* Anonymous user Links */}
                    {!this.state.isLoggedIn && 
                    <>
                        <NavItem>
                            <NavLink className="nav-link" to={{
                                pathname: this.state.isLoggedIn ? "/" : "/log-in",
                                search: '',
                                state: { sessionToken: this.state.sessionToken }
                            }}
                            >
                                Log In
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="nav-link" to={{
                                pathname: this.state.isLoggedIn ? "/" : "/register",
                                search: '',
                                state: { sessionToken: this.state.sessionToken }
                            }}
                            >
                                Register
                            </NavLink>
                        </NavItem>
                    </>
                    }
                    {/* Authenticated user Link */}
                    {this.state.isLoggedIn &&
                        <NavItem>
                            <NavLink className="nav-link" to={{
                                pathname: this.state.isLoggedIn ? "/log-out" : "/",
                                search: '',
                                state: { sessionToken: this.state.sessionToken }
                            }}
                            >
                                Log Out
                            </NavLink>
                        </NavItem>
                    }
                </Nav>
              </Collapse>
            </Navbar>
         );
    }
}
 
export default NavigationBar;
