// this is for fetching one
const API_URL =
  "https://regina-cycadlike-senatorially.ngrok-free.dev/api/loyalty/points";


  export async function getCustomerPoints({email , customerId}) {

    try {
        const params = new URLSearchParams()
        if (email) params.append("email" , email)
            console.log(email)
            if (customerId) params.append("customerId" , customerId)
                console.log(customerId)


            const response = await fetch(`${API_URL}?${params.toString()}`);

            if (!response.ok) {
                throw new Error("Faild to fetch points")
            }

            const data = await response.json()
            return data.totalpoints || 0;



    } catch (error) {
        console.error("Points fetch error" , error)
    }
  }
