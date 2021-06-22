import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import AllCopies from "./all_copies";
import modifyOptions from "./modify_catalog_options"
import { AppState } from "../reducers"
import { server } from "../config/server_config"
import { Book as BookData, fetchSingleBook, initialAuthor, initialBookPopulated, Genre } from "../actions"
import { RouteComponentProps, withRouter } from 'react-router';

interface Params {
    bookId : string
}

interface BookProps extends RouteComponentProps<Params> {
    book: BookData;
    fetchSingleBook: Function;
    action?:string;
}

class _Book extends React.Component<BookProps> {

    constructor(props:BookProps) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchSingleBook(this.props.match.params.bookId, "yes")
    }
    
    renderBook = () => {
        const { book, action, match } = this.props
        const author = (typeof book.author === "object") ? book.author: initialAuthor
        const genre = (typeof book.genre === "object") ? book.genre : []

        return (
            <React.Fragment>
                <h1>{action === "delete" ? "Delete Book:" : "Title:" } {book.title}</h1>
                
                <h4>Author:</h4> <Link to={`/catalog/author/${author._id}`}>{author.family_name}, {author.first_name} </Link>
                <br/><br/>
                <h4>Summary:</h4> {book.summary}
                <br/><br/>
                <h4>ISBN:</h4> {book.isbn}
                <br/><br/>
                <h4>Genre:</h4>&nbsp;
                {
                    genre.map((g:Genre, i: Number) => {
                        return <React.Fragment>
                            <Link to={{pathname:`/catalog/genre/${g._id}`,  state:JSON.parse(JSON.stringify(g))}}>{g.name}</Link>
                            {i != book.genre.length-1 ? ", " : null}
                        </React.Fragment>
                    })
                }
                <hr/>
                <AllCopies bookId={match.params.bookId} action={action}/>
            </React.Fragment>
        )
    }

    render() {
        const { book, action, match } = this.props;
        return (
            <div className="inlineHeader" style={{fontSize: "16px"}}>
                {
                    book &&
                    <React.Fragment>
                        {this.renderBook()}
                        {(action !== "delete") ? modifyOptions(match.params.bookId, "book", book): null}
                    </React.Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ books }: AppState): {book: BookData} => {
    return { book: (books.length > 0 ? books[0] : initialBookPopulated) };
};

const Book = connect(
    mapStateToProps,
    { fetchSingleBook }
)(withRouter(_Book))

export default Book;
