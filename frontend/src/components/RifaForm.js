import React, { useState } from 'react'
import { Slider, Form, Button, Input, InputNumber, Select, Col, Row, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createRifa } from '../services/rifas'
import axios from 'axios'

const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/dj9edroyv/image/upload'

const RifaForm = ({ addRifa }) => {
  // const { user } = useContextInfo()
  const [form] = Form.useForm()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)
  const [inputValue, setInputValue] = useState(1)
  const [numTix, setNumTix] = useState(1)

  async function handleSubmit(values) {

    const rifa = {
      ...values,
      imageProduct: img,
      // ownerID: user._id
    }

    const { data: newRifa } = await createRifa(rifa);
    console.log (newRifa)
    addRifa(newRifa);
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

  function onChange(value){
    console.log(value)
    setInputValue(value)
    form.setFieldsValue({
      ticketPrice: (value)
    })
  }

  function totalCost(value){
    console.log(value)
    if (inputValue>1){
      form.setFieldsValue({
        availableTickets: (inputValue/value)
      });
    }
  }

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
        <InputNumber onChange={totalCost}/>
      </Form.Item>
      
      <Row>
        <Col span={12}>
          <Slider 
            min={10} 
            max={100} 
            onChange={onChange} 
            value={inputValue}
          />
        </Col>
        <Col span={4}>
          <Form.Item name="ticketPrice" 
          label="Ticket Price:"
          rules={[{required: true, message: 'Please input a Ticket Price'}]}>
            <InputNumber min={10} max={100} onChange={onChange} value={inputValue}/>
          </Form.Item>
          <p>{numTix}</p>
        </Col>
        <Col>
          <Form.Item name="availableTickets" 
          label="Available Tickets:"
          rules={[{required: true, message: 'Please input a Available Tickets'}]}>
            <InputNumber />
          </Form.Item>  
        </Col>
      </Row>
     
      <Form.Item name="imageProduct" label="Image:">
        <Upload
          name="image"
          showUploadList={false}
          beforeUpload={handleUploadFile}>
          {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>
      <Button type="primary" size="middle" htmlType="submit">Create</Button>
    </Form>
  )
}

export default RifaForm
