import React, { Component } from 'react';
import {Button} from 'antd'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

// Components
import List from '../List';

// Handle axios configurations
axios.defaults.withCredentials = true;

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      parameters: [],
    }
  }

  // Get the dashboard details
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

  // Logout the user on the click
  logout = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:5000/logout`).then((res) => {
      this.props.isAuthed(false);
    })
  };

  render() {
    const { parameters } = this.state;
    return (
      <div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h1 style={{marginLeft:'30px'}}>Dasboard</h1>
        <Button type="primary" style={{marginRight:'30px'}}onClick={this.logout}><Link to="/login">Logout</Link></Button>
        </div>
        <List parameters={parameters} />
      </div>
    );
  }
}

export default Dashboard;
