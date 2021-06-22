import axios from 'axios';
import { Dispatch } from 'redux';
import { server } from "../config/server_config";
import { ActionTypes } from "./types"
import { responseData } from "../utils/util"

export interface Author {
    "_id": string;
    "first_name": string;
    "family_name":string;
    "date_of_birth"?:string;
    "date_of_death"?:string;
}

export const initialAuthor: Author = {
    "_id":"",
    "first_name":"",
    "family_name":""
}

export interface fetchAllAuthorsAction {
    type: ActionTypes.fetchAllAuthors,
    payload: Author[]
}

export const fetchAllAuthors = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<responseData<Author[]>>(`${server.url}/catalog/authors/?limit=10`);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchAllAuthors,
                payload: response.data.data
            })
        }
    }
}

export interface fetchSingleAuthorAction {
    type: ActionTypes.fetchSingleAuthor,
    payload: Author
}

export const fetchSingleAuthor = (authorId:string) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<responseData<Author>>(`${server.url}/catalog/author/${authorId}`);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchSingleAuthor,
                payload: response.data.data
            })
        }
    }
}

export const resetAuthors = () => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ActionTypes.fetchAllAuthors,
            payload: []
        })
    }
}