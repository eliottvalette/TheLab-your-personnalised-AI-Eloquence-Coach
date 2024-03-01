// Laboratoire/src/Account.jsx 
import React, { useState } from "react";
import {Link} from "react-router-dom"
import '../css/Account.css'

export default function Account(){
    return(
        <main className="account-main-login">
            <h1 className="account-h1">Mon compte</h1>
            <form className="account-form-login" id="account-form-login">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Votre email" />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" placeholder="Votre mot de passe"/>
                <button className="home-submit" id="home-submit">Se connecter</button>
                {/* <p className="home-p-login">
                    Mot de passe oublié ? {" "}
                    <Link to="/reset-password">Cliquez ici</Link>
                </p> */}
            </form>
        </main>
        )
}