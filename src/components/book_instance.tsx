import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bookInstanceStatusColor } from "../config/css_config"
import { dateStringToFormatOne } from "../utils/date_util";
import { BookInstance as BookInstanceData, fetchBookInstance, initialBookInstance, initialBookPopulated } from "../actions"
import { AppState } from "../reducers"
import modifyOptions from "./modify_catalog_options"
import { server } from "../config/server_config"
import { RouteComponentProps, withRouter } from 'react-router';
import axios from "axios";

interface Params {
    bookInstanceId : string
}

interface BookInstanceProps extends RouteComponentProps<Params> {
    bookInstance: BookInstanceData;
    fetchBookInstance: Function;
    action?: string;
    bookInstanceId?: string;
}

class _BookInstance extends React.Component<BookInstanceProps> {
    constructor(props:BookInstanceProps) {
        super(props)
    }

    componentDidMount() {
        const bookInstanceId = this.props.bookInstanceId || this.props.match.params.bookInstanceId
        this.props.fetchBookInstance(bookInstanceId, "yes") 
    }

    onDelete = async () => {
        const bookInstanceId = this.props.bookInstanceId || this.props.match.params.bookInstanceId
        let response = await axios.delete(`${server.url}/catalog/bookinstance/${bookInstanceId}/delete`)

        if(response && response.data && response.data.success)
            this.props.history.push(`/catalog/bookinstances`)
    }

    render() {
        const bookInstanceId = this.props.bookInstanceId || this.props.match.params.bookInstanceId
        const { bookInstance, action } = this.props
        const due = (bookInstance && bookInstance.status !== "Available") ? <span><h4>Due  back:</h4> {dateStringToFormatOne(bookInstance.due_back).toString()}<br/><br/></span> : ""
        const book = (typeof bookInstance.book === "object") ? bookInstance.book : initialBookPopulated

        return (
            <div className="inlineHeader" style={{paddingLeft: "15px"}}>
                {
                    bookInstance ?
                    <React.Fragment>
                        {
                            (action === "delete") ?
                            <React.Fragment>
                                <h1>Delete BookInstance</h1>
                                <h3>Do you really want to delete this BookInstance?</h3>
                                <h4>ID:</h4> {bookInstanceId}
                                <br/><br/>
                            </React.Fragment> :
                            <h1>ID: {bookInstanceId}</h1>
                        }
                        <h4>Title:</h4> <Link to={`/catalog/book/${book._id}`}>{book.title}</Link>
                        <br/><br/>
                        <h4>Imprint:</h4> {bookInstance.imprint}
                        <br/><br/>
                        <h4>Status:</h4> <span style={{color:bookInstanceStatusColor[bookInstance.status]}}>{bookInstance.status}</span>
                        <br/><br/>
                        {due}
                        <hr/>
                        {
                            action !== "delete" ? 
                            modifyOptions(bookInstanceId, "bookinstance", bookInstance) : 
                            <React.Fragment>
                                <h3>Do you really want to delete this BookInstance?</h3>
                                <button className="ui button primary" onClick={this.onDelete} type="submit">Delete</button>
                            </React.Fragment>
                        }
                    </React.Fragment>:
                    null
                }
            </div>
        )
    }
    
}

const mapStateToProps = ({ bookInstances }: AppState): {bookInstance: BookInstanceData} => {
    return { bookInstance: (bookInstances.length > 0) ? bookInstances[0] : initialBookInstance };
};

const BookInstance = connect(
    mapStateToProps,
    { fetchBookInstance }
)(withRouter(_BookInstance))

export default BookInstance;