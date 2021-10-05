import React from 'react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardImg,
    CardText,
    CardTitle,
    Container,
    ListGroup,
    ListGroupItem,
    Row
} from 'reactstrap';
import dotenv from 'dotenv';
import { CocktailObj, ingredient } from "../../common/types";
import APIURL from '../../common/environment';

dotenv.config();

interface State {
    cocktails: CocktailObj[];
    token: string;
}

interface Props {
    editCocktail?: () => void;
    deleteCocktail?: () => void;
    token: string;
    updateOn: (newToken: string) => void;
}

/**
 * Renders a table with 1 row for each cocktail.
 */
class CocktailsGet extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            token: this.props.token,
            cocktails: []
        };
    }

    componentDidMount() {
        this.fetchCocktailList();
    }

    /**
     * Fetches a list of cocktails based on the user's token.
     */
    async fetchCocktailList() {
        const cocktails: CocktailObj[] = await fetch(`${APIURL}/cocktail/mine`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            })
        })
        .then( data => data.json())
        .catch(error => {
            console.error("Let's Talk Cocktails was unable fetch the users coctail list.");
            console.error(error);
        });
        if (cocktails.length) {
            this.setState({ cocktails });
        }
    }

    editCocktail(props: Props) {

    }

    deleteCocktail = (props: Props) => {

        
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

    // insert in the last <td></td> below once that's cleaned up
    // <Button color="info" onClick={() => {this.props?.editCocktail(); this.props.updateOn()}}>Update</Button>
    // <Button outline color="danger" onClick={() => {this.props?.deleteCocktail()}}>Delete</Button>

    /**
     * Map over a list of cocktails and render them to a table row.
     */
    cocktailListMapper() {
        return this.state.cocktails.map((item: CocktailObj) => {
            return(
                <Card sm='auto' md={{ size: 4 }}>
                    <CardImg top width="100%" src={item?.imgURL} alt={item?.cocktailName} />
                    <CardBody>
                        <CardTitle tag="h3">{item?.cocktailName}</CardTitle>
                        <CardText tag="div">
                            {item ? this.ingredientsMapper(item) : null}
                        </CardText>
                        <CardFooter className="text-muted">
                            <p>{item?.instructions}</p>
                            <Button color="info" onClick={() => {}}>Update</Button>
                            <Button outline color="danger" onClick={() => {}}>Delete</Button>
                        </CardFooter>
                    </CardBody>
                </Card>
            );
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <h2>My Cocktails Collection</h2>
                </Row>
                <Row>
                    {this.cocktailListMapper()}
                </Row>
            </Container>
        );
    };
};

export default CocktailsGet;