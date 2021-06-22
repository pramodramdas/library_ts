import React from 'react';
import axios from 'axios';
import MsgContext from "../context/message"
import { server } from "../config/server_config"
import { RouteComponentProps, withRouter } from 'react-router';
import { AppState } from "../reducers"
import { Genre as GenreData, fetchSingleGenre } from "../actions"
import { connect } from 'react-redux';

interface Params {
    genreId : string;
}

interface CreateGenreProps extends RouteComponentProps<Params> {
    genre: GenreData;
    fetchSingleGenre: Function;
    action?: string;
}

class _CreateGenre extends React.Component<CreateGenreProps> {
    private genreName: React.RefObject<HTMLInputElement>;
    static contextType = MsgContext;
    // declare context: React.ContextType<typeof MsgContext>;
    context!: React.ContextType<typeof MsgContext>;

    constructor(props:CreateGenreProps) {
        super(props)
        this.genreName = React.createRef();
    }

    onSubmit = async () => {
        if(this.genreName.current && !this.genreName.current.value) {
            this.genreName.current.focus()
            return 
        }

        const genreId = this.props.match.params.genreId
        let url = ""
        let httpFunc
        if(genreId) {
            url = `${server.url}/catalog/genre/${genreId}/update`
            httpFunc = axios.put
        } else {
            url = `${server.url}/catalog/genre/create`
            httpFunc = axios.post
        }

        let resp = await httpFunc(url, {
            name:this.genreName.current && this.genreName.current.value,
        })
        if(!resp || !resp.data || resp.data.success == false) {
            this.context.setMsg("", (resp && resp.data && resp.data.msg) || "error" )
        } else {
            this.props.history.push(`/catalog/genre/${genreId || resp.data.data}`)
        }
    }

    componentDidMount() {
        const genreId = this.props.match.params.genreId
        
        if(genreId && Object.keys(this.props.genre).length === 0) {
            this.props.fetchSingleGenre(genreId);
        }
    }

    render() {
        const genreId = this.props.match.params.genreId
        const  { action, genre } = this.props

        return (
            <div className="ui form" style={{textAlign:"left"}}>
                <h1>{genreId ? "Update" : "Create"} Genre</h1>
                <div className="field">
                    <label>Genre:</label>
                    <input ref={this.genreName} type="text" name="first-name" placeholder="Fantacy, Poetry etc." defaultValue={(genre && action === "update") ? genre.name: ""}/>
                </div>
                <button className="ui button primary" onClick={this.onSubmit} type="submit">Submit</button>
            </div>
        )
    }
}

const mapStateToProps = ({ genres }: AppState): {genre: GenreData} => {
    return { 
        genre : (genres.length > 0) ? genres[0] : {} as GenreData
    };
};

const CreateGenre = connect(
    mapStateToProps,
    { fetchSingleGenre }
)(withRouter(_CreateGenre))

export default CreateGenre;