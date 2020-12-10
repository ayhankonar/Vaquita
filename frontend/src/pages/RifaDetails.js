import React, { useState, useEffect } from 'react'
import { Card, Avatar, Typography, Button, Modal, Skeleton } from 'antd'
import RifaEditForm from '../components/RifaEditForm'
import { getRifaDetails } from '../services/rifas'
import { getUsrTickets, getRifafromTix, getRifafromWinnerTix, getRifafromLostTix } from '../services/tickets'
import {buyTicket, compareUserAndRifaTix} from '../services/tickets'
import RifaCard from '../components/RifaCard'
import { useContextInfo } from '../hooks/context'
import {Link} from 'react-router-dom'
// import { editRifa } from '../services/rifas'

const { Title, Text } = Typography

const RifaDetails = ({
  match: {
    params: {
      rifaId
    }
  }
}) => {
  const [rifa, setRifa] = useState({})
  const { user } = useContextInfo()
  const [showModal, setShowModal] = useState(false)
  const [prueba, setPrueba] = useState(false)
  const [change, setChange] = useState(false)
  const [matches, setMatches] = useState(null)
  const [buyable, setBuyable] = useState(null)
  // let previouslyBought = false

  useEffect(() => {
    async function checkIfBought(){
      const {data} = await compareUserAndRifaTix(rifaId)
      console.log(data)
      setBuyable(!data)
      
    }
    checkIfBought()
  },[])
  
  
  useEffect(() => {
    async function getDetails() {
      const { data } = await getRifaDetails(rifaId)
      //  console.log(data)
        setRifa(data);
      }

    getDetails()
  }, [change])

  // useEffect(() => {
  //   async function checkRifaUserTix(){
  //     const {data} = await compareUserAndRifaTix()
  //     console.log(data, "DATA DE AQUI")
  //   }
  //   checkRifaUserTix()
  // },[])

  //PARA VERIFICAR SI EL USUARIO ES DUE~O DE LA RIFA Y MOSTRA BOTONES DIFERENTES
  let deUsuario = false
  if (user && rifa.ownerID === user._id) {
    deUsuario = true
  }

  //SUPESTAMENTE PARA PASAR Y ACTUALIZAR EL FORMULARIO PERO NO ME FUNCIONA. 
  // function editRifa(rifas){
  //   setRifa([...rifa,rifas])
  // }

  
  
  //findbyidandupdate with patch
  async function buyTicketFn(){
    console.log(rifaId)
    await buyTicket(rifaId)
    setChange(!change)
    setBuyable(false)
  }

  const { title, imageProduct, description, productName, productPrice, availableTickets } = rifa

  return (
    <>
    {title ? (
    <Card
        style={{width:400, flex:1, justifyContent:'center'}}
        type="inner"
        title={title}
      >
        <center>
            <Avatar src={imageProduct} style={{ backgroundColor: 'white' }} />
            <Title level={4}>{productName}</Title>
            <Text>Description: {description}</Text><br/>
            <Text> Ticket Price: {productPrice}</Text><br/>
            <Text> Available Tickets: {availableTickets}</Text><br/>

        {user ? (
          <>

            {deUsuario ? (
              <>
                <Button onClick={()=>setPrueba(!prueba)}>Editar</Button>
                <br/>
              </>
            ): (
              <>
                {buyable ? (
                  <Button style={{borderRadius:100, border:'solid',color:'#bedbbb', margin: 20}} onClick={()=> buyTicketFn()}>Comprar Boleto</Button>
                ) : (
                  <Button style={{borderRadius:100, border:'solid',color:'#bedbbb'}} disabled>Comprar Boleto</Button>
                )}
              </>
            )}
          </>
        ): (
          <>
            <br/>
            <Link to='/signup'>
              <Button type="primary">Sign up to buy</Button>
            </Link>
            <p>or</p>
            <Link to='/login'>
              <Button default>Log in</Button>
            </Link> 
         </>
        )}

         
        
        </center>

        {/* <Link></Link> */}
        { prueba &&       
          <RifaEditForm {...rifa} />
        }
        
        
    </Card>
    ):(
      // <p>No hay tickets disponibles</p>
      <Skeleton active />
    )
  }
   </>) 
 
}

export default RifaDetails