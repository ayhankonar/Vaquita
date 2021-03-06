import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Carousel, Card, Button, Modal } from 'antd'
import { getAllRifas } from '../services/rifas'
import RifaCard from '../components/RifaCard'

function Home() {
  const [rifas, setRifas] = useState([])

  const contentStyle1 = {
    fontSize: "3em",
    height: '400px',
    color: '#fff',
    lineHeight: '400px',
    textAlign: 'center',
    backgroundImage: 'url("./home.png")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  const contentStyle2 = {
    height: '400px',
    color: '#fff',
    lineHeight: '400px',
    textAlign: 'center',
    background: '#364d79',
  };
  
  useEffect(() => {
    async function getRifas() {
      const { data } = await getAllRifas()
      setRifas(data);
    }
    getRifas()
  }, [])

  return  (
    <div style={{margin:"0", padding:"0"}}>

        <div>
          <h3 style={contentStyle1}></h3>
        </div>

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
