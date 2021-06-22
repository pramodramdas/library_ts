import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Author as AuthorData, fetchAllAuthors } from "../actions"
import { AppState } from "../reducers"
import { dateStringToFormatOne } from "../utils/date_util";

interface AuthorsProps {
    authors: AuthorData[];
    fetchAllAuthors: Function;
}

class _AllAuthors extends React.Component<AuthorsProps> {

    constructor(props: AuthorsProps) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchAllAuthors()
    }

    render() {
        return (
            <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
                <h1>Author List</h1>
                <div className="ui bulleted list">
                    {
                        this.props.authors.map((a, index) => {
                            return <div className="item">
                                <Link style={{display:"inline"}} to={{pathname:`/catalog/author/${a._id}`}}>
                                    {a.family_name}, {a.first_name}
                                </Link>&nbsp;
                                ({a.date_of_birth && dateStringToFormatOne(a.date_of_birth)} - {a.date_of_death && dateStringToFormatOne(a.date_of_death)})
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ authors }: AppState): {authors: AuthorData[]} => {return { authors };};

const AllAuthors = connect(mapStateToProps, { fetchAllAuthors })(_AllAuthors)

export default AllAuthors;