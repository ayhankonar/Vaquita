import React, {useState, useEffect} from 'react'
import { getUsrRifas } from '../services/rifas'
import {Link} from 'react-router-dom'
import RifaCard from '../components/RifaCard'
import { useContextInfo } from '../hooks/context'
import { Row, Col, Typography, Card, Button, Modal } from 'antd'
const { Title, Text } = Typography


const MyRifas = () => {
    const { user } = useContextInfo()
    const [rifas, setRifas] = useState([])

    useEffect(() => {
        async function getRifas() {
        const { data } = await getUsrRifas()
        setRifas(data);
        }

        getRifas()
    }, [])
   
    return user ? (
      <div style={{padding: '25px 0 0 0'}}>
        <h1 style={{fontSize: '3em'}}>Mis Rifas</h1>
        <Row style ={{flex: 1, justifyContent: "center" }} 
        gutter={[16, 16]} xs={24} sm={24} md={8}>
            {rifas.map(rifa => <RifaCard
            key={rifa.id}
            {...rifa}/>)}
        </Row>
      </div>
    ) : <>
    <Link to='/login'><Button>Login</Button></Link>
  </>

}

export default MyRifas
