import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { AppState } from "../reducers"
import { bookInstanceStatusColor } from "../config/css_config"
import { server } from "../config/server_config"
import { BookInstance as BookInstanceData, fetchAllBookInstances } from "../actions"
import { RouteComponentProps, withRouter } from 'react-router';


interface BookInstanceProps extends RouteComponentProps {
    bookInstances: BookInstanceData[];
    fetchAllBookInstances: Function;
    action?:string;
    bookId:string;
}


class _AllCopies extends React.Component<BookInstanceProps> {

    constructor(props: BookInstanceProps) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchAllBookInstances(this.props.bookId)
    }

    renderCopies = () =>  {
        return this.props.bookInstances.map((bi) => {  
            let due = (bi.status !== "Available") ? <span><h4>Due:</h4> {new Date(bi.due_back).toString()}<br/><br/></span> : ""
            return <React.Fragment>
                <span style={{color:bookInstanceStatusColor[bi.status]}}>{bi.status}</span>
                <br/><br/>
                <h4>Imprint:</h4> {bi.imprint}
                <br/><br/>
                {due}
                <h4>Id:</h4> <Link to={`/catalog/bookinstance/${bi._id}`}>{bi._id}</Link>
                <hr/>
            </React.Fragment>
        })
    }

    onDelete = async () => {
        let response = await axios.delete(`${server.url}/catalog/book/${this.props.bookId}/delete`)
        
        if(response && response.data && response.data.success)
            this.props.history.push(`/catalog/books`)
    }

    render() {
        const { bookInstances, action } = this.props
        if(!bookInstances || bookInstances.length == 0) {
            return (
                <div className="inlineHeader" style={{paddingLeft: "15px"}}>
                    {
                        (action == "delete") ?
                        <React.Fragment>
                            <h3>Do you really want to delete this Book?</h3>
                            <button className="ui button primary" onClick={this.onDelete} type="submit">Delete</button>
                        </React.Fragment> :
                        <React.Fragment>There are no copies of this book in the library.<hr/></React.Fragment>
                    }
                </div>
            )
        } else {
            return (
                <div className="inlineHeader" style={{paddingLeft: "15px"}}>
                    {
                        (action == "delete") ?
                        <React.Fragment>
                            <h4><b>Delete the following copies before attempting to delete this Book.</b></h4>
                            <br/><br/>
                        </React.Fragment> :
                        null
                    }
                    {this.renderCopies()}
                </div>
            )
        }
    }
}

const mapStateToProps = ({ bookInstances }: AppState): {bookInstances: BookInstanceData[]} => {
    return { bookInstances };
};

const AllCopies = connect(
    mapStateToProps,
    { fetchAllBookInstances }
)(withRouter(_AllCopies))

export default AllCopies;
