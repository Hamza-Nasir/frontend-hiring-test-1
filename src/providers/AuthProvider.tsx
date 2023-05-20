import { useState, useEffect, createContext, useReducer, FC, ReactNode } from "react";
import { AuthResponseType } from '../types/types';
import AuthContext from "../contexts/AuthContext"

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthResponseType["user"] | null>(null);
    const [token, setToken] = useState<AuthResponseType["access_token"] | null>(null);

    

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            // console.log("Token: ", storedToken);
            setToken(storedToken);
        } else {
            // console.log("No token found");
        }

    }, [])
  
    const setAuthData = (data: AuthResponseType) => {
        setUser(data.user);
        setToken(data.access_token);
        sessionStorage.setItem("token", data.access_token);
    };
  
    const clearAuthData = () => {
      setUser(null);
      setToken(null);
      sessionStorage.clear();
    };
  
    return (
        <AuthContext.Provider value={{ user, token, setAuthData, clearAuthData }}>
            {children}
        </AuthContext.Provider>
    );
  };

export default AuthProvider;