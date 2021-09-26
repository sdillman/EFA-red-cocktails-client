interface CocktailObj {
    cocktailID?: number;
    cocktailName: string;
    imgURL?: string;
    instructions?: JSON;
    userID: number;
    getComments: (userID?: number) => {};
}

interface CommentObj {
    commentID?: number;
    cocktailID: number;
    content?: string;
    userID: number;
}

export type {
    CocktailObj,
    CommentObj
};
