import React, { Component } from 'react';
import {  HashRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import {Icon,Menu} from 'antd';
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
    axios.get('https://webhooks12.herokuapp.com/user/current-user', { withCredentials: true }).then(({ data }) => {
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
  isAuthenticatedCallback = (isLogged,data='') =>{
    this.setState({
      isAuthenticated:isLogged,
      username:data
    })
  }

  render() {
    const {isAuthenticated,username} = this.state
    return (
      <div className="App">
        <HashRouter>
          <div>
          <Menu mode="horizontal">
            <Menu.Item disabled={true}>
              <h1>Triny.io</h1>
            </Menu.Item>
            <Menu.Item>
              <Link to='/register' style={{ textDecoration: 'none' }}><h2>Register</h2></Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/login' style={{ textDecoration: 'none' }}><h2>Login</h2> </Link>
            </Menu.Item>
            {
              isAuthenticated && <Menu.Item disabled={true} style={{float: 'right'}}><h2><Icon type="user" style={{ color: 'rgba(0,0,0,1)' }} /> {username}</h2>  </Menu.Item>
            }
            {
              isAuthenticated && <Menu.Item style={{float: 'right'}}><Link to='/dashboard' style={{ textDecoration: 'none' }} ><h2>Dashboard</h2></Link></Menu.Item>
            }
          </Menu>
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
        </HashRouter>
      </div>
    );
  }
}

export default App;
