import axios from 'axios';
import { Dispatch } from 'redux';
import { server } from "../config/server_config";
import { ActionTypes } from "./types"
import { responseData } from "../utils/util"
import { Author, initialAuthor } from "./authors";
import { Genre } from "./genres";

export interface Book {
    "_id": string;
    "genre": Genre[] | string;
    "title":string;
    "summary":string;
    "author": Author | string;
    "isbn":string;
}

export const initialBookPopulated: Book = {
    "_id": "",
    "genre": [],
    "title":"",
    "summary":"",
    "author": initialAuthor,
    "isbn": ""
}
// export interface getBooksResponse {
//     success: boolean,
//     data: Book[]
// }

export interface fetchAllBooksAction {
    type: ActionTypes.fetchAllBooks,
    payload: Book[]
}

export const fetchAllBooks = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<responseData<Book[]>>(`${server.url}/catalog/books/?limit=10`);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchAllBooks,
                payload: response.data.data
            })
        }
    }
}

export interface fetchSingleBookAction {
    type: ActionTypes.fetchSingleBook,
    payload: Book
}

export const fetchSingleBook = (bookId: string, populate:string) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<responseData<Book>>(`${server.url}/catalog/book/${bookId}?populate=${populate}`);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchSingleBook,
                payload: response.data.data
            })
        }
    }
}

export const fetchBooksByGenreID = (genreId: string) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<responseData<Book[]>>(`${server.url}/catalog/booksbygenreid/${genreId}`);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchAllBooks,
                payload: response.data.data
            })
        }
    }
}

export const fetchBooksByAuthorID = (authorId: string) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<responseData<Book[]>>(`${server.url}/catalog/booksbyauthorid/${authorId}`);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchAllBooks,
                payload: response.data.data
            })
        }
    }
}

export const resetBooks = () => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ActionTypes.fetchAllBooks,
            payload: []
        })
    }
}