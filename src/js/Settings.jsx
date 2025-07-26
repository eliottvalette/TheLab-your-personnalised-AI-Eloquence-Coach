// Laboratoire/src/Account.jsx 
import React, {useState , useEffect} from "react";
import '../css/settings.css'
import useLocalStorage from "use-local-storage"

export default function Settings(){
    const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", true);

    useEffect(() => {
        document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
      };

    return(
        <main className="settings-main" id="settings-main" data-theme={isDarkMode ? "dark" : "light"}>
            <h1 className="settings-h1">Paramètres</h1>
            <button className="settings-btn" onClick={toggleDarkMode}>
                {isDarkMode ? 'Mode Clair' : 'Mode Sombre'}
            </button>   
        </main>
        )
}