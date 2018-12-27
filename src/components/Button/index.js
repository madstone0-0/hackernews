/* eslint-disable no-unused-vars */
import React from "react";

/**
 * Button component for rendering buttons
 */
const Button = props => {
    const { onClick, className, children } = props;
    return (
        <button type="button" onClick={onClick} className={className}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    className: "",
};

export default Button;
