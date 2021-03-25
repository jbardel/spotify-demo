import React from "react";
import { useHistory } from "react-router-dom";
import { genToken, saveToken } from "./spotify-connect";

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


function Callback() {

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
            console.log(tokenData)
            //save token
            history.push('/')
            saveToken(tokenData)
        }

    })

    return (<div>
        {msg}
    </div>)
}

export default Callback;