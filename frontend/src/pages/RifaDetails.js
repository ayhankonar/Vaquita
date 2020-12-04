import React, { useState, useEffect } from 'react'
import { Card, Avatar, Typography } from 'antd'
import { getRifaDetails } from '../services/rifas'
import RifaCard from '../components/RifaCard'
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

  useEffect(() => {
    async function getDetails() {
      const { data } = await getRifaDetails(rifaId)
      console.log(rifaId, "HOLAAAAAAAAAAAAAAA")
      setRifa(data);
     
    }

    getDetails()
  }, [rifaId])

//   async function handleStatus(status) {
//     const updatedRifa = { ...rifa, status }
//     const { data: newRifa } = await editRifa(rifa._id, updatedRifa)
//     setRifa(newRifa)
//   }

  const { title, imageProduct, description, productName, productPrice } = rifa

  return (
      <Card
        type="inner"
        title={title}
      >
        <center>
            <Avatar src={imageProduct} style={{ backgroundColor: 'white' }} />
            <Title level={4}>{productName}</Title>
            <Text>Description: {description}</Text><br/>
            <Text> Ticket Price {productPrice}</Text> 
        </center>
        {/* <Link></Link> */}
    </Card>
  ) 
//   : (
//       <Skeleton active />
//     )
}

export default RifaDetails