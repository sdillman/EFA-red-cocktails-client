import React from 'react';
import {
    Collapse,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

interface NavigationBarProps {
    location: {
        state: {
            sessionToken: string;
            role: number;
        }
    }
}
 
interface NavigationBarState {
    isOpen: boolean;
    sessionToken: string | null;
    role: number;
}
 
class NavigationBar extends React.Component<NavigationBarProps, NavigationBarState> {
    constructor(props: NavigationBarProps, ) {
        super(props);
        const { location: { state: { sessionToken = '', role = 0 } = {} } = {} } = props;
        this.state = { 
            isOpen: false,
            sessionToken,
            role
        };
    }

    componentDidMount() {
        const  { location: { state: { sessionToken = '', role = 0 } = {} } = {} } = this.props;
        this.setState({ sessionToken, role });
    }

    componentDidUpdate(prevProps: NavigationBarProps) {
        if ( this.props.location.state.sessionToken !== prevProps.location.state.sessionToken) {
            const  { location: { state: { sessionToken = '', role = 0 } = {} } = {} } = this.props;
            this.setState({ sessionToken, role });
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const  { sessionToken = '', role = 0 } = this.state;
        return ( 
            <Navbar color="light" light expand="lg">
              <NavbarBrand href="/">Let's Talk Cocktails!</NavbarBrand>
              <NavbarToggler aria-controls="basic-navbar-nav" onClick={this.toggle.bind(this)} />
              <Collapse id="basic-navbar-nav" isOpen={this.state.isOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    {!this.state.sessionToken
                    ? null
                    : (<>
                        <NavItem>
                            <NavLink
                                className="nav-link"
                                to={{
                                    pathname: this.state.sessionToken ? "/cocktail-list" : "/",
                                    search: '',
                                    state: { sessionToken, role, userId: -1 }
                                }}
                                onClick={this.toggle.bind(this)}
                            >
                                My Cocktails
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className="nav-link"
                                to={{
                                    pathname: this.state.sessionToken ? "/comment-list" : "/",
                                    search: '',
                                    state: { sessionToken, role }
                                }}
                                onClick={this.toggle.bind(this)}
                            >
                                My Comments
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className="nav-link"
                                to={{
                                    pathname: this.state.sessionToken ? "/cocktail-list" : "/",
                                    search: '',
                                    state: { sessionToken, role, userId: 0 }
                                }}
                                onClick={this.toggle.bind(this)}
                            >
                                All Cocktails
                            </NavLink>
                        </NavItem>
                    </>)
                    }
                    <NavItem>
                        <NavLink
                            className="nav-link"
                            to={{
                                pathname: "/cocktail",
                                search: '',
                                state: { sessionToken, role }
                            }}
                            onClick={this.toggle.bind(this)}
                        >
                            Random Cocktail
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className="nav-link"
                            to={{
                                pathname: "/about",
                                search: '',
                                state: { sessionToken, role }
                            }}
                            onClick={this.toggle.bind(this)}
                        >
                            About
                        </NavLink>
                    </NavItem>
                    {/* Admin Links */}
                    {this.state.role !== 3
                    ? null
                    : (
                        <NavItem>
                            <NavLink
                                className="btn btn-danger nav-link"
                                to={{
                                    pathname: this.state.sessionToken && this.state.role ? "/admin" : "/",
                                    search: '',
                                    state: { sessionToken, role }
                                }}
                                onClick={this.toggle.bind(this)}
                            >
                                Admin
                            </NavLink>
                        </NavItem>
                    )
                    }
                    {/* Anonymous user Links */}
                    {this.state.sessionToken
                        ? (
                            <NavItem>
                                <NavLink className="nav-link" to={{
                                    pathname: this.state.sessionToken ? "/log-out" : "/",
                                    search: '',
                                    state: { sessionToken, role }
                                }}
                                onClick={this.toggle.bind(this)}
                                >
                                    Log Out
                                </NavLink>
                            </NavItem>
                        )
                        : (
                        <>
                            <NavItem>
                                <NavLink
                                    className="nav-link"
                                    to={{
                                        pathname: this.state.sessionToken ? "/" : "/log-in",
                                        search: '',
                                        state: { sessionToken, role }
                                    }}
                                    onClick={this.toggle.bind(this)}
                                >
                                    Log In
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="nav-link"
                                    to={{
                                        pathname: this.state.sessionToken ? "/" : "/register",
                                        search: '',
                                        state: { sessionToken, role }
                                    }}
                                    onClick={this.toggle.bind(this)}
                                >
                                    Register
                                </NavLink>
                            </NavItem>
                        </>
                        )
                    }
                    </Nav>
              </Collapse>
            </Navbar>
         );
    }
}
 
export default NavigationBar;
