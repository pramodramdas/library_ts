import { Book, Action, ActionTypes } from "../actions";

export const booksReducer = (state: Book[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchAllBooks:
            return action.payload;
        case ActionTypes.fetchSingleBook:
            return [action.payload]
        default:
            return state
    }
}

