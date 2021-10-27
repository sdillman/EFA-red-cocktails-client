import React from 'react';
import {
    Button,
    Col,
    ListGroup,
    ListGroupItem,
    Row
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import dotenv from 'dotenv';
import APIURL from '../common/environment';
import Header from "../components/header";
import NavigationBar from "../common/navigationbar";
import 'bootstrap/dist/css/bootstrap.css';

dotenv.config({
    path: ".../../../.env"
});

interface CocktailListItem {
    cocktail_name: string;
    id: number;
}

interface PageState {
    cocktails: CocktailListItem[];
    sessionToken: string;
    userId: number;
    role: number;
}

interface PageProps {
    location: {
        state: {
            sessionToken: string;
            userId: number;
            role: number;
        }
    }
}

class CocktailList extends React.Component<PageProps, PageState>{
    constructor(props: PageProps) {
        super(props);
        const { location: { state: { sessionToken = '', role = 0, userId = 0 } = {} } = {} } = props;
        this.state = { 
            cocktails: [],
            sessionToken,
            userId,
            role
        };
    };
    mounted: boolean = false;
  
    componentDidMount() {
        this.mounted = true;
        const  { location: { state: { sessionToken = '', role = 0, userId = 0 } = {} } = {} } = this.props;
        this.setState({ sessionToken, role, userId });
        this.fetchCocktailList(userId);
    }

    componentDidUpdate(prevProps: PageProps) {
        if ( this.props.location.state !== prevProps.location.state ) {
            const  { location: { state: { sessionToken = '', role = 0, userId = 0 } = {} } = {} } = this.props;
            this.setState({ sessionToken, role, userId });
            this.fetchCocktailList(userId);
        }
    }

    componentWillUnmount(){
		this.mounted = false;
	}

    async fetchCocktailList(id: number) {
        // this is the base path.  No user id is passed so we must want our own cocktails.
        let path = `${APIURL}/cocktail/mine`;

        // there are no users with ID zero so this means all.
        if (id === 0) {
            path = `${APIURL}/cocktail/all`
        }

        // if an integer greater than zero then we have chosen a user.
        if (id && id > 0) {
            path = `${APIURL}/cocktail/member/${id}`
        }

        const cocktails: CocktailListItem[] = await fetch(path, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            })
        })
        .then(data => data.json())
        .catch(error => {
            console.error("Let's Talk Cocktails was unable fetch the users coctail list.");
            console.error(error);
        });

        if (cocktails.length) {
            this.setState({ cocktails: cocktails || [] });
        }
    }

    async deleteCocktail(id: number) {
        await fetch(`${APIURL}/cocktail/delete/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            })
        })
        .catch(error => {
            console.error("Let's Talk Cocktails was unable delete the user's cocktail.");
            console.error(error);
        });
        this.fetchCocktailList(this.state.userId);
    }

    /**
     * Map over a list of cocktails and render them to a table row.
     */
    cocktailListMapper() {
        const { sessionToken, role } = this.state;
        return this.state.cocktails.map((item: CocktailListItem, index: number) => {
            return(
                <ListGroupItem key={index}>
                <Row className="nav nav-pills">
                    <Col className="col-md-6">
                        {item.cocktail_name}
                    </Col>
                    <Col className="col-md-2">
                        <NavLink
                            className="btn btn-primary"
                            to={{
                                pathname: "/cocktail",
                                search: '',
                                state: { sessionToken, role, cocktailId: item.id }
                            }}
                        >
                            View
                        </NavLink>
                    </Col>
                    <Col className="col-md-2">
                        <Button
                            color='primary'
                            type='button'
                            disabled
                        >
                            Edit
                        </Button>
                    </Col>
                    <Col className="col-md-2">
                        <Button
                            color='primary'
                            type='button'
                            onClick={this.deleteCocktail.bind(this, item.id)}
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>
            </ListGroupItem>
            );
        });
    }

    render() {
        const  { sessionToken = '', role = 0 } = this.state;
        return (
            <div className="App">
                <NavigationBar {...{ location: { state: { sessionToken, role } } }}/>
                <Header />
                <ListGroup flush>
                    {this.cocktailListMapper()}
                </ListGroup>
            </div>
        );
    }
}

export default CocktailList;
