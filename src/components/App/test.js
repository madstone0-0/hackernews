/* eslint-disable no-unused-vars,no-undef */
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import React from "react";
import App from "./index";

describe("App", function() {
    it("renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App/>, div);
    });

});

test("snapshots", () => {
    const component = renderer.create(<App/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
