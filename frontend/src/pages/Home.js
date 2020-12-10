import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Button, Modal } from 'antd'
import { getAllRifas } from '../services/rifas'
import RifaCard from '../components/RifaCard'

function Home() {
  const [rifas, setRifas] = useState([])
  
  useEffect(() => {
    async function getRifas() {
      const { data } = await getAllRifas()
      setRifas(data);
    }
    getRifas()
  }, [])

  // rifas.forEach(rifa => {
  //   rifasFiltered[rifa.status] = [...rifasFiltered[rifa.status], rifa]
  // })

  return  (
    <div style={{margin:"0", padding:"0"}}>
      <Col style={{height:"400px", width:"100vw", overflow:"hidden"}}>
        <img style={{width:"100%", verticalAlign: "middle"}}src="./golden-gift-boxes.jpg" alt="gift boxes"/>
      </Col>
      <h1>Buscar </h1>
      <Row style ={{flex: 1, justifyContent: "center" }}
      gutter={[16, 16]} xs={24} sm={24} md={8}>
        {rifas.map(rifa => <RifaCard
        key={rifa.id}
        {...rifa}/>)}
      </Row>
    </div>
  ) 

}

export default Home;
