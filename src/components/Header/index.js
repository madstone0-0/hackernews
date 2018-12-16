/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Button from "../Button";
import "./index.css";

const Header = ({ toggleDarkTheme }) => {
    return (
        <header>
            <div className="text-center card-header">
                <h1>
                    HN Client
                    <small> The hacker news client</small>
                    <Button
                        onClick={toggleDarkTheme}
                        className=" dark-button text-bottom float-right btn btn-sm btn-primary"
                    >
                        Dark Theme
                    </Button>
                </h1>
            </div>
        </header>
    );
};

export default Header;
