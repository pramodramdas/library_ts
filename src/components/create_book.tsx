import React from 'react';
import axios from "axios";
import MsgContext from "../context/message"
import { server } from "../config/server_config"
import { RouteComponentProps, withRouter } from 'react-router';
import { AppState } from "../reducers"
import { Author as AuthorData, Book as BookData, Genre as GenreData, fetchAllGenres, fetchAllAuthors, fetchSingleBook } from "../actions"
import { connect } from 'react-redux';

interface Params {
    bookId : string;
}

interface CreateBookProps extends RouteComponentProps<Params> {
    authors: AuthorData[];
    genres: GenreData[];
    book: BookData;
    action?: string;
    fetchAllAuthors: Function;
    fetchSingleBook: Function;
    fetchAllGenres: Function;
}

interface createBookState {
    genresSelected: Set<string>,
    authors: AuthorData[],
    genres: GenreData[],
    book: BookData
}

class _CreateBook extends React.Component<CreateBookProps, createBookState> {
    private authorName: React.RefObject<HTMLSelectElement>;
    private bookTitle: React.RefObject<HTMLInputElement>;
    private summary: React.RefObject<HTMLInputElement>;
    private isbn: React.RefObject<HTMLInputElement>;
    static contextType = MsgContext;
    // declare context: React.ContextType<typeof MsgContext>;
    context!: React.ContextType<typeof MsgContext>;

    constructor(props:CreateBookProps) {
        super(props)
        this.authorName = React.createRef();
        this.bookTitle = React.createRef();
        this.summary = React.createRef();
        this.isbn = React.createRef();
        this.state = {
            genresSelected: new Set(),
            authors: [],
            genres: [],
            book: {} as BookData
        }
    }

    onSubmit = async () => {
        if(this.bookTitle.current && !this.bookTitle.current.value) {
            this.bookTitle.current.focus()
            return 
        }
        if(this.summary.current && !this.summary.current.value) {
            this.summary.current.focus()
            return 
        }
        if(this.isbn.current && !this.isbn.current.value) {
            this.isbn.current.focus()
            return 
        }

        const bookId = this.props.match.params.bookId
        let url = ""
        let httpFunc
        if(bookId) {
            url = `${server.url}/catalog/book/${bookId}/update`
            httpFunc = axios.put
        } else {
            url = `${server.url}/catalog/book/create`
            httpFunc = axios.post
        }

        let response = await httpFunc(url, {
            title:this.bookTitle.current && this.bookTitle.current.value,
            summary:this.summary.current && this.summary.current.value,
            isbn:this.isbn.current && this.isbn.current.value,
            genre:Array.from(this.state.genresSelected),
            author:this.authorName.current && this.authorName.current.value
        })
        if(!response || !response.data || !response.data.success) {
            this.context.setMsg("", (response && response.data && response.data.message) || "error" )
        } else {
            this.props.history.push(`/catalog/book/${bookId || response.data.data}`)
        }
    }

    componentDidMount() {
        const bookId = this.props.match.params.bookId

        //if(bookId && Object.keys(this.props.book).length === 0) {
            this.props.fetchSingleBook(bookId, "");
        //}
        this.props.fetchAllGenres();
        this.props.fetchAllAuthors();
    }

    renderAuthor = () => {
        const { action } = this.props
        let authorId:string = ""
        if(this.props.book instanceof Object && typeof this.props.book.author === "string") {
            authorId = this.props.book.author
        }
        return (
            <select className="ui dropdown" placeholder="Select Friend" required={true} ref={this.authorName}>
                {
                    this.props.authors.map((a) => {
                        return <option value={a._id} style={{color:"#495057"}} selected={action === "update" && a._id == authorId}>{`${a.family_name},${a.first_name}`}</option>
                    })
                }
            </select>
        )
    }

    onGenreChange = (e:React.FormEvent<HTMLInputElement>) => {
        let selected = new Set(this.state.genresSelected)
        if(e) {
            if(e.currentTarget.checked) 
                selected.add(e.currentTarget.value)
            else
                selected.delete(e.currentTarget.value)
            this.setState({genresSelected:selected})
        }
    }

    renderGenre = () => {
        let genreIds:string[] = []
        const { action } = this.props
        if(this.props.book && Array.isArray(this.props.book.genre)) {
            genreIds = (this.props.book.genre as unknown as string[])
        }

        return (
            <div> 
                {    
                    this.props.genres.map((g) => {
                        return <div className="ui checkbox">
                            <input type="checkbox" id={g.name} name={g.name} value={g._id} onChange={this.onGenreChange} checked={(action === "update" && genreIds.indexOf(g._id) > -1)}/>
                            <label>{g.name}</label>
                        </div>
                    })
                }
            </div>
        )
    }

    render() {
        const bookId = this.props.match.params.bookId
        const { book, action } = this.props
        return (
            <div className="ui form" style={{textAlign:"left"}}>
                {/* <DisplayMsg/> */}
                <h1>{bookId ? "Update" : "Create"} Book</h1>
                <div className="field">
                    <label>Title:</label>
                    <input ref={this.bookTitle} type="text" name="first-name" placeholder="Name of book" defaultValue={(book && action === "update") ? this.props.book.title: ""}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    {this.renderAuthor()}
                </div>
                <div className="field">
                    <label>Summary:</label>
                    <input ref={this.summary} type="text" name="first-name" placeholder="Summary" defaultValue={(book && action === "update") ? this.props.book.summary: ""}/>
                </div>
                <div className="field">
                    <label>ISBN:</label>
                    <input ref={this.isbn} type="text" name="first-name" placeholder="ISBN" defaultValue={(book && action === "update") ? this.props.book.isbn: ""}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    {this.renderGenre()}
                </div>
                <button className="ui button primary" onClick={this.onSubmit} type="submit">Submit</button>
            </div>
        )
    }
}

const mapStateToProps = ({ authors, genres, books }: AppState): {authors: AuthorData[], genres: GenreData[], book: BookData} => {
    return { 
        authors,
        genres,
        book: (books.length > 0) ? books[0] : {} as BookData
    };
};

const CreateBook = connect(
    mapStateToProps,
    { fetchAllAuthors, fetchSingleBook, fetchAllGenres }
)(withRouter(_CreateBook))

export default CreateBook;