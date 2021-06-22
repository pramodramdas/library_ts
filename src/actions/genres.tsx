import axios from 'axios';
import { Dispatch } from 'redux';
import { server } from "../config/server_config";
import { ActionTypes } from "./types"
import { responseData } from "../utils/util"

export interface Genre {
    "_id": string;
    "name": string;
}

export interface fetchAllGenresAction {
    type: ActionTypes.fetchAllGenres,
    payload: Genre[]
}

export const initalGenre:Genre = {
    "_id": "",
    "name": ""
}

export const fetchAllGenres = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<responseData<Genre[]>>(`${server.url}/catalog/genres/?limit=10`);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchAllGenres,
                payload: response.data.data
            })
        }
    }
}

export interface fetchSingleGenreAction {
    type: ActionTypes.fetchSingleGenre,
    payload: Genre
}

export const fetchSingleGenre = (genreId:string) => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<responseData<Genre>>(`${server.url}/catalog/genre/${genreId}`);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchSingleGenre,
                payload: response.data.data
            })
        }
    }
}
