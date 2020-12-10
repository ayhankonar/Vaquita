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
    backgroundImage: 'url("./golden-gift-boxes.jpg")',
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

  // rifas.forEach(rifa => {
  //   rifasFiltered[rifa.status] = [...rifasFiltered[rifa.status], rifa]
  // })

  return  (
    <div style={{margin:"0", padding:"0"}}>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle1}>Vaquita. </h3>
        </div>
        <div>
          <h3 style={contentStyle2}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle1}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle1}>4</h3>
        </div>
      </Carousel>
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
