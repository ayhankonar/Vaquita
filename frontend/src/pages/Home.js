import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Button, Modal } from 'antd'
import { getAllRifas } from '../services/rifas'
import RifaCard from '../components/RifaCard'

function Home() {
  const [rifas, setRifas] = useState([])
  
  useEffect(() => {
    async function getRifas() {
      console.log("test")
      const { data } = await getAllRifas()
      console.log(data)
      setRifas(data);
    }
    getRifas()
  }, [])

  // rifas.forEach(rifa => {
  //   rifasFiltered[rifa.status] = [...rifasFiltered[rifa.status], rifa]
  // })

  return (
    <div>
      <h1>Home</h1>
      <Row gutter={[16, 16]} xs={24} sm={24} md={8}>
      
        
        {rifas.map(rifa => <RifaCard
        key={rifa.id}
        {...rifa}/>)}
        
      
      </Row>
    </div>
  );
}

export default Home;
