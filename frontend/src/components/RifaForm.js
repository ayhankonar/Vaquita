import React, { useState, useEffect } from 'react'
import { Slider, Form, Button, Input, InputNumber, Select, Col, Row, Upload , Divider, Typography} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createRifa } from '../services/rifas'
import axios from 'axios'

const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/dj9edroyv/image/upload'

const RifaForm = ({ addRifa }) => {
  // const { user } = useContextInfo()
  const [form] = Form.useForm()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)
  const [sliderValue, setSliderValue] = useState(1)
  const [numTix, setNumTix] = useState(1)
  const [totalPrice, setTotalPrice] = useState(null)
  const [change, setChange] = useState(false)

  async function handleSubmit(values) {

    const rifa = {
      ...values,
      imageProduct: img,
      // ownerID: user._id
    }
    console.log(rifa)
    // const { data: newRifa } = await createRifa(rifa);
    // console.log (newRifa)
    // addRifa(newRifa);
    // form.resetFields()
    // setImg(null)
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

  

  const [maxTix, setMaxTix] = useState(null)
  const [minTix, setMinTix] = useState(null)
  const [disableButton, setDisableButton] = useState(true)

  function productPriceFn(value){
    setTotalPrice(value)
    console.log('TOTAL PRICE: ', value)
    if (totalPrice > 0 && typeof totalPrice == 'number'){
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
  }
  
  const checkPrice = (rule) => {
    // console.log(value.productPrice)
    if (totalPrice > 0) {
      setDisableButton(false)
      return Promise.resolve('');
    } else{
      setDisableButton(true)
      return Promise.reject('Price must be greater than zero!');
    }
  };

  function sliderChange(value){
    setSliderValue(value)
    let availableTix = Math.floor(totalPrice/sliderValue)
    form.setFieldsValue({
      availableTickets: (availableTix),
      ticketPrice: (totalPrice/availableTix)
    })
  }

  function availableTixChange(value){
    setSliderValue(totalPrice/value)
    form.setFieldsValue({
      ticketPrice: (totalPrice/value)
    })
  }
  
  const [confirmed, setConfirmed] = useState(false)
  function confirmTotalPrice(){
    setConfirmed(!confirmed)
    setChange(!change)
  }

  useEffect(() => {
    function updateMaxMinTix(){
      setMaxTix(totalPrice/5)
      setMinTix(totalPrice/100)
    }
    updateMaxMinTix()
}, [change])

const marks = {
  1: `$1 USD`,
  100: `$100 USD`
}

  return (

    <div className="RifaForm">
       <h1>Crea tu rifa!</h1>
       <br/>
    <Form form={form} style={{width: 500, backgroundColor:'white', border:'solid', borderWidth: '1px', borderColor:'#0c7489', borderRadius: 10, padding: 20}} theme="dark" layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="imageProduct" label="Image:">
        <Upload
          name="image"
          showUploadList={false}
          beforeUpload={handleUploadFile}>
          {img ? <img src={img} style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>

      <Form.Item
      style ={{color:'white'}}
      name="title" 
      label="Title:"
      rules={[{required: true, message: 'Please input a title'}]}>
        <Input style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}}/>
      </Form.Item>

      <Form.Item name="productName" 
      label="Product Name:"
      rules={[{required: true, message: 'Please input a product name'}]}>
        <Input style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}} />
      </Form.Item>


      <Form.Item name="description" 
      label="Description:" 
      rules={[{required: true, message: 'Please input a description'}]}>
        <Input.TextArea showCount maxLength={120} rows={4} style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px',  backgroundColor:'#F2F2F2'}}/>
      </Form.Item>
      
      <Divider></Divider>

      <Form.Item>
        <Form.Item name="productPrice" label="Product Price:" rules={[{validator: checkPrice}, {type: 'number', message: 'Please input a valid number'},{required: true, message: 'Please input a product price'}]}>
          <InputNumber disabled={confirmed} onChange={productPriceFn} style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}}/> 
        </Form.Item>
        {!confirmed ?
          <Button type="primary" disabled={disableButton} onClick={confirmTotalPrice}>Next</Button> :
          <Button type="secondary" onClick={confirmTotalPrice}>Edit Product Price</Button>
        }
      </Form.Item>

      {confirmed && (
        <Form.Item>

          <Divider></Divider>
          <Typography.Paragraph>Nuestra mision es que todos usuarios tengan oportunidad igual de participar en nuestras rifas. Asi que limitamos los precios de cada boleto hast $100USD</Typography.Paragraph>

          <Slider 
            min={1}
            max={100} 
            marks = {marks}
            onChange={sliderChange} 
            value={sliderValue}
            tooltipVisible ={false}
          />

          <Form.Item name="availableTickets" 
          label="Available Tickets:"
          rules={[{required: true, message: 'Please input a Available Tickets'}]}>
            <InputNumber onChange={availableTixChange} style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}}/>
          </Form.Item>  

          <Form.Item name="ticketPrice" 
          label="Ticket Price:"
          rules={[{required: true, message: 'Please input a Ticket Price'}]}>
            <InputNumber min={1} max={100} disabled={true} style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}}/>
          </Form.Item>
        </Form.Item>
      )}
      <Divider></Divider>
      
     
      <Button style={{borderRadius: 100, width: 200, border: 'solid', borderColor: '#bedbbb', color: 'white', backgroundColor: '#bedbbb'}} type="primary" size="middle" htmlType="submit">Create</Button>

    </Form>
    </div>
  )
}

export default RifaForm
