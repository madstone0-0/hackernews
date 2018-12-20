/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
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

Header.propTypes = {
    toggleDarkTheme: PropTypes.func.isRequired,
};

export default Header;
