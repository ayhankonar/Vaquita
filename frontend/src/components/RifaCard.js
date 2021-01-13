import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd';


const { Meta } = Card;



function RifaCard({ title, productName, description, imageProduct, _id, availableTickets, ticketPrice }) {
 


  return(
    <Card
      style={{
        // border:'solid', 
        // borderWidth: '1px', 
        // borderColor:'#0c7489', 
        width: 300, 
        height: 'auto', 
        margin: 50
        // paddingTop:10, 
        // paddingLeft:50, 
        // paddingRight:50
      }}
      cover={
        <div 
          style={{
            width: '100%', 
            // border: '1px solid #0c7489',
            height: '200px', 
            position: 'relative',
            overflow: 'hidden',
            padding: "2px"
          }}
        >
          <img
            style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0
            }}
            alt="example"
            src={imageProduct}
          />
        </div>
        
      }
      
      actions={[
        <Link
         style={{display:'flex', justifyContent:'center', alignContent:'flex-end'}}
         to={`/rifas/${_id}`}>Detalles</Link>,
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
