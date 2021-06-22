import axios from 'axios';
import { Dispatch } from 'redux';
import { server } from "../config/server_config";
import { ActionTypes } from "./types"
import { responseData } from "../utils/util"
import { Book } from "./books"

export interface BookInstance {
    "_id": string;
    "status": string;
    "book"?: Book | string;
    "imprint": string;
    "due_back": string;
}

export const initialBookInstance:BookInstance = {
    "_id": "",
    "status": "",
    "book": "",
    "imprint": "",
    "due_back": "",
}

export interface fetchAllBookInstancesAction {
    type: ActionTypes.fetchAllBookInstances,
    payload: BookInstance[]
}

export interface fetchSingleBookInstanceAction { 
    type: ActionTypes.fetchSingleBookInstance,
    payload: BookInstance
}

export const fetchAllBookInstances = (bookId:string, populate:string) => {
    return async (dispatch: Dispatch) => {
        let url:string = ""
        if(!bookId)
            url = `${server.url}/catalog/bookinstances/?populate=${populate}&limit=10`
        else
            url = `${server.url}/catalog/bookinstancesbybookid/${bookId}/?${populate}`

        const response = await axios.get<responseData<BookInstance[]>>(url);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchAllBookInstances,
                payload: response.data.data
            })
        }
    }
}

export const fetchBookInstance = (bookInstanceId:string, populate:string) => {
    return async (dispatch: Dispatch) => {
        let url:string = ""
        if(bookInstanceId)
            url = `${server.url}/catalog/bookinstance/${bookInstanceId}/?populate=${populate}`
        else
            return

        const response = await axios.get<responseData<BookInstance>>(url);

        if(response && response.data && response.data.success) {
            dispatch({
                type: ActionTypes.fetchSingleBookInstance,
                payload: response.data.data
            })
        }
    }
}


export const resetBookInstances = () => {
    return async (dispatch: Dispatch) => {
        dispatch({
            type: ActionTypes.fetchAllBookInstances,
            payload: []
        })
    }
}