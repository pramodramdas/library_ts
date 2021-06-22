import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { AppState } from "../reducers"
import BooksSummary from "./books_summary";
import modifyOptions from "./modify_catalog_options"
import { server } from "../config/server_config"
import { Genre as GenreData, Book as BooksData, fetchSingleGenre, fetchBooksByGenreID, initalGenre } from "../actions"
import { RouteComponentProps, withRouter } from 'react-router';

interface Params {
    genreId : string
}

interface GenreProps extends RouteComponentProps<Params> {
    genre: GenreData;
    books: BooksData[];
    fetchSingleGenre: Function;
    fetchBooksByGenreID: Function;
    action?: string;
    genreId?: string;
}

class _Genre extends React.Component<GenreProps> {

    constructor(props:GenreProps) {
        super(props)
    }

    componentDidMount() {
        const genreId = this.props.genreId || this.props.match.params.genreId
        this.props.fetchSingleGenre(genreId)
        this.props.fetchBooksByGenreID(genreId)
    }

    onDelete = async () => {
        const genreId = this.props.genreId || this.props.match.params.genreId
        let response = await axios.delete(`${server.url}/catalog/genre/${genreId}/delete`)

        if(response && response.data && response.data.success)
            this.props.history.push(`/catalog/genres`)
    }


    render() {
        const { action, genre, books } = this.props
        const genreId = this.props.genreId || this.props.match.params.genreId

        if(action === "delete") {
            return(
                <div style={{fontSize: "16px", textAlign:"left"}}>
                    <h1>Delete Genre: {genre.name}</h1>
                    {
                        books && books.length > 0 ?
                        <React.Fragment>
                            <b><h4>Delete the following books before attempting to delete this genre.</h4></b><br/>
                            <BooksSummary src="genre" books={books}/>
                        </React.Fragment> :
                        <React.Fragment>
                            <h3>Do you really want to delete this Genre?</h3>
                            <button className="ui button primary" onClick={this.onDelete} type="submit">Delete</button>
                        </React.Fragment>
                    }
                </div>
            )
        } else {
            return (
                <div style={{fontSize: "16px", textAlign:"left"}}>
                    <h1>Genre: {genre.name}</h1>
                    <BooksSummary src="genre" books={books}/>
                    {modifyOptions(genreId, "genre", {_id:genreId, name:genre.name})}
                </div>
            )
        }   
    }
}

const mapStateToProps = ({ genres, books }: AppState): {genre: GenreData, books: BooksData[]} => {
    return { 
        genre: (genres.length > 0) ? genres[0] : initalGenre,
        books: books
    };
};

const Genre = connect(
    mapStateToProps,
    { fetchSingleGenre, fetchBooksByGenreID }
)(withRouter(_Genre))

export default Genre;