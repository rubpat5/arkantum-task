import axios from 'axios' // some http client lib

// const endpoint = process.env.REACT_APP_SERVICE_URI ?
//   process.env.REACT_APP_SERVICE_URI :
//   'https://geo.ipify.org/api/v2/country?apiKey=at_9nQvKXzFgN4QBIWtDALM3JLtiZsvp&ipAddress=69.63.176.13\n'

const endpoint =
  'https://geo.ipify.org/api/v2/country,city?apiKey=at_9nQvKXzFgN4QBIWtDALM3JLtiZsvp\n'

export default {
  getIPInfo (name, value) {
    return axios.get(`${endpoint}&${name}=${value}`).then(response => {
      console.log(response.data)
      return response.data
    }).catch(err => {
      console.error(err.message)
      throw err
    })
  }
}
