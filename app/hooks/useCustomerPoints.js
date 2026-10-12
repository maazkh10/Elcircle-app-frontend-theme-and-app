import { useEffect , useState } from "react";

import { getCustomerPoints } from "../services/loyalty.client.js";

export function useCustomerPoints({
    email , customerId
}) {

    const [points , setPoints] = useState(0)

    const [loading , setLoading] = useState(true)

    useEffect (() =>{
        async function loadPoints() {
            setLoading(true)
            const totalPoints = await getCustomerPoints({
        email , 
        customerId
    })

    setPoints(totalPoints)
    setLoading(false)
        }

        if (email || customerId) {
            loadPoints()
        }

    },[email , customerId])

    return {points , loading}
    
}
