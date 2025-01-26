import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /*     const handleSubmit = function (e) {
            e.preventDefault();
            axios.post("https://jubilant-meme-q5ppx9vrvr5c99qr-3001.app.github.dev/api/login", {
                "email": email,
                "password": password
            })
                .then((res) => {
                    console.log(res);
                    if (res.status = 'success') {
                        alert("Usuario logueado con éxito");
    
                        navigate('/private');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
     */
    const handleSubmit = async function (e) {
        e.preventDefault();
        actions.login(email, password);
    }

    return (
        <div className="container">
            <h1>Log In</h1>
            <form onSubmit={(e) => {
                handleSubmit(e);
            }}>
                <div className="mb-3">
                    <label for="input-email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="input-email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="input-password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="input-password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
        </div>
    );
};
