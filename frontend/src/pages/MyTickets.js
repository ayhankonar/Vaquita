import React, {useState, useEffect} from 'react'
import { getUsrTickets, getRifafromTix, getRifafromWinnerTix } from '../services/tickets'
import RifaCard from '../components/RifaCard'
import { getRifaDetails } from '../services/rifas'
import { useContextInfo } from '../hooks/context'
import { Row, Col, Typography, Card, Button, Modal } from 'antd'
const { Title, Text } = Typography

const MyTickets = () => {
    const { user } = useContextInfo()
    const [tickets, setTickets] = useState([])
    const [winnerTix, setWinnerTix] = useState([])
    const [rifas, setRifas] = useState([])

    // useEffect(() => {
    //     async function getTickets() {
    //     const { data } = await getUsrTickets()
    //     //if ticketWinner = true
    //     //getRifafrom 
    //     console.log(data,"DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    //     setTickets(data);
    //     }


    //     getTickets()
    // }, [])

    useEffect(() => {
        async function getRifas(){
            const { data } = await getRifafromTix()
            console.log(data, "RIFAAAAAAS")
            setRifas(data)
        }

        getRifas()
    }, [])

    useEffect(() => {
        async function getWinnerRifas(){
            const { data } = await getRifafromWinnerTix()
            console.log(data, "WIINNNNNNERRRRR")
            setWinnerTix(data)
        }

        getWinnerRifas()
    }, [])

    ///////TAMBIEN AGREGAR RIFAS PENDIENTES

    const {winner, rifaTicket } = tickets

    return  (
        <div>
        <h1>Mis Tickets</h1>
        <hr/>
        <h1>FELICIDADES!!, aqui estan tus rifas ganadas</h1>
        <Row style ={{flex: 1, justifyContent: "center" }}
        gutter={[16, 16]} xs={24} sm={24} md={8}>
            {winnerTix.map(rifa => <RifaCard
            key={rifa.id}
            {...rifa}/>)}
        </Row>
        <hr/>
        <Row style ={{flex: 1, justifyContent: "center" }} 
        gutter={[16, 16]} xs={24} sm={24} md={8}>
            {rifas.map(rifa => <RifaCard
            key={rifa.id}
            {...rifa}/>)}
        </Row>
      </div>
    )
    //   ) : <>
    //   <Title level={1}>Fake</Title>
    //   <Text type="secondary">compra tus tickets no seas ..</Text>
    // </>
  
}

export default MyTickets
