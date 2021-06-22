import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Genre as GenreData, fetchAllGenres } from "../actions"
import { AppState } from "../reducers"
import { server } from "../config/server_config"

interface GenresProps {
    genres: GenreData[];
    fetchAllGenres: Function;
}

class _AllGenres extends React.Component<GenresProps> {
    
    constructor(props: GenresProps) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchAllGenres()
    }

    render() {
        return (
            <div style={{"float":"left", "textAlign":"left", "fontSize": "medium"}}>
                <h1>Genre List</h1>
                <div className="ui bulleted list">
                    {
                        this.props.genres.map((g) => {
                            return <div className="item">
                                <Link to={{pathname:`/catalog/genre/${g._id}`,  state:JSON.parse(JSON.stringify(g))}}>{g.name} </Link>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ genres }: AppState): {genres: GenreData[]} => {
    return { genres };
};

const AllGenres = connect(
    mapStateToProps,
    { fetchAllGenres }
)(_AllGenres)

export default AllGenres;