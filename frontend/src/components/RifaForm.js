import React, { useState } from 'react'
import { Form, Button, Input, InputNumber, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createRifa } from '../services/rifas'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/dj9edroyv/image/upload'

const RifaForm = ({ addRifa }) => {
  const [form] = Form.useForm()
  const history = useHistory()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)

  async function handleSubmit(values) {

    const rifa = {
      ...values,
      imageProduct: img,
    }

    const { data: newRifa } = await createRifa(rifa);
    console.log (newRifa)
    addRifa(newRifa);
    form.resetFields()
    setImg(null)
    history.push('/rifas/myrifas')
  }

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

//   title,
//   description,
//   productPrice,
//   productName,
//   imageProduct,
//   ticketPrice,
//   availableTickets,
//   totalTickets: availableTickets,
//   ownerID

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="title" 
      label="Title:"
      rules={[{required: true, message: 'Please input a title'}]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" 
      label="Description:" 
      rules={[{required: true, message: 'Please input a description'}]}>
        <Input />
      </Form.Item>
      <Form.Item name="productName" 
      label="Product Name:"
      rules={[{required: true, message: 'Please input a product name'}]}>
        <Input />
      </Form.Item>
      <Form.Item name="productPrice" 
      label="Product Price:"
      rules={[{required: true, message: 'Please input a product price'}]}>
        <InputNumber/>
      </Form.Item>
      <Form.Item name="ticketPrice" 
      label="Ticket Price:"
      rules={[{required: true, message: 'Please input a Ticket Price'}]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name="availableTickets" 
      label="Available Tickets:"
      rules={[{required: true, message: 'Please input a Available Tickets'}]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name="imageProduct" label="Image:">
        <Upload
          name="image"
          showUploadList={false}
          beforeUpload={handleUploadFile}>
          {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
      <Button type="primary" block size="middle" htmlType="submit">Create</Button>
    </Form>
  )
}

export default RifaForm
