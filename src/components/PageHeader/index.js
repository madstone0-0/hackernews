/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import "./index.css";
import { Header } from "semantic-ui-react";
/**
 * Renders app title and dark theme button
 */
const PageHeader = ({ toggleDarkTheme }) => {
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

PageHeader.propTypes = {
	toggleDarkTheme: PropTypes.func.isRequired,
};

export default PageHeader;
