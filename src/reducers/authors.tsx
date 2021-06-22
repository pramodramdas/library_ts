import { Author, Action, ActionTypes } from "../actions";

export const authorsReducer = (state: Author[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchAllAuthors:
            return action.payload;
        case ActionTypes.fetchSingleAuthor:
            return [action.payload];
        default:
            return state
    }
}