import React from 'react'
import {
  Form,
  Input,
  Button,
  Divider,
} from 'antd'
// import Myservice from '../services'
import { signupFn } from '../services/index'

const googleUrl = process.env.NODE_ENV === 'development' ?
  "http://localhost:3000/auth/google" : '/auth/google'

export default function Signup({history}) {
  const [form] = Form.useForm()

  async function handleSubmit(values){
    console.log('user:', values)
    await signupFn(values)
    history.push('/login')
    
  }
  
  return (
    <div>
        <Form layout='vertical' form={form} onFinish={handleSubmit}>

          <Form.Item 
            name='name' 
            label='Email:'
            rules={[{required: true, message: 'Please input a valid email address'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='password' 
            label='Password:' 
            rules={[{required: true, message: 'Please input a password'}]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" block htmlType="submit">
            Signup
          </Button>

        </Form>
        <Divider>
          Or
        </Divider>
        <a href={googleUrl}>
          <Button block>Signup with Google</Button>
        </a>
    </div>
  );
}
