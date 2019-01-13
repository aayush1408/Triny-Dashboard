import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

// Components
import RegisterForm from './Components/RegisterForm';
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
      if (data.data) {
        this.setState({ user: data.data.username });
      }
      else {
        this.setState({ user: 'No User' })
      }
    }).catch(() => {
      console.log('Error occured');
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Triny.io</h1>
          User : {this.state.user}
        </header>
        <BrowserRouter>
          <div>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login </Link>
            <Link to='/dashboard'>Dashboard</Link>
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
