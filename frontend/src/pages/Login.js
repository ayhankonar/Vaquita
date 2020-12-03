import React from 'react'
import {
  Form,
  Input,
  Button,
  Divider,
} from 'antd'

import { loginFn } from '../services/auth'
import { useContextInfo } from '../hooks/context'

// const {Title} = Typography

export default function Login({history}){
  const [form] = Form.useForm()
  const { setCtxUser } = useContextInfo()

  async function loginProcess(values){
    console.log(values)
    const {data: {user}} = await loginFn(values)
    delete user.password
    delete user.hash
    delete user.salt
    setCtxUser(user)
    history.push('/profile')
    console.log('userlogin:', user)
  }

  return (
    <div>
      <Form layout='vertical' form={form} onFinish={loginProcess}>
      
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
          Log in
        </Button>

      </Form>

      <Divider>
        Or
      </Divider>

      <a href={'http://localhost:3000/auth/google'}>
        <Button danger block>Login with Google</Button>
      </a>

  </div>
  )
}