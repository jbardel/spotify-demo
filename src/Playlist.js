import React, { useContext, useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js/src/spotify-web-api'
import { LoginContext } from './login/LoginContext'
import './Playlist.css'


function Playlist() {

    var { tokens } = useContext(LoginContext)

    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(tokens.accessToken)

        // @ts-ignore
        spotifyApi.getUserPlaylists().then(res => {
            const playlists = res.items.map(x => ({ name: x.name, description: x.description }))
            //debugger
            setPlaylists(playlists)
        }, err => {
            console.error(err)
        })

    }, [tokens])

    return (
        <div className="playlist">
            <ul className="list-group">
                {playlists.map((a,i) => <li key={i} className="list-group-item">{a.name}</li>)}
            </ul>

        </div>
    )
}

export default Playlist