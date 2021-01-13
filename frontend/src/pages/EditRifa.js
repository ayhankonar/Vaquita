import React, { useState, useEffect } from 'react'
import { Form, Button, Input, InputNumber, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createRifa } from '../services/rifas'
import { useContextInfo } from '../hooks/context'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getRifaDetails, editRifa } from '../services/rifas'


const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/dj9edroyv/image/upload'

export default function EditRifa({
  match: {
    params: {
      rifaId
    }
  }
}){
  const [rifa, setRifa] = useState({})
  const { user } = useContextInfo()
  const [form] = Form.useForm()
  const history = useHistory()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    async function getDetails() {
      const { data } = await getRifaDetails(rifaId)
      setRifa(data);
    }

    getDetails()
  }, [])

  console.log('RIFA CHECK 2', rifa)

  async function handleSubmit(values) {

    const editedRifaInput = {
      ...values,
      imageProduct: img,
    }
    form.resetFields()
    setImg(null)
    history.push(`/rifas/myrifas${rifaId}`)
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

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={
      {
        title: rifa.title,
        description: rifa.description,
        productPrice: rifa.productPrice,
        productName: rifa.productName,
        imageProduct: rifa.imageProduct,
        ticketPrice: rifa.ticketPrice,
        availableTickets: rifa.availableTickets,
      }
    }>
      <Form.Item name="title" 
      label="Title:"
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" 
      label="Description:" 
      >
        <Input />
      </Form.Item>
      <Form.Item name="productName" 
      label="Product Name:"
      >
        <Input />
      </Form.Item>
      <Form.Item name="productPrice" 
      label="Product Price:"
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item name="ticketPrice" 
      label="Ticket Price:"
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="availableTickets" 
      label="Available Tickets:"
      >
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
