/* eslint-disable no-unused-vars,no-undef */
/* eslint-disable no-console */
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import React from "react";
import Header from "./index";

describe("Header", () => {
    it("renders", function() {
        const div = document.createElement("div");
        ReactDOM.render(<Header toggleDarkTheme={() => {
            console.log("toggles");
        }}/>, div);
    });
});

test("snapshots", () => {
    const component = renderer.create(
        <Header toggleDarkTheme={() => {
            console.log("toggled");
        }}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});