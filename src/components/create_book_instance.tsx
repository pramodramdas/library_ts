import React from 'react';
import axios from "axios";
import MsgContext from "../context/message"
import { server } from "../config/server_config"
import { RouteComponentProps, withRouter } from 'react-router';
import { AppState } from "../reducers"
import { BookInstance as BookInstanceData, Book as BookData, fetchBookInstance, fetchAllBooks } from "../actions"
import { connect } from 'react-redux';

interface Params {
    bookInstanceId : string;
}

interface CreateBookInstanceProps extends RouteComponentProps<Params> {
    books: BookData[];
    bookInstance: BookInstanceData;
    action?: string;
    fetchBookInstance: Function;
    fetchAllBooks: Function;
}

class _CreateInstance extends React.Component<CreateBookInstanceProps> {
    private imprint: React.RefObject<HTMLInputElement>;
    private dueBack: React.RefObject<HTMLInputElement>;
    private statusName: React.RefObject<HTMLSelectElement>;
    private bookTitle: React.RefObject<HTMLSelectElement>;
    static contextType = MsgContext;
    // declare context: React.ContextType<typeof MsgContext>;
    context!: React.ContextType<typeof MsgContext>;

    constructor(props:CreateBookInstanceProps) {
        super(props)
        this.imprint = React.createRef();
        this.dueBack = React.createRef();
        this.statusName = React.createRef();
        this.bookTitle = React.createRef();
    }

    onSubmit = async () => {
        if(this.bookTitle.current && !this.bookTitle.current.value) {
            this.bookTitle.current.focus()
            return 
        }
        if(this.statusName.current && !this.statusName.current.value) {
            this.statusName.current.focus()
            return 
        }
        if(this.imprint.current && !this.imprint.current.value) {
            this.imprint.current.focus()
            return 
        }

        const bookInstanceId = this.props.match.params.bookInstanceId
        let url = ""
        let httpFunc
        if(bookInstanceId) {
            url = `${server.url}/catalog/bookinstance/${bookInstanceId}/update`
            httpFunc = axios.put
        } else {
            url = `${server.url}/catalog/bookinstance/create`
            httpFunc = axios.post
        }

        let resp = await httpFunc(url, {
            book:this.bookTitle.current && this.bookTitle.current.value,
            status:this.statusName.current && this.statusName.current.value,
            imprint:this.imprint.current && this.imprint.current.value,
            due_back:this.dueBack.current && this.dueBack.current.value && new Date(this.dueBack.current.value)
        })
        if(!resp || !resp.data || resp.data.success == false) {
            this.context.setMsg("", (resp && resp.data && resp.data.msg) || "error" )
        } else {
            this.props.history.push(`/catalog/bookinstance/${bookInstanceId || resp.data.data}`)
        }
    }

    componentDidMount() {
        const bookInstanceId = this.props.match.params.bookInstanceId

        if(bookInstanceId && Object.keys(this.props.bookInstance).length === 0) {
            this.props.fetchBookInstance(bookInstanceId);
        }
        this.props.fetchAllBooks();
    }

    renderBooks = () => {
        const bookId = this.props.bookInstance && this.props.bookInstance.book
        const { books, action } = this.props
        return (
            <select className="ui dropdown" placeholder="Select Book" required={true} ref={this.bookTitle}>
                {
                    books.map((b) => {
                        return <option value={b._id} style={{color:"#495057"}} selected={action === "update" && bookId === b._id}>{b.title}</option>
                    })
                }
            </select>
        )
    }

    renderStatus= () => {
        const statusList = ["Maintenance", "Available", "Loaned", "Reserved"]
        const status = this.props.bookInstance && this.props.bookInstance.status
        const { action } = this.props
        return (
            <select className="ui dropdown" placeholder="Select Status" required={true} ref={this.statusName}>
                {
                    statusList.map((name) => {
                        return <option value={name} style={{color:"#495057"}} selected={action === "update" && status === name}>{name}</option>
                    })
                }
            </select>
        )
    }

    render() {
        const { bookInstance, action } = this.props
        const bookInstanceId = this.props.match.params.bookInstanceId

        return (          
            <div className="ui form" style={{textAlign:"left"}}>
                {/* <DisplayMsg/> */}
                <h1>{bookInstanceId ? "Update" : "Create"} BookInstance</h1>
                <div className="field">
                    <label>Book:</label>
                    {this.renderBooks()}
                </div>
                <div className="field">
                    <label>Inprint:</label>
                    <input ref={this.imprint} type="text" name="this.imprint" placeholder="Publisher and date information" defaultValue={(bookInstance && action === "update") ? bookInstance.imprint: ""}/>
                </div>
                <div className="field">
                    <label>Date when book available:</label>
                    <div className="ui calendar" id="dod">
                        <div className="ui input right icon">
                            <input ref={this.dueBack} type="date" placeholder="Date/Time" defaultValue={(bookInstance && action === "update" && bookInstance.due_back)? new Date(bookInstance.due_back).toISOString().split('T')[0]: ""}/>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>Status:</label>
                    {this.renderStatus()}
                </div>
                <button className="ui button primary" onClick={this.onSubmit} type="submit">Submit</button>
            </div>
        )
    }
}

const mapStateToProps = ({ bookInstances, books }: AppState): {books: BookData[], bookInstance: BookInstanceData} => {
    return { 
        bookInstance : (bookInstances.length > 0) ? bookInstances[0] : {} as BookInstanceData,
        books: books
    };
};

const CreateInstance = connect(
    mapStateToProps,
    { fetchBookInstance, fetchAllBooks }
)(withRouter(_CreateInstance))

export default CreateInstance;