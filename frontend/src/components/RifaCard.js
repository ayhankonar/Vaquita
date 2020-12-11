import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd';


const { Meta } = Card;



function RifaCard({ title, productName, description, imageProduct, _id, availableTickets, ticketPrice }) {
 


  return(
    <Card
      style={{border:'solid', borderWidth: '1px', borderColor:'#0c7489', width: 300, height: 'auto', margin: 50, paddingTop:10, paddingLeft:50, paddingRight:50}}
      cover={
        <img
        style={{ width: 200}}
          alt="example"
          src={imageProduct}
        />
      }
      
      actions={[
        <Link
         style={{display:'flex', justifyContent:'center', alignContent:'flex-end'}}
         to={`/rifas/${_id}`}>Details </Link>,
      ]}
    >
      <Meta
        title={<h4>{title}</h4>}
        description = {`$${ticketPrice} | ${availableTickets} boletos`}
      />
    </Card>
  )

}

export default RifaCard
