import React, { Component } from "react";
import "./App.css";
import { type } from "os";

class App extends Component {
  constructor(props) {
    super(props);

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

    this.state = {
      list
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  // Dismiss stuff
  onDismiss(id) {
    const isNotId = item => {
      return item.objectID !== id;
    };
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        {this.state.list.map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author} </span>
            <span>{item.num_comments} comments </span>
            <span>{item.points} points </span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type="button"
              >
                Button
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
