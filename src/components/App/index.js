/* eslint-disable no-unused-vars,no-console */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { sortBy } from "lodash";
import "./index.css";
import {
    DEFAULT_HPP,
    DEFAULT_PAGE,
    DEFAULT_QUERY,
    PARAM_HPP,
    PARAM_PAGE,
    PARAM_SEARCH,
    PATH_BASE,
    PATH_SEARCH,
    TAG,
} from "../constants";
import Table from "../Table";
import Search from "../Search";
import ButtonWithLoading from "../ButtonWithLoading";

class App extends Component {
    constructor(props) {
        super(props);

        // initializes state
        this.state = {
            result: null,
            searchKey: "",
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
        };

        // Bound functions
        this.needsToSearchTopstories = this.needsToSearchTopstories.bind(this);
        this.setSearchTopstories = this.setSearchTopstories.bind(this);
        this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        // this.updateSearchTopstoriesState = this.updateSearchTopstoriesState.bind(
        //     this,
        // );
    }

    /* TODO fix this */
    // updateSearchTopstoriesState(hits, page) {
    //     return prevState => {
    //         const { searchKey, results } = prevState;

    //         const oldHits =
    //             results && results[searchKey] ? results[searchKey].hits : [];

    //         const updatedHits = {
    //             ...oldHits,
    //             ...hits,
    //         };

    //         return {
    //             results: {
    //                 ...results,
    //                 [searchKey]: { hits: updatedHits, page },
    //             },
    //             isLoading: false,
    //         };
    //     };
    // }

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
                [searchKey]: { hits: updatedHits, page },
            },
            isLoading: false,
        });
    }

    // Fetch the top stories
    fetchSearchTopstories(searchTerm, page = 0) {
        this.setState({ isLoading: true });
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
                results,
                [searchKey]: { hits: updatedHits, page },
            },
        });
    }

    //Search stories
    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { searchTerm, results, searchKey, isLoading, error } = this.state;
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
                {error ? (
                    <div className="interactions">
                        <p>Something went wrong</p>
                    </div>
                ) : (
                    <Table list={list} onDismiss={this.onDismiss} />
                )}
                <div className="interactions">
                    <ButtonWithLoading
                        isLoading={isLoading}
                        onClick={() =>
                            this.fetchSearchTopstories(searchKey, page + 1)
                        }
                    >
                        More
                    </ButtonWithLoading>
                </div>
            </div>
        );
    }
}

export default App;
