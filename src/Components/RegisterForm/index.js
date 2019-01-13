import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Form,Input,Button, Icon } from 'antd';

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
        <Form style={{textAlign:'center'}}>
          <Form.Item>
            <Input style={{ width: 400}} placeholder="Full name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} value={fullname} name="fullname" onChange={this.handleChange} />
          </Form.Item>
          <Form.Item>
            <Input style={{ width: 400}} placeholder="Username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} value={username} name="username" onChange={this.handleChange} />
          </Form.Item>
          <Form.Item>
            <Input style={{ width: 400}} placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} value={password} name="password" type="password" onChange={this.handleChange} />
          </Form.Item>
          <Form.Item>
            <Input style={{ width: 400}}  placeholder="Email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} value={email} name="email" onChange={this.handleChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.handleSubmit}>Submit</Button>
          </Form.Item>
          {this.state.errorMessage}
        </Form>
      </Fragment>
    )
  }
}

export default RegisterForm;