import React from 'react';
import axios from 'axios';
import { server } from "../config/server_config"
import { responseData } from "../utils/util"

const initialCatalog = {
    "totalAuthors": 0,
    "totalBookInstances": 0,
    "totalBookInstancesAvailable": 0,
    "totalBooks": 0,
    "totalGenres": 0
}

interface catalogSummayInterface {
    totalAuthors: Number;
    totalBookInstances: Number;
    totalBookInstancesAvailable: Number;
    totalBooks: Number;
    totalGenres: Number;
}

interface HomeState {
    catalogSummay: catalogSummayInterface
}

class Home extends React.Component<any, HomeState> {
    state = {catalogSummay:initialCatalog}

    getCatalog = async () => {
        let response = await axios.get<responseData<catalogSummayInterface>>(`${server.url}/catalog/`)

        if(response && response.data && response.data.success) {
            this.setState({catalogSummay: response.data.data})
        }
    }

    componentDidMount() {
        this.getCatalog()
    }

    render() {
        return (
            <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
                <h1>Local Library Home</h1>
                <p>React implementation with hooks</p>
                <br/>
                <p>The library has the following record counts:</p>
                <div className="ui bulleted list">
                    <div className="item"><b>Books: </b>{this.state.catalogSummay.totalAuthors}</div>
                    <div className="item"><b>Copies: </b>{this.state.catalogSummay.totalBookInstances}</div>
                    <div className="item"><b>Copies available: </b>{this.state.catalogSummay.totalBookInstancesAvailable}</div>
                    <div className="item"><b>Authors: </b>{this.state.catalogSummay.totalBooks}</div>
                    <div className="item"><b>Genres: </b>{this.state.catalogSummay.totalGenres}</div>
                </div>
            </div>
        )
    }
}

export default Home;