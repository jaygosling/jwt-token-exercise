import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

import { Context } from "../store/appContext";

export const Signup = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const handleSubmit = function (e) {
        e.preventDefault();
        actions.register(fullName, email, password, confirmPassword);
    }

    return (
        <div className="container">
            <h1>Sign Up</h1>
            <form onSubmit={(e) => {
                handleSubmit(e);
            }}>
                <div className="mb-3">
                    <label for="full-name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="full-name" onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="input-email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="input-email" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="input-password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="input-password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="confirm-password" className="form-label">Confirm password</label>
                    <input type="password" className="form-control" id="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};
