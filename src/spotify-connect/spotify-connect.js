import pkceChallenge from "pkce-challenge";
import queryString from "querystring";
import axios from "axios";
import { v4 as uuid } from 'uuid';

const CLIENT_ID = "09496c9d036e4d3d92c47123451660b3";

const SPOTIFY_CONNECT_URL = "https://accounts.spotify.com/authorize?"
const SPOTIFY_EXCHANGE_TOKEN_URL = "https://accounts.spotify.com/api/token"
const REDIRECT_URI = "http://localhost:3000/callback"

const CODE_VERIFIER_KEY = 'code_verifier'
const STATE_KEY = 'auth_state'

const ACCESS_TOKEN_KEY = "access_token_key"
const ACCESS_TOKEN_EXPIRES_KEY = "access_token_expires_key"
const ACCESS_TOKEN_REFRESH_KEY = "access_token_refresh_key"

function getAuthorizationURI() {
    //Add state
    const { code_challenge, code_verifier } = pkceChallenge()
    const state = uuid()

    localStorage.setItem(CODE_VERIFIER_KEY, code_verifier)
    localStorage.setItem(STATE_KEY, state)

    console.log("code_verifier", code_verifier)

    return SPOTIFY_CONNECT_URL + queryString.stringify({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        code_challenge_method: "S256",
        code_challenge: code_challenge,
        state
    });
}

async function genToken(state, code) {

    const code_verifier = localStorage.getItem(CODE_VERIFIER_KEY)
    const savedState = localStorage.getItem(STATE_KEY)

    localStorage.removeItem(STATE_KEY)
    if (state !== savedState) {
        return { error: true }
    }

    const params = {
        client_id: CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: code_verifier,
        state
    };

    const postConfig = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    };

    try {
        const response = await axios.post(
            SPOTIFY_EXCHANGE_TOKEN_URL,
            queryString.stringify(params), postConfig
        )
        console.log(response.data)
        return response.data;
    } catch (err) {
        return { error: true }
    }
}

function saveToken(tokenData){
    const {access_token, expires_in, refresh_token} = tokenData

    localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
    localStorage.setItem(ACCESS_TOKEN_EXPIRES_KEY, expires_in)
    localStorage.setItem(ACCESS_TOKEN_REFRESH_KEY, refresh_token)
}

function isConnected(){
    return localStorage.getItem(ACCESS_TOKEN_KEY) != null
}

export { getAuthorizationURI, genToken, saveToken, isConnected,ACCESS_TOKEN_KEY };