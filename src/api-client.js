import axios from 'axios';

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
