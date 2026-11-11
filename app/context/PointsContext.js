import { createContext , useContext } from "react";


import { useCustomerPoints } from "../hooks/useCustomerPoints.js";

const pointsContext = createContext()


export function PointsProvider({
    children , email , customerId
}) {

    const pointsData = useCustomerPoints({
        email,
        customerId
    });

    return (
        <PointsProvider value ={pointsData}>
            {children}
        </PointsProvider>
    )
}

export function usePoints(){
    return useContext(pointsContext)
}
