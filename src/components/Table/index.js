/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { sortBy } from "lodash";
import Button from "../Button";
import "./index.css";
import PropTypes from "prop-types";

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, "title"),
    AUTHOR: list => sortBy(list, "author"),
    COMMENTS: list => sortBy(list, "num_comments").reverse(),
    POINTS: list => sortBy(list, "points").reverse(),
};

// TODO import classnames and improve this
const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
    const sortClass = ["button-inline"];

    if (sortKey === activeSortKey) {
        sortClass.push("button-active");
    }

    return (
        <Button onClick={() => onSort(sortKey)} className={sortClass.join(" ")}>
            {" "}
            {children}{" "}
        </Button>
    );
};

const largeColumn = {
    width: "40%",
};
const midColumn = {
    width: "30%",
};
const smallColumn = {
    width: "10%",
};

// Table component
class Table extends Component {
    render() {
        const { list, onDismiss, onSort, sortKey, isSortReverse } = this.props;
        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList;

        return (
            <div className="table">
                <div className="table-header">
                    <span style={{ width: "40%" }}>
                        <Sort sortKey={"TITLE"} onSort={onSort} activeSortKey={sortKey}>
              Title
                        </Sort>
                    </span>
                    <span style={{ width: "30%" }}>
                        <Sort sortKey={"AUTHOR"} onSort={onSort} activeSortKey={sortKey}>
              Author
                        </Sort>
                    </span>
                    <span style={{ width: "10%" }}>
                        <Sort sortKey={"COMMENTS"} onSort={onSort} activeSortKey={sortKey}>
              Comments
                        </Sort>
                    </span>
                    <span style={{ width: "10%" }}>
                        <Sort sortKey={"POINTS"} onSort={onSort} activeSortKey={sortKey}>
              Points
                        </Sort>
                    </span>
                    <span style={{ width: "10%" }}>Archive</span>
                </div>
                {reverseSortedList.map(item => (
                    <div key={item.objectID} className="table-row row">
                        <span style={largeColumn} className="col-md-12">
                            <a href={item.url} className="col-md-12">{item.title}</a>
                        </span>
                        <span style={midColumn} className="col-md-12">{item.author}</span>
                        <span style={smallColumn} className="col-md-12">{item.num_comments} comments</span>
                        <span style={smallColumn} className="col-md-12">{item.points} points</span>
                        <span style={smallColumn} className="col-md-12">
                            <Button
                                onClick={() => onDismiss(item.objectID)}
                                className="button-inline"
                            >
                Dismiss
                            </Button>
                        </span>
                    </div>
                ))}
            </div>
        );
    }
}

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number,
        }),
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
};

export default Table;