const express = require('express');
const axios = require('axios')
const cors = require('cors')
require('dotenv').config();


const app = express();

app.use(express.json())
app.use(cors())

app.get('/api/countries', (request, response) => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(countriesResponse => {
        const countriesData = countriesResponse.data
        response.json(countriesData)
    })
})

app.get('/api/countries/:id', (request, response) => {
    const id = request.params.id

    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(countriesResponse => {
        const countriesData = countriesResponse.data
        const foundCountry = countriesData.find(country => country.cca2 === id)
        response.json(foundCountry)
    })


})

app.get('/api/weather/:id', (request, response) => {
    const id = request.params.id
    const apiKey = process.env.API_KEY

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${id}&appid=${apiKey}&units=metric`)
    .then(weatherResponse => {
        const weatherData = weatherResponse.data
        response.json(weatherData)
    })
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)