/* eslint-disable no-unused-vars */
import Loading from "../Loading";
import Button from "../Button";
import React from "react";
import PropTypes from "prop-types";
/**
 * Used to render a button or loading animation
 * depending on the condition
 */
const withLoading = Component => ({ isLoading, ...rest }) =>
    isLoading ? <Loading /> : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading;

ButtonWithLoading.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
