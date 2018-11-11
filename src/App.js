/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";

/*
 *  Checks whether the term being searched is similar to any
 *  titles.
 */
function isSearched(searchTerm) {
    return function(item) {
        return (
            !searchTerm ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };
}

const stylesheet = StyleSheet.create({
    page: {
        margin: "20px"
    },

    interactions: {
        textAlign: "center"
    },

    table: {
        margin: "20px 0"
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
            padding: "0 5px"
        }
    },

    tableEmpty: {
        margin: "200px",
        textAlign: "center",
        fontSize: "16px"
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
            padding: "0 5px"
        }
    },

    buttonInline: {
        borderWidth: "0",
        background: "transparent",
        color: "inherit",
        textAlign: "inherit",
        webkitFontSmoothing: "inherit",
        padding: "0",
        fontSize: "inherit",
        cursor: "pointer"
    },

    buttonActive: {
        borderRadius: "0",
        borderBottom: "1px solid #38bb6c"
    }
});

class App extends Component {
    constructor(props) {
        super(props);

        // Sets state
        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY
        };

        // Declare functions for global use with the this identifier
        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);
        event.preventDeafult();
    }

    // Set top stories
    setSearchTopstories(result) {
        this.setState({ result });
    }

    // Fetch the top stories
    fetchSearchTopStories(searchTerm) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
            .then(response => response.json())
            .then(result => this.setSearchTopstories(result));
    }

    // Dismiss stuff
    onDismiss(id) {
        const isNotID = item => item.objectID !== id;
        const updatedHits = this.state.result.hits.filter(isNotID);
        this.setState({
            result: (this.state.result, { hits: updatedHits })
        });
    }

    //Search stuff
    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { searchTerm, result } = this.state;
        if (!result) {
            return null;
        }
        return (
            <div className={css(stylesheet.page)}>
                <div className={css(stylesheet.interactions)}>
                    {/* Passed values form the App component to the Search an table components */}
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>
                </div>
                {result && (
                    <Table list={result.hits} Dismiss={this.onDismiss} />
                )}
            </div>
        );
    }

    componentDidMount() {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm);
    }
}

// Functional stateless component Search to handle the search function
const Search = ({ value, onChange, children, onSubmit }) => {
    <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button type="submit">{children}</button>
    </form>;
};

const largeColumn = {
    width: "40%"
};
const midColumn = {
    width: "30%"
};
const smallColumn = {
    width: "10%"
};

// Functional stateless component Table to handle the appearance of the table
const Table = ({ list, onDismiss }) => {
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
    </div>;
};

const Button = ({ onClick, className = "", children }) => {
    <button type="button" onClick={onClick} className={className}>
        {children}
    </button>;
};

export default App;
