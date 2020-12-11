import React, {useState, useEffect} from 'react'
import RifaForm from '../components/RifaForm'
import { useContextInfo } from '../hooks/context'
import { createRifa } from '../services/rifas'

//Importar History
import { useHistory } from 'react-router-dom'    

const CreateRifa = () => {
    const { user } = useContextInfo()
    const [rifas, setRifas] = useState([])

    //Declarar variable de history
    const history = useHistory()

    function addRifa(rifa) {
        setRifas([...rifas, rifa])
        history.push('/rifas/myrifas')
      }
    
    return (
   
        <div style={{padding: "25px 75px"}}>
            <h1 style={{fontSize: '3em'}}>Crea tu rifa!</h1>
            <RifaForm addRifa={addRifa} />
        </div>
    )
}

export default CreateRifa;
