/* eslint-disable no-unused-vars,no-undef */
import ReactDOM from "react-dom";
import { shallow } from "enzyme/build";
import renderer from "react-test-renderer";
import React from "react";
import Table from "./index";
import Adadpter from "enzyme-adapter-react-16";
import * as Enzyme from "enzyme";

const props = {
    list: [
        { title: "1", author: "1", num_comments: 1, points: 2, objectID: "y" },
        { title: "2", author: "2", num_comments: 1, points: 2, objectID: "z" },
    ],
    sortKey: "TITLE",
    isSortReverse: false,
};

describe("Table", () => {

    it("renders", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Table {...props}/>, div);
    });

    Enzyme.configure({ adapter: new Adadpter() });

    it("shows two items in a list", () => {
        const element = shallow(
            <Table {...props} />,
        );

        expect(element.find(".table-row").length).toBe(2);
    });
});

test("snapshots", () => {
    const component = renderer.create(
        <Table {...props}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});