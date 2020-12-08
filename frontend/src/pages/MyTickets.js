import React, {useState, useEffect} from 'react'
import { getUsrTickets } from '../services/tickets'
import RifaCard from '../components/RifaCard'
import { useContextInfo } from '../hooks/context'
import { Row, Col, Typography, Card, Button, Modal } from 'antd'
const { Title, Text } = Typography

const MyTickets = () => {
    const { user } = useContextInfo()
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        async function getTickets() {
        const { data } = await getUsrTickets()
        console.log(data,"DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        setTickets(data);
        }

        getTickets()
    }, [])

    function traerRifas (){

    }

    const {winner, rifaTicket } = tickets

    return  (
        <div>
          <Row gutter={[16, 16]} xs={24} sm={24} md={8}>
              {tickets.map(ticket => <p
              key={ticket.id} >
              {winner}
              {rifaTicket}
              </p>
             
             ) }
             
          </Row>
        </div>
    )
    //   ) : <>
    //   <Title level={1}>Fake</Title>
    //   <Text type="secondary">compra tus tickets no seas ..</Text>
    // </>
  
}

export default MyTickets
