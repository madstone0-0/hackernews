/* eslint-disable no-unused-vars */
import loading from "./img/loading.gif";
import { Component } from "react";
import React from "react";

class Loading extends Component {
    render() {
        return (
            <div>
                <img alt="Loading..." src={loading} />
            </div>
        );
    }
}

export default Loading;
