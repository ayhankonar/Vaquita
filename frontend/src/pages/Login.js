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




export default function Login({history}){
  const [form] = Form.useForm()
  const { setCtxUser } = useContextInfo()

  async function loginProcess(values){
    const {data: {user}} = await loginFn(values)
    delete user.password
    delete user.hash
    delete user.salt
    setCtxUser(user)
    history.push('/')

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
          label='Password:'
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
  </div>
  )
}