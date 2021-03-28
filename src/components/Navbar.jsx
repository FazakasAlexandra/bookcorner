import React, { useReducer, useEffect, useState } from "react";
import {
    Link,
} from "react-router-dom";


export default function Navbar(props) {
    const [isOn, setMenu] = useState(true)
    return (
        <nav className="navbar">
            <img src="../../assets/logo.svg" alt="" className="navbar-logo" />
            <ul>
                <li>
                    {props.isAuth ?
                        <>
                            <a style={{ color: "#FF6739" }} onClick={() => setMenu(!isOn)}>Account</a>
                            <div className="account-menu" style={isOn ? { display: 'flex' } : { display: 'none' }}>
                                <Link to="/Account/Books">My books</Link>
                                <Link to="/Account/Post">Post book</Link>
                                <a onClick={() => props.logout()}>Sign out</a>
                            </div>
                        </> :
                        <Link to="/signIn" style={{ color: "#FF6739" }}>Sign in</Link>}

                </li>
                <li>
                    <Link to="/Browse">Browse</Link>
                </li>
                <li>
                    <Link to="/About">About</Link>
                </li>
            </ul>
        </nav>
    )
}