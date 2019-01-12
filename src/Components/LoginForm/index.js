import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Header from '../Header';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test',
      password: 'test'
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
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    const { username, password } = this.state;
    return (
      <Fragment>
        <Header title="Login" />
        <form>
          <label>Username</label>
          <input value={username} name="username" onChange={this.handleChange} />
          <br />
          <label>Password</label>
          <input value={password} name="password" type="password" onChange={this.handleChange} />
          <br />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </Fragment>
    )
  }
}

export default LoginForm;