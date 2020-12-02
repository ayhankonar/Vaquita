import React from 'react'
import {
  Form,
  Input,
  Button,
  Divider,
} from 'antd'
// import Myservice from '../services/index'
import {signupFn} from '../services/index'

export default function Signup({
  history
}) {
  const [form] = Form.useForm()

  async function signupProcess(values){
    // await Myservice.signup(values)
    console.log(values)
    await signupFn(values)
    history.push('/login')
    console.log('user:', values)
  }
  
  return (
    <div>
        <Form layout='vertical' form={form} onFinish={signupProcess}>

          <Form.Item 
            name='email' 
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
        <a href={'http://localhost:3000/auth/google/callback'}>
          <Button block>Signup with Google</Button>
        </a>
    </div>
  );
}
