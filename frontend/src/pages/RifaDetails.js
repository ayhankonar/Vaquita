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
    <div className="rifa-details">
    <>
    {title ? (
      
    <Card
        style={{width: 500, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', border:'solid', borderWidth: 2, borderColor:'#0c7489', borderRadius: 4}}
        type="inner"
        title={title}
        cover={
          <img
          style={{ width: 300, flex:1, alignSelf:'center'}}
            alt="example"
            src={imageProduct}
          />
        }
      >
        <center >
            
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
                  <Button style={{margin: 20, color:'white', width:250, backgroundColor: '#0c7489', border: 'solid', borderColor: '#0c7489', borderRadius: 4}} onClick={()=> buyTicketFn()}>Comprar Boleto</Button>
                ) : (
                  <Button style={{margin: 20, color:'#0c7489', width:250, backgroundColor: 'white', border: 'solid', borderColor: '#0c7489', borderRadius: 4, borderWidth: 2}} disabled>Ya compraste un boleto</Button>
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
   </>
   </div>) 
 
}
export default RifaDetails