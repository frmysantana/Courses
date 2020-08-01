const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=afd84c6e94694a261604501a77d56052&query=37.8267,-122.4233&units=f'

// request({ url , json: true}, (err, res) => {
//     // console.log(res.body.current)

//     const temperature = res.body.current.temperature
//     const feelsLike = res.body.current.feelslike
//     const description = res.body.current.weather_descriptions[0]
//     console.log(`${description}. It is currently ${temperature} degrees out. It feels like ${feelsLike} degrees out.`)
// })

const token = 'pk.eyJ1IjoiZnJteXNhbnRhbmEiLCJhIjoiY2tjbmV6MGl3MDE3YzJ5b2I3dHpvazltMCJ9.I2ZXJzW0uhg8OPIG6mQemA'

const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${token}&limit=1`

request({url: geoCodeURL, json: true}, (err, res) => {
    const longitude = res.body.features[0].center[0]
    const lattitude = res.body.features[0].center[1]
    console.log(`Lattitude: ${lattitude}. Longitude: ${longitude}`)
})