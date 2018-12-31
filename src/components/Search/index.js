/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./index.css";

/**
 *  Search bar component
 */
const Search = ({ value, onChange, onSubmit, children }) => (
    <div className="search">
        <form className="form form-group" onSubmit={onSubmit}>
            <input
                className="search-bar"
                type="text"
                value={value}
                onChange={onChange}
                autoComplete="on"
            />
            <Button className="search-button" bsStyle="primary" type="submit">
                {children}
            </Button>
        </form>
    </div>
);

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Search;
