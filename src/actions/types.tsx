import { fetchAllBooksAction, fetchSingleBookAction } from "./books";
import { fetchAllAuthorsAction, fetchSingleAuthorAction } from "./authors"
import { fetchAllGenresAction, fetchSingleGenreAction } from "./genres"
import { fetchAllBookInstancesAction, fetchSingleBookInstanceAction } from "./book_instances"

export enum ActionTypes {
    fetchAllBooks,
    fetchSingleBook,
    fetchAllAuthors,
    fetchSingleAuthor,
    fetchAllGenres,
    fetchSingleGenre,
    fetchAllBookInstances,
    fetchSingleBookInstance
}

export type Action = fetchAllBooksAction | fetchSingleBookAction | fetchAllAuthorsAction | fetchAllGenresAction | fetchAllBookInstancesAction | fetchSingleBookInstanceAction | fetchSingleGenreAction | fetchSingleAuthorAction