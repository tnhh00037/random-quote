import React, { Component } from "react";
import "./App.css";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
//redux:
const Quote = [
  {
    content: "Don't cry because it's over, smile because it happened.",
    author: "Dr. Seuss",
    popColor: "#",
    bgColor: "#43516C"
  },
  {
    content:
      "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. ",
    author: "Marilyn Monroe",
    popColor: "#",
    bgColor: "#CFF09E"
  },
  {
    content: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    popColor: "#",
    bgColor: "#A8DBA8"
  },
  {
    content:
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    author: "Albert Einstein",
    popColor: "#",
    bgColor: "#79BD9A"
  },
  {
    content: "So many books, so little time.",
    author: "Frank Zappa",
    popColor: "#",
    bgColor: "#3B8686"
  }
];
//redux

const CHANGE = "CHANGE";

const changeState = (message, color, author) => {
  return {
    type: CHANGE,
    message: message,
    color: color,
    author: author
  };
};
const defaultState = [
  Quote[0]["content"],
  Quote[0]["bgColor"],
  Quote[0]["author"]
];

const messageReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE:
      return [action.message, action.color, action.author];
    default:
      return state;
  }
};
const store = createStore(messageReducer);

//react
class Abc extends Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }
  update() {
    //after is an object {}
    let after = Quote[Math.floor(Math.random() * 5)];

    //make sure different content
    while (after["content"] == this.props.messages) {
      after = Quote[Math.floor(Math.random() * 5)];
    }

    this.props.updateContent(
      after["content"],
      after["bgColor"],
      after["author"]
    );
  }
  render() {
    return (
      <div className="App" style={{ background: this.props.colors }}>
        <div className="content" id="quote-box">
          <p id="text" style={{ color: this.props.colors }}>
            <i class="fas fa-quote-left" style={{ marginRight: 5 }} />
            {this.props.messages}
          </p>
          <p id="author">- {this.props.authors} -</p>
          <a
            style={{ background: this.props.colors }}
            className="btn"
            id="tweet-quote"
            href="http://twitter.com/intent/tweet"
            target="__blank"
          >
            <i class="fab fa-twitter" />
          </a>
          <button
            id="new-quote"
            className="btn btn-block"
            onClick={this.update}
            style={{ background: this.props.colors }}
          >
            New quote
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { messages: state[0], colors: state[1], authors: state[2] };
};
const mapDispatchToProps = dispatch => {
  return {
    updateContent: (message, color, author) => {
      dispatch(changeState(message, color, author));
    }
  };
};
const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Abc);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}
export default App;
