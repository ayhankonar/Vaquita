import React, {useState} from 'react'
import {
  Form,
  Input,
  Button,
  Divider,
  InputNumber, 
  Select, 
  Upload 
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { userProfileEdit } from '../services/auth'
import { useContextInfo } from '../hooks/context'

import axios from 'axios'

const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/dj9edroyv/image/upload'

export default function ProfileEditForm({history}) {
  const { user } = useContextInfo()
  const { updateCtxUser } = useContextInfo()
  
  const [form] = Form.useForm()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)

  async function handleSubmit(values) {

    const editUser = {
      ...values,
      image: img,
      _id: user._id,
      rifas: user.rifas,
      tickets: user.tickets
    }

    const { data: updatedUser } = await userProfileEdit(user._id, editUser);
    form.resetFields()
    setImg(null)
    updateCtxUser(updatedUser)
    history.push('/profile')
  }

  //PROFILE PHOTO UPLOAD
  async function handleUploadFile(file) {
    setLoading(true)
    const data = new FormData()

    data.append('file', file)
    data.append('upload_preset', 'ml_vaquita')

    const { data: { secure_url } } = await axios.post(cloudinaryAPI, data)

    setImg(secure_url);
    setLoading(false)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  
  return (
    <div className= "edit-profile">
        <Form 
          style={{width: 600, backgroundColor:'white', border:'solid', borderWidth: '1px', borderColor:'#0c7489', borderRadius: 10, padding: '50px'}} theme="dark" layout="vertical" onFinish={handleSubmit}
          layout='vertical' form={form} onFinish={handleSubmit} initialValues={{
          email: user.email,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          city: user.city,
          country: user.country,
          image: user.image
        }}>

          <Form.Item name="image" label="Profile Photo:">
            <Upload
              name="image"
              showUploadList={false}
              beforeUpload={handleUploadFile}>
              {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>

          <Form.Item 
           style={{width:500}}
            name='userName' 
            label='Nombre de Usuario:'
          >
            <Input style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}}/>
          </Form.Item>

          <Form.Item 
            style={{width:500}}
            name='firstName' 
            label='Nombre:'
          >
            <Input style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}}/>
          </Form.Item>

          <Form.Item 
            style={{width:500}}
            name='lastName' 
            label='Apellido:'
          >
            <Input style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}}/>
          </Form.Item>

          <Form.Item 
            style={{width:500}}
            name='email' 
            label='Nuevo email:'
          >
            <Input style={{  border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}}/>
          </Form.Item>

          <Form.Item 
            style={{width:500}}
            name='city' 
            label='Ciudad:' 
          >
            <Input style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}}/>
          </Form.Item>

          <Form.Item 
            style={{width:500}}
            name='country' 
            label='País:' 
          >
            <Input style={{ border: 'solid', borderColor: '#0c7489', borderWidth:'2px', borderRadius: 4}}/>
          </Form.Item>

          <Button
           style={{width:500, backgroundColor: '#0c7489', border: 'solid', borderColor: '#0c7489', borderRadius: 4}}
           type="primary" block htmlType="submit">
            Guardar Cambios
          </Button>

        </Form>
    </div>
  );
}
