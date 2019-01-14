import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import {Icon} from 'antd';
// Components
import RegisterForm from './Components/RegisterForm';
import Dashboard from './Components/Dashboard';
import LoginForm from './Components/LoginForm';

//Routes
import ProtectedRoute from './Routes/protectedRoute';

class App extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      isAuthenticated:false
    }
  }

  // Fetch the current logged in user
  componentDidMount() {
    axios.get('http://localhost:5000/user/current-user', { withCredentials: true }).then(({ data }) => {
      if (data.data) {
        this.setState({ username: data.data.username,isAuthenticated:true });
      }
      else {
        this.setState({ username: '' })
      }
    }).catch(() => {
      console.log('Error occured');
    });
  }

  // Keeping track of the isAuthenticated status
  isAuthenticatedCallback = (data) =>{
    this.setState({
      isAuthenticated:data
    })
  }

  render() {
    const {isAuthenticated,username} = this.state
    return (
      <div className="App">
        <BrowserRouter>
          <div>
          <header style={{display:'flex',justifyContent:'space-around'}}>
            <h1>Triny.io</h1>
            <Link to='/register' style={{ textDecoration: 'none' }}><h2>Register</h2></Link>
            <Link to='/login' style={{ textDecoration: 'none' }}><h2>Login</h2> </Link>
            {
              isAuthenticated && <Link to='/dashboard' style={{ textDecoration: 'none' }} ><h2>Dashboard</h2></Link>
            }
            {
              isAuthenticated && <h2><Icon type="user" style={{ color: 'rgba(0,0,0,1)' }} /> {username}</h2>  
            }
          </header>
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" 
                  render={(props) => 
                    <LoginForm {...props} 
                    isAuthed={this.isAuthenticatedCallback} />} 
              />
              <ProtectedRoute path="/dashboard" 
                  component={Dashboard}
                  isAuthed={this.isAuthenticatedCallback} 
                  isAuthenticated={isAuthenticated} 
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
