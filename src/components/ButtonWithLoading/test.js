/* eslint-disable no-unused-vars,no-undef,no-console */
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import React from "react";
import ButtonWithLoading from "./index";

describe("ButtonWithLoading", () => {
    it("renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<ButtonWithLoading onClick={() => {
            console.log("Clicked");
        }}>Loading Button</ButtonWithLoading>, div);

    });
});

test("snapshots", () => {
    const component = renderer.create(
        <ButtonWithLoading onClick={() => {
            console.log("Clicked");
        }}> Button </ButtonWithLoading>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});