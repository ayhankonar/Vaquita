import React from 'react'
// import { Card, Avatar, Typography } from 'antd'
import { Link } from 'react-router-dom'

// const { Title } = Typography

import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;



function RifaCardEdit({ title, productName, description, imageProduct, _id, availableTickets, ticketPrice }) {
  // return (
  //   <Card
  //     type="inner"
  //     title={title}
  //     extra={<Link to={`/rifas/${_id}`}>Details</Link>}
  //     style={{ marginBottom: '8px' }}
  //     hoverable>
  //     <center>
  //       <Avatar src={imageProduct} style={{ backgroundColor: 'white' }} />
  //       <Title level={4}>{productName}</Title>
  //     </center>
  //     {description}
  //   </Card>
  // )


  return(
    <Card
      style={{ width: 300, height: 300, margin: 50 }}
      cover={
        <img
        style={{ width: 300, height: 200 }}
          alt="example"
          src={imageProduct}
        />
      }
      actions={[
        <EditOutlined key="edit" />,
        <Link to={`/rifas/${_id}`}>Details </Link>
      ]}
    >
      <Meta
        title={title}
        description = {`$${ticketPrice} | ${availableTickets} boletos`}
      />
    </Card>
  )

}

export default RifaCardEdit
