import React from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "../node_modules/spotify-web-api-js/src/spotify-web-api";
import './Menu.css'
import { ACCESS_TOKEN_KEY, getAuthorizationURI, isConnected } from "./spotify-connect/spotify-connect";

class Menu extends React.Component {

    spotifyApi = new SpotifyWebApi();

    constructor(props) {
        super(props)
        this.state = {
            connected: false,
            display_name: null,
            profile_picture: null,
        }

        this.spotifyApi.setAccessToken(localStorage.getItem(ACCESS_TOKEN_KEY))

    }

    componentDidMount() {
        if (isConnected()) {
            this.spotifyApi.getMe({}, null).then(res => {
                const { display_name, images } = res
                this.setState({
                    connected: true,
                    display_name,
                    profile_picture: images[0].url
                })
            }, err => {
                this.setState({
                    connected: false,
                    display_name: null,
                    profile_picture: null,
                })
            })
        }

    }

    render() {

        return <div className="menu">
            <nav className="nav-link">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/me">User Profile</Link>
                    </li>
                    <li>
                        <Link to="/playlist">Playlist</Link>
                    </li>
                    <li>
                        {this.profile(this.state.connected)}
                    </li>
                </ul>
            </nav>
        </div>
    }


    profile(connected) {
        if (connected) {
            return <Link to="/me"><img src={this.state.profile_picture} className="profilePicture" />{this.state.display_name}</Link>
        } else {
            return <button onClick={() => { window.location.href = getAuthorizationURI() }} className="btn btn-primary">Se connecter avec Spotify</button>
        }
    }

}

export default Menu;