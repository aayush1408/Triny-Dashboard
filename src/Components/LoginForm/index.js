import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test',
      password: 'test',
      errorMessage: '',
      toDashboard:false
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', this.state).then((res) => {
      if (res.data.message === 'User authenticated') {
        this.props.isAuthed(true);
        this.setState({
          toDashboard:true
        })
      }
      else {
        this.setState({ errorMessage: res.data.message })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <Fragment>
      {
        this.state.toDashboard &&
          <Redirect to="/dashboard" />
      }
        <Header title="Login" />
        <form>
          <label>Username</label>
          <input value={username} name="username" onChange={this.handleChange} />
          <br />
          <label>Password</label>
          <input value={password} name="password" type="password" onChange={this.handleChange} />
          <br />
          <button onClick={this.handleSubmit}>Submit</button>
          {errorMessage}
        </form>
      </Fragment>
    )
  }
}

export default LoginForm;