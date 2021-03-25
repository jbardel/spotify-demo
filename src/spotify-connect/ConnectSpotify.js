import React from "react";
import { getAuthorizationURI } from "./spotify-connect";

class ConnectSpotify extends React.Component {

    constructor(props) {
        super(props);
    }
    

    render() {
        return <button onClick={() => { window.location.href = getAuthorizationURI() }} className="btn btn-primary">
            Se connecter à Spotify
        </button>
    }

}

export default ConnectSpotify;