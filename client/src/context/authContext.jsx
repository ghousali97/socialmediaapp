import { createContext, useEffect, useState } from "react";



//this is the specific context that will be refered to by our useContext hook and hence it needs to be exported
export const AuthContext = createContext();


//Context provider contains the details about our context and it's the element that will be used to wrap our application
export const AuthContextProvider = ({ children }) => {

    //use useState hook to create variables we want our context to work with.
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );



    //useEffect hook will be triggered when the elements using our context are loaded.
    useEffect(() => {
        console.log('Use effect called for auth context!');
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = (user) => {
        setUser(user);

    }

    const logout = () => {
        setUser(null);
    }

    return (
        //export the Context.Provider element. Value takes the objects that we want to expose in our application.
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
