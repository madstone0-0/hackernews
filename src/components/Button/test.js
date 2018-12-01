/* eslint-disable no-unused-vars,no-undef */
/* eslint-disable no-console */
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import React from "react";
import Button from "./index";

describe("Button", () => {
    it("renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Button onClick={() => {
            console.log("Clicked");
        }}>Give me more daddy</Button>, div);
    });
});

test("snapshots", () => {
    const component = renderer.create(
        <Button onClick={() => {
            console.log("Clicked");
        }}>Give me more daddy</Button>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});