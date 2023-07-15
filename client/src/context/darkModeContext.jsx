import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const DarkModeContext = createContext();


//context provider will simply be a component that will wrap our entire application.

export const DarkModeContextProvider = ({ children }) => {
    //we need to store dark mode in useState hook to that dependend components can re-render based on changes

    const [darkMode, setDarkMode] = useState(
        //getItem returns are string so we need to parse it into JSON
        JSON.parse(localStorage.getItem("darkMode")) || false

    );

    //use useEffect to set localStoreage in darkMode whenever the application is loaded or darkMode variable modified.
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);


    //Our theme toggle approach mutates the DOM instead of JS variables and thus preferably uses useLayoutEffect hook over useEffect hook.
    useLayoutEffect(() => {

        if (darkMode) {
            //document element returns the root element of the document and set the mode class. Since the global variables are 
            //defined in light-mode and dark-mode objects in css they will only be accessed then.
            document.documentElement.classList.remove("light-mode");
            document.documentElement.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
            document.documentElement.classList.add("light-mode");

        }
    }, [darkMode]);

    const toggle = () => {
        setDarkMode(!darkMode);
    }

    //return context.Provider from the module, the value should be elements that you want to expose in other components.
    //Components can access these using useContext hooks.

    return (
        <DarkModeContext.Provider value={{ darkMode, toggle }
        }>{children}</DarkModeContext.Provider>
    )
}
