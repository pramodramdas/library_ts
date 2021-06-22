import React from "react"
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { BookInstance as BookInstanceData, fetchAllBookInstances, initialBookPopulated } from "../actions"
import { AppState } from "../reducers"
import { dateStringToFormatOne } from "../utils/date_util";
import { bookInstanceStatusColor } from "../config/css_config"

interface BookInstanceProps {
    bookInstances: BookInstanceData[];
    fetchAllBookInstances: Function;
}

class _AllBookInstances extends React.Component<BookInstanceProps> {

    constructor(props: BookInstanceProps) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchAllBookInstances("", "yes")
    }

    render() {
        return (
            <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
                <h1>Book Instance List</h1>
                <div className="ui bulleted list">
                    {
                        this.props.bookInstances.map((bi) => {
                            const book = (typeof bi.book === "object") ? bi.book : initialBookPopulated
                            return <div className="item">
                                <Link to={{pathname:`/catalog/bookinstance/${bi._id}`,  state:JSON.parse(JSON.stringify(bi))}}>
                                    {bi.book && book.title} : {bi.imprint}
                                </Link>
                                &nbsp;-&nbsp;<span style={{color:bookInstanceStatusColor[bi.status]}}>{bi.status}</span> {bi.status !== "Available" ? `(Due: ${dateStringToFormatOne(bi.due_back)})`:""}
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ bookInstances }: AppState): {bookInstances: BookInstanceData[]} => {
    return { bookInstances };
};

const AllBookInstances = connect(
    mapStateToProps,
    { fetchAllBookInstances }
)(_AllBookInstances)

export default AllBookInstances;