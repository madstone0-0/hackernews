/* eslint-disable no-unused-vars,no-undef */
/* eslint-disable no-console */
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import React from "react";
import Search from "./index";

describe("Search", function() {
    it("renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Search onChange={() => {
            console.log("Change");
        }} onSubmit={() => {
            console.log("Submitted");
        }}>Search</Search>, div);
    });

});

test("snapshots", () => {
    const component = renderer.create(
        <Search onChange={() => {
            console.log("Change");
        }} onSubmit={() => {
            console.log("Submitted");
        }}> Search </Search>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});