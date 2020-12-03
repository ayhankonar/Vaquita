import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Button, Modal } from 'antd'
import { getAllRifas } from '../services/rifas'

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

  return (
    <div>
      <h1>Home</h1>
      {/* <getAllRifas/> */}
    </div>
  );
}

export default Home;
