import React, { Component } from 'react';
import axios from 'axios';
import List from './Components/List';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      parameters: []
    }
  }
  componentDidMount() {
    axios('http://localhost:5000/get-data').then(({ data }) => {
      this.setState({ parameters: [...data] })
    });
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>Dashboard</h1>
        </header>
        <List parameters={this.state.parameters} />
      </div>
    );
  }
}

export default App;
