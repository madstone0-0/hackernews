/* eslint-disable no-unused-vars */
import Popper from "popper.js";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "../src/components/App/index";

render(<App />, document.getElementById("root"));

if (module.hot) {
    module.hot.accept();
}
