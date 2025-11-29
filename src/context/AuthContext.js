import React from "react"

const AuthContext = React.createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  isLoading: false,
  setIsLoading: () => {},
})

export default AuthContext
