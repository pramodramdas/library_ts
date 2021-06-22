import { combineReducers } from "redux";
import { booksReducer } from "./books"
import { genresReducer } from "./genres"
import { authorsReducer } from "./authors"
import { bookInstancesReducer} from "./book_instances"
import { Book, Author, Genre, BookInstance } from "../actions"

export interface AppState {
    books: Book[];
    authors: Author[];
    genres: Genre[],
    bookInstances: BookInstance[]
}

export const reducers = combineReducers<AppState>({
    books: booksReducer,
    authors: authorsReducer,
    genres: genresReducer,
    bookInstances: bookInstancesReducer
})
