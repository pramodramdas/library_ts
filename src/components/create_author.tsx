import React from 'react';
import axios from "axios";
import MsgContext from "../context/message"
import { server } from "../config/server_config"
import { RouteComponentProps, withRouter } from 'react-router';
import { AppState } from "../reducers"
import { Author as AuthorData, fetchSingleAuthor } from "../actions"
import { connect } from 'react-redux';

interface Params {
    authorId : string;
}

interface CreateGenreProps extends RouteComponentProps<Params> {
    author: AuthorData;
    action?: string;
    fetchSingleAuthor: Function;
}

class _CreateAuthor extends React.Component<CreateGenreProps> {
    private firstName: React.RefObject<HTMLInputElement>;
    private familyName: React.RefObject<HTMLInputElement>;
    private dob: React.RefObject<HTMLInputElement>;
    private dod: React.RefObject<HTMLInputElement>;
    static contextType = MsgContext;
    // declare context: React.ContextType<typeof MsgContext>;
    context!: React.ContextType<typeof MsgContext>;

    constructor(props:CreateGenreProps) {
        super(props)
        this.firstName = React.createRef();
        this.familyName = React.createRef();
        this.dob = React.createRef();
        this.dod = React.createRef();
    }

    onSubmit = async () => {
        if(this.firstName.current && !this.firstName.current.value) {
            this.firstName.current.focus()
            return 
        }
        if(this.familyName.current && !this.familyName.current.value) {
            this.familyName.current.focus()
            return
        }

        const authorId = this.props.match.params.authorId
        let url = ""
        let httpFunc
        if(authorId) {
            url = `${server.url}/catalog/author/${authorId}/update`
            httpFunc = axios.put
        } else {
            url = `${server.url}/catalog/author/create`
            httpFunc = axios.post
        }

        let resp = await httpFunc(url, {
            first_name:this.firstName.current && this.firstName.current.value,
            family_name:this.familyName.current && this.familyName.current.value,
            date_of_birth:this.dob.current && this.dob.current.value && new Date(this.dob.current.value),
            date_of_death:this.dod.current && this.dod.current.value && new Date(this.dod.current.value)
        })
        if(!resp || !resp.data || resp.data.success == false) {
            this.context.setMsg("", (resp && resp.data && resp.data.msg) || "error" )
        } else {
            this.props.history.push(`/catalog/author/${authorId || resp.data.data}`)
        }
    }

    componentDidMount() {
        const authorId = this.props.match.params.authorId

        if(authorId && Object.keys(this.props.author).length === 0) {
            this.props.fetchSingleAuthor(authorId);
        }
    }

    render() {
        const authorId = this.props.match.params.authorId
        const { author, action } = this.props
        return (
            <div className="ui form" style={{textAlign:"left"}}>
                <h1>{authorId ? "Update" : "Create"} Author</h1>
                <div className="field">
                    <label>First Name:</label>
                    <input ref={this.firstName} type="text" name="first-name" placeholder="First Name" defaultValue={action === "update" && author ? this.props.author.first_name: ""}/>
                </div>
                <div className="field">
                    <label>Family Name:</label>
                    <input ref={this.familyName} type="text" name="last-name" placeholder="Last Name" defaultValue={action === "update" && author ? this.props.author.family_name: ""}/>
                </div>
                <div className="field">
                    <label>Date of birth:</label>
                    <div className="ui calendar" id="dob">
                        <div className="ui input right icon">
                            <input ref={this.dob} type="date" placeholder="Date/Time" defaultValue={(action === "update" && author && author.date_of_birth) ? new Date(author.date_of_birth).toISOString().split('T')[0]: ""}/>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Date of death:</label>
                    <div className="ui calendar" id="dod">
                        <div className="ui input right icon">
                            <input ref={this.dod} type="date" placeholder="Date/Time" defaultValue={(action === "update" && author && author.date_of_death) ?  new Date(author.date_of_death).toISOString().split('T')[0]: ""}/>
                        </div>
                    </div>
                </div>
                <button className="ui button primary" onClick={this.onSubmit} type="submit">Submit</button>
            </div>
        )
    }
}

const mapStateToProps = ({ authors }: AppState): {author: AuthorData} => {
    return { 
        author : (authors.length > 0) ? authors[0] : {} as AuthorData
    };
};

const CreateAuthor = connect(
    mapStateToProps,
    { fetchSingleAuthor }
)(withRouter(_CreateAuthor))

export default CreateAuthor;