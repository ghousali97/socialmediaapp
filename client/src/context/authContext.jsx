import { createContext, useEffect, useState } from "react";
import axios from "../axios";


//this is the specific context that will be refered to by our useContext hook and hence it needs to be exported
export const AuthContext = createContext();


//Context provider contains the details about our context and it's the element that will be used to wrap our application
export const AuthContextProvider = ({ children }) => {
    const inactivityTimeout = 10000;

    //use useState hook to create variables we want our context to work with.
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    const [tokenExpiry, setTokenExpiry] = useState(
        JSON.parse(localStorage.getItem('tokenExpiry')) || null
    );
    const [inactivityExpiry, setInactivityExpiry] = useState(
        JSON.parse(localStorage.getItem('inactivityExpiry')) || null
    );


    const parseJwt = (token) => {
        console.log(token);
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            console.log(e);
            return null;
        }
    };


    //useEffect hook will be triggered when the application first loads and when dependencies are modified
    // using our context are loaded.
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('tokenExpiry', JSON.stringify(tokenExpiry));
    }, [tokenExpiry]);

    useEffect(() => {
        localStorage.setItem('inactivityExpiry', JSON.stringify(inactivityExpiry));
    }, [inactivityExpiry]);

    const login = async (inputs) => {
        const res = await axios.post("/auth/login", inputs, { withCredentials: true, credentials: 'include' });
        if (res.status === 200) {
            setUser(res.data.user);
            setTokenExpiry(parseJwt(res.data.accessToken.token).exp);
            setInactivityExpiry(Date.now() + inactivityTimeout);
        }

    };


    const logout = () => {
        setUser(null);
        setTokenExpiry(null);
        setInactivityExpiry(null);

    }

    return (
        //export the Context.Provider element. Value takes the objects that we want to expose in our application.
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
