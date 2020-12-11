import React from 'react'
import {
  Form,
  Input,
  Button,
  Divider,
} from 'antd'

import {signupFn} from '../services/auth'

const googleUrl = process.env.NODE_ENV === 'development' ?
  "http://localhost:3000/auth/google" : '/auth/google'

export default function Signup({
  history
}) {
  const [form] = Form.useForm()

  async function signupProcess(values){
    await signupFn(values)
    history.push('/login')

  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  
  return (
    <div className="signup">
      
        <Form
        {...layout}
          form={form} onFinish={signupProcess}>
          <Form.Item 
            style={{width:500}}
            name='userName' 
            label='Nombre de Usuario:'
            rules={[{required: true, message: 'Please input a name'}]}
          >
            <Input style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}} />
          </Form.Item>

          <Form.Item 
            style={{width:500}}
            name='firstName' 
            label='Nombre:'
            rules={[{required: true, message: 'Please input a name'}]}
          >
            <Input style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}}/>
          </Form.Item>

          <Form.Item 
          style={{width:500}}
            name='lastName' 
            label='Apellido:'
            rules={[{required: true, message: 'Please input a last name'}]}
          >
            <Input style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}} />
          </Form.Item>

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

          <Form.Item 
          style={{width:500}}
            name='password2' 
            label='Confirmar contraseña:' 
            rules={[{required: true, message: 'Please confirm password'}]}
          >
            <Input.Password style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}}/>
          </Form.Item>
          
          <Form.Item 
          {...tailLayout}> 
          <Button style={{width:250, backgroundColor: '#0c7489', border: 'solid', borderColor: '#0c7489', borderRadius: 4}}
          type="primary" block htmlType="submit">
            Signup
          </Button>
          </Form.Item> 
        </Form>
        
        <Form.Item style={{width:480}} {...tailLayout}> 
        <Divider>
          Or
        </Divider>
        </Form.Item>
        <Form.Item {...tailLayout}> 
        <a href={googleUrl}>
          <Button style={{width:250, border:'solid', borderWidth: 2, borderRadius: 4}} 
          danger block>Signup with Google</Button>
        </a>
        </Form.Item>
      
    </div>
   
  );
}
