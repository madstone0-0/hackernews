import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

/* 
*  Checks whether the term being searched is similar to any
*  titles.
*/
function isSearched(searchTerm) {
  return function(item) {
    return (
      !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase())
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

    // Contains table information
    const list = [
      {
        title: "React ",
        url: "https://facebook.github.io/react/",
        author: "Jordan Walke",
        num_comments: 3,
        points: 4,
        objectID: 0
      },
      {
        title: "Redux ",
        url: "https://github.com/reactjs/redux",
        author: "Dan Abramov, Andrew Clark",
        num_comments: 2,
        points: 5,
        objectID: 1
      }
    ];

    // Sets state
    this.state = {
      list,
      searchTerm: ""
    };

    // Declare functions for global use with the this identifier
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  // Dismiss stuff
  onDismiss(id) {
    const isNotId = item => {
      return item.objectID !== id;
    };
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  //Search stuff
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className={css(stylesheet.page)}>
        <div className={css(stylesheet.interactions)}>
          {/* Passed values form the App component to the Search an table components */}
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

// Functional stateless component Search to handle the search function
const Search = ({ value, onChange, children }) => {
  // do something

  return (
    <form>
      {children}
      <input type="text" onChange={onChange} value={value} />
    </form>
  );
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

// Functional stateless component Table to handle the appearnce of the table
const Table = ({ list, pattern, onDismiss }) => {
  return (
    <div className={css(stylesheet.table)}>
      {list.filter(isSearched(pattern)).map(item => (
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
};

const Button = ({ onClick, className = "", children }) => {
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default App;
