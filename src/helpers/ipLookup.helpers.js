import axios from 'axios'

import { IPLOOKUP } from '../config/config'

export const ipLookup = async (ip) => {
  try {
    const { data } = await axios.get(`${IPLOOKUP.apiUrl}/${ip}`, {
      headers: {
        'X-RapidAPI-Key': IPLOOKUP.apiKey,
        'X-RapidAPI-Host': IPLOOKUP.apiHost
      }
    })
    return {
      ip: data.ip,
      country: data.country.name,
      latitude: data.location.latitude,
      longitude: data.location.longitude
    }
  } catch (err) {
    console.log(err)
  }
}
