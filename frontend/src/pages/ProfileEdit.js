import React from 'react'
import {
  Form,
  Input,
  Button,
  Divider,
} from 'antd'
// import Myservice from '../services/index'
import {userProfileEdit} from '../services/auth'

export default function ProfileEdit({
  history
}) {
  const [form] = Form.useForm()

  async function editProcess(values){
    console.log(values)
    // await signupFn(values)
    history.push('/profile')
    console.log('user:', values)
  }
  
  return (
    <div>
        <Form layout='vertical' form={form} onFinish={editProcess}>
          <Form.Item 
            name='userName' 
            label='Nombre de Usuario:'
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='firstName' 
            label='Nombre:'
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='lastName' 
            label='Apellido:'
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='email' 
            label='Nuevo email:'
          >
            <Input />
          </Form.Item>

          <Divider></Divider>

          <Form.Item 
            name='password' 
            label='Nueva contraseña:' 
          >
            <Input.Password />
          </Form.Item>

          <Form.Item 
            name='password2' 
            label='Confirmar nueva contraseña:' 
          >
            <Input.Password />
          </Form.Item>

          <Divider></Divider>

          <Form.Item 
            name='city' 
            label='Ciudad:' 
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name='country' 
            label='País:' 
          >
            <Input />
          </Form.Item>

          <Button type="primary" block htmlType="submit">
            Save Changes
          </Button>

        </Form>
        <Divider>
          Or
        </Divider>
        <a href={'http://localhost:3000/auth/google'}>
          <Button danger block>Signup with Google</Button>
        </a>
    </div>
  );
}
