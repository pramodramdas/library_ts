import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Book as BookData, fetchAllBooks } from "../actions"
import { AppState } from "../reducers"

interface BooksProps {
    books: BookData[];
    fetchAllBooks: Function;
}

class _AllBooks extends React.Component<BooksProps> {
    constructor(props: BooksProps) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAllBooks()
    }

    render() {
        return (
            <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
                <h1>Book List</h1>
                <div className="ui bulleted list">
                    {
                        this.props.books.map((b) => {
                            return <div className="item">
                                <Link to={{pathname:`/catalog/book/${b._id}`,  state:JSON.parse(JSON.stringify(b))}}>{b.title} </Link>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ books }: AppState): {books: BookData[]} => {
    return { books };
};

const AllBooks = connect(
    mapStateToProps,
    { fetchAllBooks }
)(_AllBooks)

export default AllBooks;