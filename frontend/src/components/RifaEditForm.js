import React, { useState, useEffect } from 'react'
import { Form, Button, Input, InputNumber, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useContextInfo } from '../hooks/context'
import axios from 'axios'
import { editRifa } from '../services/rifas'


const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/dj9edroyv/image/upload'

export default function EditRifa({
    _id,
    title,
    description,
    productPrice,
    productName,
    imageProduct,
    ticketPrice,
    availableTickets,
    ownerID
    // totalTickets: availableTickets,
}){
  const [rifa, setRifa] = useState({})
  const { user } = useContextInfo()
  const [form] = Form.useForm()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)

  // useEffect(() => {
  //   async function getDetails() {
  //     const { data } = await getRifaDetails(rifaId)
  //     setRifa(data);
  //   }

  //   getDetails()
  // // }, [rifaId])
  // }, [])


  async function handleSubmit(values) {

    const editedRifaInput = {
      ...values,
      imageProduct: img,
      ownerID
    }

    const { data: editedRifa } = await editRifa(_id, editedRifaInput);
    form.resetFields()
    setImg(null)
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
    <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={
      {
        title,
        description,
        productPrice,
        productName,
        imageProduct,
        ticketPrice,
        availableTickets,
        // totalTickets: availableTickets,
      }
    }>
      <Form.Item 
        name="title" 
        label="Title:"
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="description" 
        label="Description:" 
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="productName" 
        label="Product Name:"
      >
        <Input />
      </Form.Item>

      <Form.Item 
        name="productPrice" 
        label="Product Price:"
      >
        <InputNumber disabled/>
      </Form.Item>

      <Form.Item 
        name="ticketPrice" 
        label="Ticket Price:"
        
      >
        <InputNumber disabled/>
      </Form.Item>

      <Form.Item 
        name="availableTickets" 
        label="Available Tickets:"
        
      >
        <InputNumber disabled/>
      </Form.Item>
      
      <Form.Item name="imageProduct" label="Image:">
        <Upload
          name="image"
          showUploadList={false}
          beforeUpload={handleUploadFile}>
          {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
      <Button type="primary" block size="middle" htmlType="submit">Save Changes</Button>
    </Form>
  )
}