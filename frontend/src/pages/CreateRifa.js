import React, {useState, useEffect} from 'react'
import RifaForm from '../components/RifaForm'
import { useContextInfo } from '../hooks/context'
import { createRifa } from '../services/rifas'


const CreateRifa = () => {
    const { user } = useContextInfo()
    const [rifas, setRifas] = useState([])
    
    // useEffect(() => {
    //     async function rifaCreate() {
    //       const { data } = await createRifa()
    //       setRifas(data);
    //     }
    //     rifaCreate()
    //   }, [])

    function addRifa(rifa) {
        setRifas([...rifas, rifa])
      }
    
    return (
   
        <div>
            <RifaForm addRifa={addRifa} />
        </div>
    )
}

export default CreateRifa;
