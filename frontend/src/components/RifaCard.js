import React from 'react'
import { Card, Avatar, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography


function RifaCard({ title, productName, description, imageProduct, _id }) {
  return (
    <Card
      type="inner"
      title={title}
      extra={<Link to={`/rifa/${_id}`}>Details</Link>}
      style={{ marginBottom: '8px' }}
      hoverable>
      <center>
        <Avatar src={imageProduct} style={{ backgroundColor: 'white' }} />
        <Title level={4}>{productName}</Title>
      </center>
      {description}
    </Card>
  )
}

export default RifaCard