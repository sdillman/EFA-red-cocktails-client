import React from 'react';
import { Button } from 'reactstrap';
import dotenv from 'dotenv';
import { isTemplateExpression } from 'typescript';
import { cocktailDBResponse, DrinksEntity, CocktailObj, ingredient } from "../../common/types";

dotenv.config({
    path: "../../src/common/environment.tsx"
});

interface cocktail {
    id: string;
    ingredient: string;
    quantity: string;
}

interface State {
    randomCocktail: CocktailObj | null;
    token: string;
}

interface Props {
    editCocktailsList?: () => void;
    deleteCocktailsList?: () => void;
    addToCollection?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    token: string;
    updateOn: (newToken: string) => void;
}

let cocktailRandomURL = `https://www.thecocktaildb.com/api/json/v2/${process.env.APIKEY}/random.php`;

console.log(cocktailRandomURL);

/**
 * Class CocktailGetRandom: Returns a random drink from the 3rd party API.
 */
class CocktailsGetRandom extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            token: this.props.token,
            randomCocktail: null
        };
    }

    componentDidMount() {
        this.fetchRandomCocktail();
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
                    name: drink[ingredientName as string],
                    measure: drink[ingredientMeasure as string]
                });
            }
        });
        const result = {    
            cocktailName: strDrink,
            instructions: strInstructions,
            imgURL: strDrinkThumb,
            ingredients
        }
        console.log("## clean object", result);
        return result;
    }

    /**
     * Fetches a random cocktail from The Cocktail DB.
     */
    fetchRandomCocktail = async () => {
        const cocktail: cocktailDBResponse | void = await fetch(cocktailRandomURL, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
            })
        })
        .then( res => res.json())
        .then(data => {
            if (cocktail?.drinks?.length) {
                const cleanDrink = this.enrichData(data.drinks[0]);
                this.setState({ randomCocktail: cleanDrink });
            }
            
        })
        .catch(console.error);
    }
    
    /**
     * Will pull the contentful ingredients and measures from the cocktail
     * object and prepare a table of those to be injected into the Render
     */
    ingredientsMapper(cocktail: CocktailObj) {
        if (cocktail?.ingredients?.length) {
            return null;
        }
        return (
            <ul>
                {cocktail?.ingredients?.map((item: ingredient) => {
                    const { name, measure } = item;
                    return (<li key={name}>{`${name} - ${measure}`}</li>);
                })}
            </ul>
        )
    }

    /**
     * Add the item from the 3rd party API (Cocktail DB) to the database as the user's drink.
     */
    addToCollection(e: Event) {
        e.preventDefault();
        fetch(`${process.env.APIURL}`, {
            method: 'POST',
            body: JSON.stringify(this.state.randomCocktail),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`  //May need Bearer here
            })
        }).then( (res) => res.json())
        .then((cocktailData) => {
            console.log('Cocktail DATA '+ cocktailData);
            // props.fetchGroceryList(); 
        });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <h1>{this.state.randomCocktail?.cocktailName}</h1>
                    <br />
                    <p>{this.state.randomCocktail?.instructions}</p>
                    {this.state.randomCocktail ? this.ingredientsMapper(this.state.randomCocktail) : null}
                </div>
                {/* <Button
                    color="info"
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        this.props?.addToCollection?.(e);
                        this.props.updateOn()
                    }}
                >
                        Add To My Collection!
                </Button> */}
            </div>
        )
    };
};

export default CocktailsGetRandom;