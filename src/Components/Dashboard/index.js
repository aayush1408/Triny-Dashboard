import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import List from '../List';
import Header from '../Header';

axios.defaults.withCredentials = true;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      parameters: [],
    }
  }
  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/dashboard',
      withCredentials: true,
      crossdomain: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then((response) => {
      if (Array.isArray(response.data)) {
        this.setState({ parameters: [...response.data] })
      }
    });
  }

  logout = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:5000/logout`).then((res) => {
      console.log(res);
    })
  };

  render() {
    const { parameters } = this.state;
    return (
      <div>
        <Header title="Dashboard" />
        <button onClick={this.logout}><Link to="/login">Logout</Link></button>
        <List parameters={parameters} />
      </div>
    );
  }
}

export default Dashboard;
