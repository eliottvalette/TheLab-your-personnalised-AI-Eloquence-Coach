//Laboratoire/src/Navbar.js
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom"

import '../css/Navbar.css'

import PropTypes from "prop-types";


Pages.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export function Pages({ path, icon, title }) {
  return (
    <li className="nav-item">
      <NavLink to={path} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
        <span className="icon">
          <ion-icon name={icon}></ion-icon>
        </span>
        <span className="text">{title}</span>
      </NavLink>
    </li>
  )
}

export default function Navbar() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
  <header className="nav-header">
      <nav className="navigation">
        <ul>
          <Pages
            path="/home"
            icon="home-outline"
            title="Accueil"
          />
          <Pages
            path="/models"
            icon="flask-outline"
            title="Le Lab"
          />
          <Pages
            path="/analysis"
            icon="megaphone-outline"
            title="Analyse"
          />
          <Pages
            path="/account"
            icon="person-outline"
            title="Compte"
          />
        </ul>
      </nav>
    </header>
  )
}
