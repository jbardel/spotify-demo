import React, { useContext, useEffect, useState } from "react"
import SpotifyWebApi from "../node_modules/spotify-web-api-js/src/spotify-web-api";
import { LoginContext } from "./login/LoginContext";


function UserProfile() {

    const { tokens } = useContext(LoginContext)

    const [userProfile, setUserProfile] = useState({
        display_name: null,
        profile_picture: null,
        url: null
    })

    useEffect(() => {

        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(tokens.accessToken)

        spotifyApi.getMe({}, null).then(res => {
            console.log("data", res)
            const { 
                display_name, 
                images, 
                external_urls: {
                    spotify: url
                } 
            } = res
            setUserProfile({
                display_name,
                profile_picture: images[0].url,
                url
            })
        }, err => {
            console.log("err", err)
        })
    })

    return <div className="userProfile">
        <img src={userProfile.profile_picture} alt="Photo de profil" />
        <div>{userProfile.display_name}</div>
        <div><a href={userProfile.url}>{userProfile.url}</a></div>
        <button className="btn btn-primary">
            Se déconnecter
        </button>
    </div>
}

export default UserProfile