

import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"

const AuthContext = createContext()

export { AuthContext }
  
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    return true
  }
  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    if (users.find((u) => u.email === userData.email)) {
      toast.error("User already exists!")
      return false
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const userWithoutPassword = { ...newUser }
    delete userWithoutPassword.password
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))

    toast.success("Registration successful!")
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast.success("Logged out successfully!")
  }

  const forgotPassword = (email) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u) => u.email === email)

    if (user) {
      toast.success("Password reset link sent to your email!")
      return true
    } else {
      toast.error("Email not found!")
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
