import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "./LoginContext";
import { genToken } from "./spotify-connect";

function getHashParams() {
    var hashParams = {};
    var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.href.split("?")[1];
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}


function Callback(props) {

    const {setTokens} = useContext(LoginContext)

    const { error, code, state } = getHashParams();
    const history = useHistory();

    let msg = null
    if (error) {
        msg = 'There was an error during the authentication'
    }

    genToken(state, code).then(tokenData => {
        if (tokenData.error) {
            msg = 'Acces token retrieve error'
        } else {
            console.log("Sauvegarde token")
            const { access_token, expires_in, refresh_token } = tokenData

            setTokens({
                accessToken: access_token, 
                refreshToken: refresh_token,
                expiresIn: expires_in
            })
            history.push("/")
        }

    })

    return (<div>
        {msg}
    </div>)
}

export default Callback;