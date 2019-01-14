import React, { Component } from 'react';
import {Button} from 'antd'; 
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
      url: 'https://webhooks12.herokuapp.com/dashboard',
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
    axios.get(`https://webhooks12.herokuapp.com/logout`).then((res) => {
      this.props.history.push('/login');   
      this.props.isAuthed(false);
    })
    .catch(()=>{
      alert('Unable to Logout');
    });
  };

  render() {
    const { parameters } = this.state;
    return (
      <div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <h1 style={{margin:'30px'}}>Dasboard</h1>
        <Button type="primary" style={{margin:'35px'}}onClick={this.logout}>Logout</Button>
        </div>
        <List parameters={parameters} />
      </div>
    );
  }
}

export default Dashboard;