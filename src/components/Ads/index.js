/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import AdSense from "react-adsense";

class Ads extends Component {
    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (
            <div class="ad">
                <AdSense.Google
                    client="ca-pub-1454292768438166"
                    slot="7806394673"
                    style={{ display: "block" }}
                    format="auto"
                    responsive="true"
                />
            </div>
        );
    }
}

export default Ads;
