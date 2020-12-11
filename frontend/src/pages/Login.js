import React from 'react'
import {
  Form,
  Input,
  Button,
  Divider,
  Checkbox
} from 'antd'

import { loginFn } from '../services/auth'
import { useContextInfo } from '../hooks/context'

// const {Title} = Typography

export default function Login({history}){
  const [form] = Form.useForm()
  const { setCtxUser } = useContextInfo()

  async function loginProcess(values){
    const {data: {user}} = await loginFn(values)
    delete user.password
    delete user.hash
    delete user.salt
    setCtxUser(user)
    history.push('/profile')

  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  return (
    <div className="login">
     <div>
      <Form 
      className="form-login"
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
       form={form} onFinish={loginProcess}>

      
        <Form.Item
        style={{width:500}}
          name='email'
          label='Email:'
          rules={[{required: true, message: 'Please input a valid email address'}]}
        >
          <Input style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}} />
        </Form.Item>

        <Form.Item
          style={{width:500}}
          name='password'
          label='Contraseña:'
          rules={[{required: true, message: 'Please input a password'}]}
        >
          <Input.Password style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}}/>
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox 
          >Remember me</Checkbox>
        </Form.Item>

      <Form.Item {...tailLayout}>
        <Button style={{backgroundColor: '#0c7489', border: 'solid', borderColor: '#0c7489', borderRadius: 4}} type="primary" block htmlType="submit">
          Log in
        </Button>
        </Form.Item>
      </Form>
      </div>
      <div>
      <Form.Item {...tailLayout}>
        <Divider>
          Or
        </Divider>
      </Form.Item>
      <Form.Item 
       style={{width:500}}      
      {...tailLayout}>
      <a href={'http://localhost:3000/auth/google'}>
        <Button style={{border:'solid', borderWidth: 2, borderRadius: 4}} danger block>Login with Google</Button>
      </a>
      </Form.Item>
      </div>

  </div>
  )
}