import React from 'react'
import {
  Form,
  Input,
  Button,
  Divider,
} from 'antd'
// import Myservice from '../services/index'
import {signupFn} from '../services/auth'

const googleUrl = process.env.NODE_ENV === 'development' ?
  "http://localhost:3000/auth/google" : '/auth/google'

export default function Signup({
  history
}) {
  const [form] = Form.useForm()

  async function signupProcess(values){
    // await Myservice.signup(values)
    // console.log(values)
    await signupFn(values)
    history.push('/login')
    // console.log('user:', values)
  }
  
  return (
    <div>
        <Form layout='vertical' form={form} onFinish={signupProcess}>
          <Form.Item 
            name='userName' 
            label='Nombre de Usuario:'
            rules={[{required: true, message: 'Please input a name'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='firstName' 
            label='Nombre:'
            rules={[{required: true, message: 'Please input a name'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='lastName' 
            label='Apellido:'
            rules={[{required: true, message: 'Please input a last name'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='email' 
            label='Email:'
            rules={[{required: true, message: 'Please input a valid email address'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='password' 
            label='Contraseña:' 
            rules={[{required: true, message: 'Please input a password'}]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item 
            name='password2' 
            label='Confirmar contraseña:' 
            rules={[{required: true, message: 'Please confirm password'}]}
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
          <Button danger block>Signup with Google</Button>
        </a>
    </div>
  );
}
