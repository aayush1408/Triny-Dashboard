import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Header from '../Header';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      password: '',
      email: '',
      errorMessage:''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/user/register', this.state).then((res) => {
      if(res.data.dataSaved){
        this.props.history.push('/login')
      }
      else{
        this.setState({
          errorMessage:res.data.message
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  render() {
    const { fullname, email, username, password } = this.state;
    return (
      <Fragment>
        <Header title="Registration" />
        <form>
          <label>Fullname</label>
          <input value={fullname} name="fullname" onChange={this.handleChange} />
          <br />
          <label>Username</label>
          <input value={username} name="username" onChange={this.handleChange} />
          <br />
          <label>Password</label>
          <input value={password} name="password" type="password" onChange={this.handleChange} />
          <br />
          <label>Email</label>
          <input value={email} name="email" onChange={this.handleChange} />
          <br />
          <button onClick={this.handleSubmit}>Submit</button>
          {this.state.errorMessage}
        </form>
      </Fragment>
    )
  }
}

export default RegisterForm;