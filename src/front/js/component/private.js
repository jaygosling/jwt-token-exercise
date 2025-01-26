import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Private = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.private(sessionStorage.getItem("token"));
    }, [])

    if (store.privilege == true) {
        return (
            <div className="container">
                <h1>Private</h1>
                <div>
                    Welcome to your private page
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <h1>Not authorised</h1>
                <div>
                    Sorry, you don't have access to this page
                </div>
            </div>
        );
    }
};
