import React from 'react';
import axios from 'axios';
import { dateStringToFormatOne } from "../utils/date_util";
import { connect } from 'react-redux';
import { AppState } from "../reducers"
import BooksSummary from "./books_summary";
import modifyOptions from "./modify_catalog_options"
import { server } from "../config/server_config"
import { Author as AuthorData, Book as BooksData, fetchSingleAuthor, fetchBooksByAuthorID, initialAuthor } from "../actions"
import { RouteComponentProps, withRouter } from 'react-router';

interface Params {
    authorId : string;
}

interface AuthorProps extends RouteComponentProps<Params> {
    author: AuthorData;
    books: BooksData[];
    fetchSingleAuthor: Function;
    fetchBooksByAuthorID: Function;
    action?: string;
}

class _Author extends React.Component<AuthorProps> {
    constructor(props:AuthorProps) {
        super(props)
    }

    componentDidMount() {
        const { authorId } = this.props.match.params

        this.props.fetchSingleAuthor(authorId)
        this.props.fetchBooksByAuthorID(authorId)
    }

    onDelete = async () => {
        let response= await axios.delete(`${server.url}/catalog/author/${this.props.match.params.authorId}/delete`)
        if(response && response.data && response.data.success)
            this.props.history.push(`/catalog/authors`)
    }

    render() {
        const { action, books } = this.props
        const author = this.props.author

        if(action === "delete") {
            return (
                <div style={{fontSize: "16px", textAlign:"left"}}>
                    <h1>Delete Author: {`${author.family_name}, ${author.first_name}`}</h1>
                    ({author.date_of_birth && dateStringToFormatOne(author.date_of_birth)} - {author.date_of_death && dateStringToFormatOne(author.date_of_death)})
                    <br/><br/>
                    {
                        (books && books.length > 0) ?
                        <React.Fragment>
                            <b><h4>Delete the following books before attempting to delete this genre.</h4></b><br/>
                            <BooksSummary src="author" books={books}/>
                        </React.Fragment> :
                        <React.Fragment>
                            <h3>Do you really want to delete this Author?</h3>
                            <button className="ui button primary" onClick={this.onDelete} type="submit">Delete</button>
                        </React.Fragment>
                    }
                </div>
            )
        } else {
            return (
                <div style={{fontSize: "16px", textAlign:"left"}}>
                    <h1>Author: {`${author.family_name}, ${author.first_name}`}</h1>
                    ({author.date_of_birth ? dateStringToFormatOne(author.date_of_birth) : ""} - {author.date_of_death ? dateStringToFormatOne(author.date_of_death): ""})
                    <br/><br/>
                    <BooksSummary src="author" books={books}/>
                    {modifyOptions(this.props.match.params.authorId, "author", author)}
                </div>
            )
        }
    }
}

const mapStateToProps = ({ authors, books }: AppState): {author: AuthorData, books: BooksData[]} => {
    return { 
        author: (authors.length > 0) ? authors[0] : initialAuthor,
        books: books
    };
};

const Author = connect(
    mapStateToProps,
    { fetchSingleAuthor, fetchBooksByAuthorID }
)(withRouter(_Author))

export default Author;