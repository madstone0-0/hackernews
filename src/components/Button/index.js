/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
    render() {
        const { onClick, className, children } = this.props;
        return (
            <button type="button" onClick={onClick} className={className}>
                {children}
            </button>

        );
    }
}

Button.defaultProps = {
    className: "",
};

export default Button;