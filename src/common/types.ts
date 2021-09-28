interface CocktailObj {
    cocktailID?: number;  // from local DB if the cocktail has been submitted. Will not be present yet if it has not
    cocktailName: string;  // "strDrink":"The Drink Name" from CocktailDB
    imgURL?: string;  // "strDrinkThumb" from CocktailDB
    instructions?: string;  // need to create an object from "strInstructions" plus whichever of "strIngredient1"(thru 15) and "strMeasure1" (thru 15) have content. Need to match 1 - 2, 2 - 2, etc
    ingredients?: ingredient[];
    userID?: number;
    getComments?: (cocktailID: number) => {};
}

interface ingredient {
    name: string;
    measure: string;
}

interface CommentObj {
    commentID?: number;
    cocktailID: number;
    content?: string;
    userID: number;
}

interface cocktailDBResponse {
    drinks?: (DrinksEntity)[] | null;
}

interface DrinksEntity {
    [key: string]: string;
}
  
export type {
    cocktailDBResponse,
    CocktailObj,
    CommentObj,
    ingredient,
    DrinksEntity
};
