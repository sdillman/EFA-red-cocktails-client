import React from 'react';
import { Button } from 'reactstrap';
import dotenv from 'dotenv';
import { CocktailObj } from "../../common/types";

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

let cocktailRandomURL = `https://www.thecocktaildb.com/api/json/v2/${process.env.APIKEY}/random.php`;

console.log(cocktailRandomURL);

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
        const cocktails: CocktailObj[] = await fetch('http://localhost:3000/cocktail/mine', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.token}`
            })
        }).then( data => data.json())
        .catch(console.error);
        if (cocktails.length) {
            this.setState({ cocktails });
        }
    }

    editCocktail(props: Props) {

    }

    deleteCocktail = (props: Props) => {

        
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
                <tr key={item?.cocktailID}>
                    <th scope="row">{item?.cocktailID}</th>
                    <td>{item.cocktailName}</td>
                    <td>{item?.imgURL ? <img src={item?.imgURL} /> : null}</td>
                    <td>{item?.instructions}</td>
                    <td>

                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <h1>My Cocktails Collection</h1>
                <table>
                    {this.cocktailListMapper()}
                </table>
            </div>
        );
    };
};

export default CocktailsGet;