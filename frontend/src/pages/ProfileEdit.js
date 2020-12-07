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
  const { setCtxUser } = useContextInfo()
  
  const [form] = Form.useForm()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)

  async function handleSubmit(values) {
    console.log(values)

    const editUser = {
      ...values,
      image: img,
      _id: user._id,
      rifas: user.rifas,
      tickets: user.tickets
    }
    console.log('FORM VALUES: ', {editUser})

    const { data: updatedUser } = await userProfileEdit(user._id, editUser);
    form.resetFields()
    setImg(null)
    setCtxUser(updatedUser)
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
    <div>
        <Form layout='vertical' form={form} onFinish={handleSubmit} initialValues={{
          email: user.email,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          googleID: user.googleID,
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

          {/* <Divider></Divider>

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
          </Form.Item> */}

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
    </div>
  );
}
