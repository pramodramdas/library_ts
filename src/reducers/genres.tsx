import { Genre, Action, ActionTypes } from "../actions";

export const genresReducer = (state: Genre[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchAllGenres:
            return action.payload;
        case ActionTypes.fetchSingleGenre:
            return [action.payload];
        default:
            return state
    }
}