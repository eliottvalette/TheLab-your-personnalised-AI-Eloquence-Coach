//Laboratoire/src/Navbar.js
import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import '../css/Navbar.css'
import PropTypes from "prop-types";

Pages.propTypes = {
  path: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id:PropTypes.string.isRequired,
  setActiveId: PropTypes.func.isRequired
};
export function Pages({ path, active, id, icon, title, setActiveId }) { 
  return (
    <li className={active} id={id} onClick={() => setActiveId(id)}>
      <Link to={path}>
      <span className="icon">
          <ion-icon name={icon}></ion-icon>
        </span>
        <span className="text">{title}</span>
      </Link>
    </li>
  )
}

export default function Navbar() {
  const [activeId, setActiveId] = useState("page_1");
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = window.location.hash.slice(1);
    if (hash) {
      setActiveId(hash);
    }
  }, [activeId]);
  
  return (
  <header>
      <nav className="navigation">
        <ul>
          <Pages
            path="/home"
            active={activeId === "page_1" ? "list active" : "list"}
            id="page_1"
            icon="home-outline"
            title="Accueil"
            setActiveId={setActiveId}
          />
          <Pages
            path="/models"
            active={activeId === "page_2" ? "list active" : "list"}
            id="page_2"
            icon="flask-outline"
            title="The Lab"
            setActiveId={setActiveId}
          />
          <Pages
            path="/analysis"
            active={activeId === "page_3" ? "list active" : "list"}
            id="page_3"
            icon="megaphone-outline"
            title="Analyse"
            setActiveId={setActiveId}
          />
          <Pages
            path="/account"
            active={activeId === "page_4" ? "list active" : "list"}
            id="page_4"
            icon="person-outline"
            title="Compte"
            setActiveId={setActiveId}
          />
          <Pages
            path="/settings"
            active={activeId === "page_5" ? "list active" : "list"}
            id="page_5"
            icon="settings-outline"
            title="Réglages"
            setActiveId={setActiveId}
          />
          <div className="indicator"></div>
        </ul>
      </nav>
    </header>
  )
}