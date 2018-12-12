/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./index.css";

// Search Component
class Search extends Component {
    render() {
        const { value, onChange, onSubmit, children } = this.props;
        return (
            <div className="search">
                <form onSubmit={onSubmit}>
                    <input type="text" value={value} onChange={onChange} />
                    <Button bsStyle="primary" type="submit">
                        {children}
                    </Button>
                </form>
            </div>
        );
    }
}

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default Search;
