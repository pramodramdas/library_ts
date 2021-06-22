import React from 'react';
import { Link } from "react-router-dom";
import { Book } from "../actions";

interface BookSummaryInterface {
    src:string;
    books: Book[];
}

const BooksSummary = (props:BookSummaryInterface) => {
    return(
        <div style={{paddingLeft: "15px"}}>
            <h3>Books</h3>
                {
                    (props.books && props.books.length > 0) ? 
                    props.books.map((b) => {
                        return <React.Fragment>
                            <h4><Link to={`/catalog/book/${b._id}`}>{b.title}</Link></h4>
                            {b.summary}
                            <hr/>
                        </React.Fragment>
                    }) :
                    <React.Fragment>
                        {`This ${props.src} has no books.`}
                        <hr/>
                    </React.Fragment>
                }
        </div>
    )
}

export default BooksSummary;