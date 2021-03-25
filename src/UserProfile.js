import React from "react"
import SpotifyWebApi from "../node_modules/spotify-web-api-js/src/spotify-web-api";
import { ACCESS_TOKEN_KEY } from "./spotify-connect/spotify-connect";

class UserProfile extends React.Component {

    spotifyApi = new SpotifyWebApi();

    constructor(props) {
        super(props)

        this.state = {
            display_name: null,
            profile_picture: null,
            url: null
        }

        this.spotifyApi.setAccessToken(localStorage.getItem(ACCESS_TOKEN_KEY))
    }


    componentDidMount() {
        this.spotifyApi.getMe({}, null).then(res => {
            console.log("data", res)
            const { display_name, images, external_urls : {
                spotify: url
            } } = res
            this.setState({
                display_name,
                profile_picture: images[0].url,
                url
            })
        }, err => {
            console.log("err", err)
        })
    }

    render() {

        return <div className="userProfile">
            <img src={this.state.profile_picture} alt="Photo de profil" />
            <div>{this.state.display_name}</div>
            <div><a href={this.state.url}>{this.state.url}</a></div>
            <button className="btn btn-primary">
                Se déconnecter
            </button>
        </div>
    }

}

export default UserProfile