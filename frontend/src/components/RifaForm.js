import React, { useState, useEffect } from 'react'
import { Slider, Form, Button, Input, InputNumber, Select, Col, Row, Upload , Divider, Typography} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { createRifa } from '../services/rifas'
import axios from 'axios'

const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/dj9edroyv/image/upload'

const RifaForm = ({ addRifa }) => {
  const [form] = Form.useForm()
  const [img, setImg] = useState(null)
  const [loading, setLoading] = useState(null)
  const [sliderValue, setSliderValue] = useState(1)
  const [totalPrice, setTotalPrice] = useState(null)
  const [change, setChange] = useState(false)
  const [maxTix, setMaxTix] = useState(null)
  const [minTix, setMinTix] = useState(null)
  const [disableButton, setDisableButton] = useState(true)

  async function handleSubmit(values) {

    const rifa = {
      ...values,
      imageProduct: img,
      // ownerID: user._id
    }
    console.log(rifa)
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
      ticketPrice: ((totalPrice/availableTix).toFixed(2))
    })
  }

  function availableTixChange(value){
    setSliderValue(totalPrice/value)
    form.setFieldsValue({
      ticketPrice: ((totalPrice/value).toFixed(2))
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
    <Form form={form} style={{width: 550, backgroundColor:'white', border:'solid', borderWidth: '1px', borderColor:'#0c7489', borderRadius: 10, padding: '40px'}} theme="dark" layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="imageProduct" label="Imagen:">
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
      label="Título:"
      rules={[{required: true, message: 'Please input a title'}]}>
        <Input style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}}/>
      </Form.Item>

      <Form.Item name="productName" 
      label="Nombre del producto:"
      rules={[{required: true, message: 'Please input a product name'}]}>
        <Input style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}} />
      </Form.Item>


      <Form.Item name="description" 
      label="Descripción:" 
      rules={[{required: true, message: 'Please input a description'}]}>
        <Input.TextArea showCount maxLength={120} rows={4} style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px',  backgroundColor:'#F2F2F2'}}/>
      </Form.Item>
      
      <Divider></Divider>

      <Form.Item>
        <Form.Item name="productPrice" label="Precio del producto:" rules={[{validator: checkPrice}, {type: 'number', message: 'Please input a valid number'},{required: true, message: 'Please input a product price'}]}>
          <InputNumber disabled={confirmed} onChange={productPriceFn} style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}}/> 
        </Form.Item>
        {!confirmed ?
          <Button style={{borderRadius: 100}} type="secondary" disabled={disableButton} onClick={confirmTotalPrice}>Next</Button> :
          <Button style={{borderRadius: 100}} type="secondary" onClick={confirmTotalPrice}>Edit Product Price</Button>
        }
      </Form.Item>

      {confirmed && (
        <Form.Item>

          <Divider></Divider>
          <Typography.Paragraph>Nuestra misión es que todos usuarios tengan oportunidad igual de participar en nuestras rifas. Así que limitamos los precios de cada boleto hasta $100 USD</Typography.Paragraph>

          <Slider 
            style={{margin: "20px", marginBottom: "30px"}}
            min={1}
            max={100} 
            marks = {marks}
            onChange={sliderChange} 
            value={sliderValue}
            tooltipVisible ={false}
          />

          <Form.Item name="availableTickets" 
          label="Tickets disponibles:"
          rules={[{required: true, message: 'Please input a Available Tickets'}]}>
            <InputNumber onChange={availableTixChange} style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}}/>
          </Form.Item>  

          <Form.Item name="ticketPrice" 
          label="Precio del ticket:"
          rules={[{required: true, message: 'Please input a Ticket Price'}]}>
            {/* <InputNumber  style ={{ border:'solid', borderColor:'#0c7489', borderRadius: 8, borderWidth: '2px', backgroundColor:'#F2F2F2'}}/> */}
            <InputNumber min={1} max={100} disabled={true}/>
          </Form.Item>
        </Form.Item>
      )}
      <Divider></Divider>
      
     
      <Button style={{width:250, backgroundColor: '#0c7489', border: 'solid', borderColor: '#0c7489', borderRadius: 8}} type="primary" size="middle" htmlType="submit">Crear</Button>

    </Form>
    </div>
  )
}

export default RifaForm

