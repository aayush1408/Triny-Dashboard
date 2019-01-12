import React, { Component } from 'react';
import axios from 'axios';
import RegisterForm from './Components/RegisterForm';
import './App.css';
import Dashboard from './Components/Dashboard';
import LoginForm from './Components/LoginForm';
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: ''
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/user/current-user', { withCredentials: true }).then(({ data }) => {
      console.log(data);
    }).catch(() => {
      console.log('Error occured');
    })
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Triny.io</h1>
        </header>
        {
          user ||
          <div>
            <LoginForm />
          </div>
        }

      </div>
    );
  }
}

export default App;
