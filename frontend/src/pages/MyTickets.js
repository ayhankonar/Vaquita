import React, {useState, useEffect} from 'react'
import { getUsrTickets, getRifafromTix, getRifafromWinnerTix, getRifafromLostTix } from '../services/tickets'
import RifaCard from '../components/RifaCard'
import { getRifaDetails } from '../services/rifas'
import { useContextInfo } from '../hooks/context'
import { Row, Col, Typography, Card, Button, Modal, Spin } from 'antd'
const { Title, Text } = Typography

const MyTickets = () => {
    const { user } = useContextInfo()
    // const [tickets, setTickets] = useState([])
    const [winnerTix, setWinnerTix] = useState(null)
    const [lostTix, setLostTix] = useState(null)
    const [rifas, setRifas] = useState(null)

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
            console.log('NOT FINISHED', data)
            setRifas(data)
        }

        getRifas()
    }, [])

    useEffect(() => {
        async function getWinnerRifas(){
            const { data } = await getRifafromWinnerTix()
            console.log('WINNER', data)
            setWinnerTix(data)
        }

        getWinnerRifas()
    }, [])

    useEffect(() => {
        async function getLoserRifas(){
            const { data } = await getRifafromLostTix()
            console.log('LOSER RIFAS', data)
            setLostTix(data)
        }

        getLoserRifas()
    }, [])

    return  (
        <div>

        <h1>Mis Tickets</h1>
        {winnerTix && (
            <>
                <h1>FELICIDADES, aqui estan tus rifas ganadas</h1>
                <Row style ={{flex: 1, justifyContent: "center" }}
                gutter={[16, 16]} xs={24} sm={24} md={8}>
                    {winnerTix.map(rifa => <RifaCard
                    key={rifa.id}
                    {...rifa}/>)}
                </Row>
                <hr/>
            </>
        )}
        <h2>Rifas abiertas</h2>
        {rifas ? (
            <Row style ={{flex: 1, justifyContent: "center" }}
                gutter={[16, 16]} xs={24} sm={24} md={8}>
                {rifas.map(rifa => <RifaCard
                key={rifa.id}
                {...rifa}/>)}
            </Row>
            ): <Spin size="large"/>
        }

        <hr/>
        <h2>Rifas cerradas</h2>
        {lostTix ? (
            <Row style ={{flex: 1, justifyContent: "center" }}
                gutter={[16, 16]} xs={24} sm={24} md={8}>
                {lostTix.map(rifa => <RifaCard
                key={rifa.id}
                {...rifa}/>)}
            </Row>
            ): <Spin size="large" />
        }

      </div>
    )
    //   ) : <>
    //   <Title level={1}>Fake</Title>
    //   <Text type="secondary">compra tus tickets no seas ..</Text>
    // </>
  
}

export default MyTickets
