import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardImg,
    CardText,
    CardTitle,	
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    NavItem,
    Row
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import dotenv from 'dotenv';
import APIURL from '../common/environment';
import Header from "../components/header";
import NavigationBar from "../common/navigationbar";
import { DrinksEntity, CocktailObj, ingredient } from "../common/types";
import 'bootstrap/dist/css/bootstrap.css';

dotenv.config({
    path: ".../../../.env"
});

interface PageState {
    randomCocktail: CocktailObj | null;
    sessionToken: string;
    role: number;
}

interface PageProps {
    editCocktailsList?: () => void;
    deleteCocktailsList?: () => void;
    addToCollection?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    location: {
        state: {
            sessionToken: string;
            role: number;
            cocktailId?: number;
        }
    }
}

const cocktailRandomURL = `https://www.thecocktaildb.com/api/json/v2/9973533/random.php`;

/**
 * Class CocktailGetRandom: Returns a random drink from the 3rd party API.
 */
class Cocktail extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        const { location: { state: { sessionToken = '', role = 0 } = {} } = {} } = props;
        this.state = {
            sessionToken,
            role,
            randomCocktail: null,
        };
    }

    componentDidMount() {
        const { location: { state: { sessionToken = '', role = 0, cocktailId = 0 } = {} } = {} } = this.props;
        this.setState({ sessionToken, role });
        if (cocktailId) {
            this.fetchCocktailById(cocktailId);
        } else {
            this.fetchRandomCocktail();
        }
    }

    /**
     * Picks off all the data from the 3rd party API and formats it into the object we expect.
     */
    enrichData(drink: DrinksEntity) {
        const {
            strDrink,  // drink name
            strInstructions,   // English-language instructions
            strDrinkThumb,   // thumbnail image, if provided, URL
        } = drink;
        const ingredients: ingredient[] = [];
        const numberList = Array.from(Array(15).keys());
        numberList.forEach((item: number) => {
            const ingredientName = `strIngredient${item}`;
            const ingredientMeasure = `strMeasure${item}`;
            if (drink[ingredientName as string]) {
                ingredients.push({
                    ingredientName: drink[ingredientName as string],
                    measure: drink[ingredientMeasure as string]
                });
            }
        });
        const result = {    
            cocktailName: strDrink,
            instructions: strInstructions,
            imgURL: strDrinkThumb,
            ingredients
        };
        return result;
    }

    /**
     * Fetches a random cocktail from The Cocktail DB
     * Enriches the cocktail data
     * Pushes the clean cocktail into state.
     */
    fetchRandomCocktail = async () => {
        await fetch(cocktailRandomURL)
        .then(response => response.json())
        .then(data => this.enrichData(data.drinks[0]))
        .then(data => this.setState({ randomCocktail: data }))
        .catch(error => {
            console.error("Let's Talk Cocktails was unable to retrieve a drink.");
            console.error(error);
        });
    }
    
    /**
     * Fetches a random cocktail from The Cocktail DB
     * Enriches the cocktail data
     * Pushes the clean cocktail into state.
     */
     fetchCocktailById = async (id: number) => {
        await fetch(`${APIURL}/cocktail/one/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            }),
        })
        .then(data => data.json())
        .then(data => {
            this.setState({
                randomCocktail: {
                    cocktailName: data.cocktail_name,
                    instructions: data.instructions,
                    imgURL: data.cocktail_img_url,
                    ingredients: Array.isArray(data.ingredients) ? data.ingredients : []
                }
            })
        })
        .catch(error => {
            console.error("Let's Talk Cocktails was unable fetch the specific cocktail.");
            console.error(error);
        });
    }

    /**
     * Will pull the contentful ingredients and measures from the cocktail
     * object and prepare a table of those to be injected into the Render
     */
    ingredientsMapper(cocktail: any) {
        if (!cocktail?.ingredients?.length) {
            return null;
        }
        return (
            <ListGroup>
                {cocktail?.ingredients?.map((item: ingredient) => {
                    const { ingredientName, measure } = item;
                    return (<ListGroupItem className="list-group-item" key={ingredientName}>{`${ingredientName} - ${measure}`}</ListGroupItem>);
                })}
            </ListGroup>
        )
    }

    /**
     * Add the item from the 3rd party API (Cocktail DB) to the database as the user's drink.
     */
    async addToCollection() {
        await fetch(`${APIURL}/cocktail/add`, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.sessionToken}`
            }),
            body: JSON.stringify({
                cocktail: {
                    cocktail_name: this.state.randomCocktail?.cocktailName || "",
                    cocktail_img_url: this.state.randomCocktail?.imgURL || "",
                    instructions: this.state.randomCocktail?.instructions || "", 
                    ingredients: JSON.stringify(this.state.randomCocktail?.ingredients || [])
                }
            })
        })
        .then(data => data.json())
        .catch(error => {
            console.error("Let's Talk Cocktails was unable store the users coctail.");
            console.error(error);
        });
    }

    render() {
        const cocktail = this.state.randomCocktail;
        const  { sessionToken = '', role = 0 } = this.state;
        return (
            <div className="App">
                <NavigationBar {...{ location: { state: { sessionToken, role } } }}/>
                <Header />
                <Container>
                    <Row>
                        <Col sm='auto' md={{ size: 6, offset: 3 }}>
                            <Card>
                                <CardImg top width="100%" src={cocktail?.imgURL} alt={cocktail?.cocktailName} />
                                <CardBody>
                                    <CardTitle tag="h2">{cocktail?.cocktailName}</CardTitle>
                                    <CardText tag="div">
                                        {cocktail ? this.ingredientsMapper(cocktail) : null}
                                    </CardText>
                                    <CardFooter className="text-muted">
                                        <p>{cocktail?.instructions}</p>
                                        {!this.state.sessionToken
                                            ? (
                                                <Row className="nav nav-pills">
                                                    <Col className="col-md-3">
                                                        <NavItem>
                                                            <NavLink className="btn btn-primary btn-block nav-item" to={{
                                                                pathname: this.state.sessionToken ? "/" : "/log-in",
                                                                search: '',
                                                                state: { sessionToken: this.state.sessionToken }
                                                            }}
                                                            >
                                                                Log In
                                                            </NavLink>
                                                        </NavItem>
                                                    </Col>
                                                    <Col className="col-md-6">
                                                        <NavItem>
                                                            <NavLink className="btn btn-primary btn-block nav-item"
                                                                to={{
                                                                    pathname: "/cocktail",
                                                                    search: '',
                                                                    state: { sessionToken, role }
                                                                }}
                                                                onClick={this.fetchRandomCocktail.bind(this)}
                                                            >
                                                                Random Cocktail
                                                            </NavLink>
                                                        </NavItem>
                                                    </Col>
                                                    <Col className="col-md-3">
                                                        <NavItem>
                                                            <NavLink className="btn btn-primary btn-block nav-item" to={{
                                                                pathname: this.state.sessionToken ? "/" : "/register",
                                                                search: '',
                                                                state: { sessionToken: this.state.sessionToken }
                                                            }}
                                                            >
                                                                Register
                                                            </NavLink>
                                                        </NavItem>
                                                    </Col>
                                                </Row>
                                            ) : (
                                                <Row className="nav nav-pills">
                                                    <Col className="col-md-6">
                                                        <NavItem>
                                                            <Button
                                                                color='primary'
                                                                type='button'
                                                                onClick={this.addToCollection.bind(this)}
                                                            >
                                                                Collect
                                                            </Button>
                                                        </NavItem>
                                                    </Col>
                                                    <Col className="col-md-6">
                                                        <NavItem>
                                                            <Button
                                                                color='primary'
                                                                type='button'
                                                                onClick={this.fetchRandomCocktail.bind(this)}
                                                            >
                                                                Random
                                                            </Button>
                                                        </NavItem>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    </CardFooter>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    };
};

export default Cocktail;
