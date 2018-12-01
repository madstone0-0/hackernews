// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import PropTypes from "prop-types";

// Search Component
class Search extends Component {
    render() {
        const { value, onChange, onSubmit, children } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                />
                <button type="submit" className="btn btn-info">
                    <span className="glyphicon glyphicon-search"/> {children}
                </button>
            </form>
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