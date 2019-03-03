/* eslint-disable no-unused-vars,no-undef */
import React, { Component } from "react";
import Button from "../Button";
import "./index.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import { sortBy } from "lodash";

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, "title"),
    AUTHOR: list => sortBy(list, "author"),
    COMMENTS: list => sortBy(list, "num_comments").reverse(),
    POINTS: list => sortBy(list, "points").reverse(),
};

/**
 * Sort component
 * (not sure if should be refactored or not)
 */
const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
    const sortClass = classNames("button-inline", {
        "button-active": sortKey === activeSortKey,
    });

    return (
        <Button onClick={() => onSort(sortKey)} className={sortClass}>
            {children}
        </Button>
    );
};

Sort.propTypes = {
    sortKey: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
    children: PropTypes.string,
    activeSortKey: PropTypes.string,
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

/**
 * Table component
 */
class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortKey: "NONE",
            isSortReverse: false,
        };

        this.onSort = this.onSort.bind(this);
    }

    onSort(sortKey) {
        const isSortReverse =
            this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({ sortKey, isSortReverse });
    }

    render() {
        const { list, onDismiss } = this.props;

        const { sortKey, isSortReverse } = this.state;

        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse
            ? sortedList.reverse()
            : sortedList;

        return (
            <div className="table">
                <div className="table-header">
                    <span className="title-header">
                        <Sort
                            sortKey={"TITLE"}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                            Title
                        </Sort>
                    </span>
                    <span className="author-header">
                        <Sort
                            sortKey={"AUTHOR"}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                            Author
                        </Sort>
                    </span>
                    <span className="comments-header">
                        <Sort
                            sortKey={"COMMENTS"}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                            Comments
                        </Sort>
                    </span>
                    <span className="points-header">
                        <Sort
                            sortKey={"POINTS"}
                            onSort={this.onSort}
                            activeSortKey={sortKey}
                        >
                            Points
                        </Sort>
                    </span>
                    <span className="archive-header">Archive</span>
                </div>
                {reverseSortedList.map(item => {
                    return (
                        <div
                            key={item.objectID}
                            className="table-row col-xs-12"
                        >
                            <span style={largeColumn}>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={item.url}
                                >
                                    {item.title}
                                </a>
                            </span>
                            <span style={midColumn}>{item.author}</span>
                            <span style={smallColumn}>{item.num_comments}</span>
                            <span style={smallColumn}>{item.points}</span>
                            <span style={smallColumn}>
                                <Button
                                    onClick={() => onDismiss(item.objectID)}
                                    className="button-inline"
                                >
                                    Dismiss
                                </Button>
                            </span>
                        </div>
                    );
                })}
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
