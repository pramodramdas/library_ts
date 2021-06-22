import { BookInstance, Action, ActionTypes } from "../actions";

export const bookInstancesReducer = (state: BookInstance[] = [], action: Action) => {
    switch (action.type) {
        case ActionTypes.fetchAllBookInstances:
            return action.payload;
        case ActionTypes.fetchSingleBookInstance:
            return [action.payload];
        default:
            return state
    }
}