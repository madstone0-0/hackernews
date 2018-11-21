/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import axios from "axios";

const DEFAULT_PAGE = 0;
const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = 100;

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";
const TAG = "tags=story";

const stylesheet = StyleSheet.create({
    page: {
        margin: "20px",
    },

    interactions: {
        textAlign: "center",
    },

    table: {
        margin: "20px 0",
    },

    tableHeader: {
        display: "flex",
        lineHeight: "24px",
        fontSize: "16px",
        padding: "0 10px",
        justifyContent: "space-between",
        span: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: "0 5px",
        },
    },

    tableEmpty: {
        margin: "200px",
        textAlign: "center",
        fontSize: "16px",
    },

    tableRow: {
        display: "flex",
        lineHeight: "24px",
        whiteSpace: "nowrap",
        margin: "10px 0",
        padding: "10px",
        background: "#ffffff",
        border: "1px solid #e3e3e3",
        span: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: "0 5px",
        },
    },

    buttonInline: {
        borderWidth: "0",
        background: "transparent",
        color: "inherit",
        textAlign: "inherit",
        webkitFontSmoothing: "inherit",
        padding: "0",
        fontSize: "inherit",
        cursor: "pointer",
    },

    buttonActive: {
        borderRadius: "0",
        borderBottom: "1px solid #38bb6c",
    },
});

class App extends Component {
    constructor(props) {
        super(props);

        // initializes state
        this.state = {
            result: null,
            searchKey: "",
            searchTerm: DEFAULT_QUERY,
            error: null,
        };

        // Declare functions for global use with the this identifier
        this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);
        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    needsToSearchTopstories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    // OnSubmit function for search button enables server side searching
    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        if (this.needsToSearchTopstories(searchTerm)) {
            this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
        }
        event.preventDefault();
    }

    // Set top stories
    setSearchTopstories(result) {
        const { hits, page } = result;
        const { searchKey, results } = this.state;
        const oldHits =
            results && results[searchKey] ? results[searchKey].hits : [];
        const updatedHits = [...oldHits, ...hits];

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page },
            },
        });
    }

    // Fetch the top stories
    fetchSearchTopstories(searchTerm, page = 0) {
        fetch(
            `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${TAG}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`,
        )
            .then(response => response.json())
            .then(result => this.setSearchTopstories(result))
            .catch(error => this.setState({ error }));
    }

    componentDidMount() {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    }

    // Dismiss stories
    onDismiss(id) {
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];
        const isNotID = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotID);
        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page },
            },
        });
    }

    //Search stories
    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { searchTerm, results, searchKey } = this.state;
        const page =
            (results && results[searchKey] && results[searchKey].page) || 0;
        const list =
            (results && results[searchKey] && results[searchKey].hits) || [];
        return (
            <div className={css(stylesheet.page)}>
                <div className={css(stylesheet.interactions)}>
                    {/* Passed values from the App component to the Search an table components */}
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>
                </div>
                <Table list={list} onDismiss={this.onDismiss} />
                <div className={css(stylesheet.interactions)}>
                    <Button
                        onClick={() =>
                            this.fetchSearchTopstories(searchKey, page + 1)
                        }
                    >
                        More
                    </Button>
                </div>
            </div>
        );
    }
}

// Functional stateless component Search to handle the search function
const Search = ({ value, onChange, children, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button type="submit">
            <span className="glyphicon glyphicon-search" /> {children}
        </button>
    </form>
);

const largeColumn = {
    width: "40%",
};
const midColumn = {
    width: "30%",
};
const smallColumn = {
    width: "10%",
};

// Functional stateless component Table to handle the appearance of the table
const Table = ({ list, onDismiss }) => (
    <div className={css(stylesheet.table)}>
        {list.map(item => (
            <div key={item.objectID} className={css(stylesheet.tableRow)}>
                <span style={largeColumn}>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={midColumn}>{item.author}</span>
                <span style={smallColumn}>{item.num_comments} comments</span>
                <span style={smallColumn}>{item.points} points</span>
                <span style={smallColumn}>
                    <Button
                        onClick={() => onDismiss(item.objectID)}
                        className={css(stylesheet.buttonInline)}
                    >
                        Dismiss
                    </Button>
                </span>
            </div>
        ))}
    </div>
);

const Button = ({ onClick, className = "", children }) => (
    <button type="button" onClick={onClick} className={className}>
        {children}
    </button>
);

export default App;
