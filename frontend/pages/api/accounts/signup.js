import { API_URL } from "config";

export default async (request, response) => {
  if (request.method === 'POST') {
    const {
      publicAddressFromUser
    } = request.body

    try {
      const apiResponse = await fetch(`${API_URL}/api/accounts/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: {
          publicAddress: `${publicAddressFromUser}`
        }
      })

      const data = await apiResponse.json()

      if (apiResponse.status === 201) { // from server
        return response.status(201).json({ success: data.success }) // sends to next js client
      } else {
        return response.status(apiResponse.status).json({ error: data.error}) // grabs error reponse from server and returns it to client
      }

    } catch (error) {
      return response.status(500).json({
        'error': 'something went wrong when registering the account'
      })
    }
  } else {
    response.setHeader('Allow', ['POST'])
    return response.status(405).json({ 'error':`Method ${request.method} not allowed` })
  }
}