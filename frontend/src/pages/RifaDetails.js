import React, { useState, useEffect } from 'react'
import { Card, Avatar, Typography, Button, Modal } from 'antd'
import RifaEditForm from '../components/RifaEditForm'
import { getRifaDetails } from '../services/rifas'
import RifaCard from '../components/RifaCard'
import { useContextInfo } from '../hooks/context'
import {Link} from 'react-router-dom'
// import { editRifa } from '../services/rifas'

const { Title, Text } = Typography

const RifaDetails = ({
  match: {
    params: {
      rifaId
    }
  }
}) => {
  const [rifa, setRifa] = useState({})
  const { user } = useContextInfo()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function getDetails() {
      const { data } = await getRifaDetails(rifaId)
      // console.log(rifaId, "HOLAAAAAAAAAAAAAAA")
      setRifa(data);
    }

    getDetails()
  }, [rifaId])

  let deUsuario = false
  if (user && rifa.ownerID === user._id) {
    deUsuario = true
  }

  function editRifa(rifas){
    setRifa([...rifa,rifas])
  }

//   async function handleStatus(status) {
//     const updatedRifa = { ...rifa, status }
//     const { data: newRifa } = await editRifa(rifa._id, updatedRifa)
//     setRifa(newRifa)
//   }

  const { title, imageProduct, description, productName, productPrice } = rifa

  return (
    <>
    <Card
        type="inner"
        title={title}
      >
        <center>
            <Avatar src={imageProduct} style={{ backgroundColor: 'white' }} />
            <Title level={4}>{productName}</Title>
            <Text>Description: {description}</Text><br/>
            <Text> Ticket Price {productPrice}</Text><br/>
        {deUsuario ? (
          <Button onClick={()=> setShowModal(true)}>Edit</Button>
        ): (
          <Link><Button>Comprar Boleto</Button></Link>
        )}        
        </center>

        {/* <Link></Link> */}
    </Card>
    <Modal
      visible={showModal}
      title="Edit your Rifa"
      onOk={() => setShowModal(false)}
      onCancel={() => setShowModal(false)}
    >
      <RifaEditForm {...rifa} />
    </Modal>
    </>
  ) 
//   : (
//       <Skeleton active />
//     )
}

export default RifaDetails