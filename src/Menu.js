import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpotifyWebApi from "../node_modules/spotify-web-api-js/src/spotify-web-api";
import './Menu.css'
import { getAuthorizationURI, isConnected } from "./login/spotify-connect";
import { LoginContext } from "./login/LoginContext";

function Menu() {


    const { tokens } = useContext(LoginContext)

    //Hook d'état
    const [connectionState, setConnectionState] = useState({
        display_name: null,
        profile_picture: null
    })

    //Hook d'effet
    useEffect(() => {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(tokens.accessToken)

        if (isConnected()) {
            spotifyApi.getMe({}, null).then(res => {
                const { display_name, images } = res
                setConnectionState({
                    display_name,
                    profile_picture: images[0].url
                })
            }, () => {
                setConnectionState({
                    display_name: null,
                    profile_picture: null,
                })
            })
        }
    }, [tokens])

    return <div className="menu">
        <nav className="navlink">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/me">User Profile</Link>
                </li>
                <li>
                    <Link to="/playlist">Playlist</Link>
                </li>
                <li>
                    {profile(connectionState)}
                </li>
            </ul>
        </nav>
    </div>


}

function profile(state) {
    if (state.display_name) {
        return <Link to="/me"><img src={state.profile_picture} className="profilePicture" />{state.display_name}</Link>
    } else {
        return <button onClick={() => { window.location.href = getAuthorizationURI() }} className="btn btn-primary">Se connecter avec Spotify</button>
    }
}


export default Menu;