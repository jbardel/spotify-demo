import React from "react"

const LoginContext = React.createContext({
    tokens: {
        accessToken: null,
        accessTokenExpires: null,
        accessRefreshKey: null
    },
    setTokens: null
})

export default LoginContext