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
    Row
} from 'reactstrap';
import dotenv from 'dotenv';
import { DrinksEntity, CocktailObj, ingredient } from "../../common/types";
import ValidateSession from '../../components/auth/ValidateSession';

dotenv.config({
    path: ".../../../.env"
});
interface State {
    randomCocktail: CocktailObj | null;
    sessionToken: string;
    showAuth: boolean;
}

interface Props {
    editCocktailsList?: () => void;
    deleteCocktailsList?: () => void;
    addToCollection?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    sessionToken: string;
    updateToken: (newToken: string) => void;
}

const cocktailRandomURL = `https://www.thecocktaildb.com/api/json/v2/9973533/random.php`;

/**
 * Class CocktailGetRandom: Returns a random drink from the 3rd party API.
 */
class CocktailsGetRandom extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            sessionToken: this.props.sessionToken,
            randomCocktail: null,
            showAuth: false
        };
    }

    // Added to prevent setting state while unmounting. key is mounted as isMounted is a reserved word.
    mounted: boolean = false;
    

    componentDidMount() {
        this.mounted = true;
        this.fetchRandomCocktail();
    }

	componentWillUnmount(){
		this.mounted = false;
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
    addToCollection(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        this.setState({ showAuth: !this.state.showAuth || false });
        fetch(`${process.env.COCKTAIL_RANDOM}`, {
            method: 'POST',
            body: JSON.stringify(this.state.randomCocktail),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`  //May need Bearer here
            })
        })
        .then( (res) => res.json())
        .then((cocktailData) => {
            console.log('Cocktail DATA '+ cocktailData);
            // props.fetchGroceryList(); 
        })
        .catch(error => {
            console.error("Let's Talk Cocktails was unable to add this drink to your collection.");
            console.error(error);
        });
    }

    closeAuth() {
        this.setState({ showAuth: false });
    }

    render() {
        const cocktail = this.state.randomCocktail;
        return (
            <Container>
                <Row>
                    <Col sm='auto' md={{ size: 6, offset: 3 }}>
                        {this.state.showAuth ? <ValidateSession {... {
                            sessionToken: this.state.sessionToken,
                            updateToken: this.props.updateToken.bind(this),
                            showModal: this.state.showAuth,
                            closeAuth: this.closeAuth.bind(this)
                        }} /> : null}
                        <Card>
                            <CardImg top width="100%" src={cocktail?.imgURL} alt={cocktail?.cocktailName} />
                            <CardBody>
                                <CardTitle tag="h2">{cocktail?.cocktailName}</CardTitle>
                                <CardText tag="div">
                                    {cocktail ? this.ingredientsMapper(cocktail) : null}
                                </CardText>
                                <CardFooter className="text-muted">
                                    <p>{cocktail?.instructions}</p>
                                    <Button
                                        color="info"
                                        onClick={this.addToCollection.bind(this)}
                                    >
                                        Add To My Collection!
                                    </Button>
                                </CardFooter>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    };
};

export default CocktailsGetRandom;