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
    ingredientName: string;
    measure: string;
}

// Example Cocktail output from Database
// const cocktail = {
//     cocktailID: 1,
//     cocktailName: 'Buttery Nipple',
//     imgURL: 'https://www.google.com',
//     instructions: 'Mix in equal quantities',
//     ingredients: [
//         { name: 'ButterShots', measure: '1 shot'},
//         { name: 'Balies Irish Cream', measure: '1 shot'},
//     ],
//     userID: 1
// }

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
    idDrink: string;
    strDrink: string;
    strDrinkAlternate?: string | null;
    strTags?: string | null;
    strVideo?: string | null;
    strCategory: string;
    strIBA?: string | null;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strInstructionsES?: string | null;
    strInstructionsDE: string;
    strInstructionsFR?: string | null;
    strInstructionsIT: string;
    "strInstructionsZH-HANS"?: string | null;
    "strInstructionsZH-HANT"?: string | null;
    strDrinkThumb: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4?: string | null;
    strIngredient5?: string | null;
    strIngredient6?: string | null;
    strIngredient7?: string | null;
    strIngredient8?: string | null;
    strIngredient9?: string | null;
    strIngredient10?: string | null;
    strIngredient11?: string | null;
    strIngredient12?: string | null;
    strIngredient13?: string | null;
    strIngredient14?: string | null;
    strIngredient15?: string | null;
    strMeasure1: string;
    strMeasure2?: string | null;
    strMeasure3?: string | null;
    strMeasure4?: string | null;
    strMeasure5?: string | null;
    strMeasure6?: string | null;
    strMeasure7?: string | null;
    strMeasure8?: string | null;
    strMeasure9?: string | null;
    strMeasure10?: string | null;
    strMeasure11?: string | null;
    strMeasure12?: string | null;
    strMeasure13?: string | null;
    strMeasure14?: string | null;
    strMeasure15?: string | null;
    strImageSource?: string | null;
    strImageAttribution?: string | null;
    strCreativeCommonsConfirmed: string;
    dateModified: string;
}
  
export type {
    cocktailDBResponse,
    CocktailObj,
    CommentObj,
    ingredient,
    DrinksEntity
};
