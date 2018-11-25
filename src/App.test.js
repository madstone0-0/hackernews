/* eslint-disable no-undef,no-console */
/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App from "./App.js";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Search, Button, Table } from "./App.js";
import * as Enzyme from "enzyme";

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
        }}> Search </Search>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

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
        }}>Give me more daddy</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

const props = {
    list: [
        { title: "1", author: "1", num_comments: 1, points: 2, objectID: "y" },
        { title: "2", author: "2", num_comments: 1, points: 2, objectID: "z" }
    ]
};

describe("Table", () => {

    it("renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Table {...props}/>, div);
    });

    Enzyme.configure({ adapter: new Adapter() });

    it("shows two items in a list", () => {
        const element = shallow(
            <Table {...props} />
        );

        expect(element.find(".table-row").length).toBe(2);
    });
});

test("snapshots", () => {
    const component = renderer.create(
        <Table {...props}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});





