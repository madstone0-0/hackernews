/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";

const DEFAULT_PAGE = 0;
const DEFAULT_QUERY = "redux";
const DEFAULT_HPP = 100;

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const PARAM_HPP = "hitsPerPage=";
const TAG = "tags=story";


class App extends Component {
    constructor(props) {
        super(props);

        // initializes state
        this.state = {
            result: null,
            searchKey: "",
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false
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
                results,
                [searchKey]: { hits: updatedHits, page }
            },
            isLoading: false
        });
    }

    // Fetch the top stories
    fetchSearchTopstories(searchTerm, page = 0) {
        this.setState({ isLoading: true });
        fetch(
            `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${TAG}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
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
                results,
                [searchKey]: { hits: updatedHits, page }
            }
        });
    }

    //Search stories
    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { searchTerm, results, searchKey, isLoading } = this.state;
        const page =
            (results && results[searchKey] && results[searchKey].page) || 0;
        const list =
            (results && results[searchKey] && results[searchKey].hits) || [];
        return (
            <div className="page">
                <div className="interactions">
                    {/* Passed values from the App component to the Search an table components */}
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>
                </div>
                <Table list={list} onDismiss={this.onDismiss}/>
                <div className="interactions">
                    {
                        isLoading
                            ? <Loading/>
                            : <Button
                                onClick={() =>
                                    this.fetchSearchTopstories(searchKey, page + 1)
                                }
                            >
                                More
                            </Button>
                    }
                </div>
            </div>
        );
    }
}

// Search Component
class Search extends Component {
    componentDidMount() {
        this.input.focus();
    }

    render() {
        const { value, onChange, onSubmit, children } = this.props;
        return (
            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={onChange} ref={(node) => {
                    this.input = node;
                }}/>
                <button type="submit">
                    <span className="glyphicon glyphicon-search"/> {children}
                </button>
            </form>
        );
    }
}

const largeColumn = {
    width: "40%"
};
const midColumn = {
    width: "30%"
};
const smallColumn = {
    width: "10%"
};

// Table component
class Table extends Component {
    render() {
        const { list, onDismiss } = this.props;
        return (
            <div className="table">
                {list.map(item => (
                    <div key={item.objectID} className="table-row">
                        <span style={largeColumn}>
                            <a href={item.url}>{item.title}</a>
                        </span>
                        <span style={midColumn}>{item.author}</span>
                        <span style={smallColumn}>{item.num_comments} comments</span>
                        <span style={smallColumn}>{item.points} points</span>
                        <span style={smallColumn}>
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

class Button extends Component {
    render() {
        const { onClick, className, children } = this.props;
        return (
            <button type="button" onClick={onClick} className={className}>
                {children}
            </button>
        );
    }
}

class Loading extends Component {
    render() {
        return (
            <div>
                Loading...
            </div>
        );
    }
}

Button.defaultProps = {
    className: ""
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired
};

Table.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired
};

Search.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired
};
export default App;
export {
    Search,
    Button,
    Table
};