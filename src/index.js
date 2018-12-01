/* eslint-disable no-unused-vars */
import "bootstrap/dist/css/bootstrap.min.css";
import Popper from "popper.js";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.min";
import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "../src/components/App/index";

render(<App />, document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}

