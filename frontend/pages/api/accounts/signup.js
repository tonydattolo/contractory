import { API_URL } from "config";

export default async (request, response) => {
  if (request.method === 'POST') {
    
  } else {
    response.setHeader('Allow', ['POST'])
    return response.status(405).json('error':`Method ${request.method} not allowed`)
  }
}