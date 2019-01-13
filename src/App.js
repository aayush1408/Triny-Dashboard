import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

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
    return (
      <div className="App">
      <header>
        <h1>Triny.io</h1>
        {
          this.state.isAuthenticated && <h3>User: {this.state.user}</h3>  
        }
      </header>
        <BrowserRouter>
          <div>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login </Link>
            {/* //Handle the Dashboard link on the logged in status */}
            {
              this.state.isAuthenticated && <Link to='/dashboard'>Dashboard</Link>
            }
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
                  isAuthenticated={this.state.isAuthenticated} 
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
