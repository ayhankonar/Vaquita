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
    
    // useEffect(() => {
    //     async function rifaCreate() {
    //       const { data } = await createRifa()
    //       setRifas(data);
    //     }
    //     rifaCreate()
    //   }, [])

    function addRifa(rifa) {
        setRifas([...rifas, rifa])
        history.push('/rifas/myrifas')
      }
    
    return (
   
        <div style={{padding: "75px"}}>
            <RifaForm addRifa={addRifa} />
        </div>
    )
}

export default CreateRifa;
