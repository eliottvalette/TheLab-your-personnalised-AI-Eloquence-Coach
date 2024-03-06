// Laboratoire/src/Account.jsx 
import React, {useState , useEffect} from "react";
import '../css/settings.css'
import useLocalStorage from "use-local-storage"

export default function Settings(){
    const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode",true);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
      };
    
    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode ? "var(--wall-background-color)" : "var(--light-box-background-color)"; // Use CSS variables for customization
    }, [isDarkMode]);

    return(
        <main className="settings-main" id="settings-main" data-theme={isDarkMode ? "dark" : "light"}>
            <h1 className="settings-h1"> Settings </h1>
            <button className="settings-btn" onClick={toggleDarkMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>   
        </main>
        )
}