import React, { Component } from 'react';
import axios from 'axios';
import List from '../List';
import Header from '../Header';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      parameters: []
    }
  }
  componentDidMount() {
    axios('http://localhost:5000/dashboard').then(({ data }) => {
      this.setState({ parameters: [...data] })
    });
  }
  render() {
    return (
      <div>
        <Header title="Dashboard" />
        <List parameters={this.state.parameters} />
      </div>
    );
  }
}

export default Dashboard;
