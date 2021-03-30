import React from "react"

const ACCESS_TOKEN = "accessToken"
const ACCESS_TOKEN_EXPIRES = "accessTokenExpires"
const ACCESS_TOKEN_REFRESH = "accessTokenRefresh"

const LoginContext = React.createContext({
    tokens: {
        accessToken: null,
        accessTokenExpires: null,
        accessTokenRefresh: null
    },
    setTokens: null
})

export { LoginContext, ACCESS_TOKEN, ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_REFRESH }