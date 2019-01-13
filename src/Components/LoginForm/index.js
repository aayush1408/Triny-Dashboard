import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import { Form,Input,Button, Icon } from 'antd';
import axios from 'axios';
import Header from '../Header';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      toDashboard:false
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // Login user user data
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
    const { username, password, errorMessage,toDashboard } = this.state;
    return (
      <Fragment>
      {
          toDashboard &&
          <Redirect to="/dashboard" />
      }
        <Header title="Login" />
        <Form style={{textAlign:'center'}}>
         <Form.Item>
            <Input style={{ width: 400}} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={username} name="username" onChange={this.handleChange}/>
        </Form.Item>
        <Form.Item>
            <Input style={{ width: 400 }} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value={password} name="password" onChange={this.handleChange} />
        </Form.Item> 
        <Form.Item>
        <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
        </Form.Item>
          {errorMessage}
        </Form>
      </Fragment>
    )
  }
}
const WrappedLoginForm = Form.create({ name: 'normal_login' })(LoginForm);
export default WrappedLoginForm;