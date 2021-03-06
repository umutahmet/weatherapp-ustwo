export const getWeatherData = () => {
  return getPosition()
    .then(position => getByCoords(position.coords.latitude, position.coords.longitude))
    .then(owmResponse => owmResponse.json())
    .then(data => {
      console.log({ data })
      return formatWeatherData(data)
    })
    .catch(error => {
      console.error({ error })
      return getErrorMessage(error)
    })
}

const getPosition = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position)
      },
      error => {
        reject(error)
      }
    )
  })

const getByCoords = (lat, lon) => {
  console.log('fetching')
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=OPEN_WEATHER_KEY`)
}

const getCardinalDirection = deg => {
  const val = Math.floor(deg / 22.5 + 0.5)
  const arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return arr[val % 16]
}

const convertKelvinToCelsius = kelvin => {
  const celsius = kelvin - 273.15
  return Math.round(celsius)
}

const convertKelvinToFahrenheit = kelvin => {
  const fahrenheit = (kelvin - 273.15) * 1.8 + 32
  return Math.round(fahrenheit)
}

const convertMPSToKMH = val => {
  const kmh = (((val * 3600) / 1610.3) * 1000) / 1000
  return Math.round(kmh)
}

const formatWeatherData = ({ name, main, weather, wind }) => ({
  icon: weather[0].icon,
  description: weather[0].main,
  location: name,
  temp: {
    c: convertKelvinToCelsius(main.temp),
    f: convertKelvinToFahrenheit(main.temp),
  },
  wind: {
    direction: getCardinalDirection(wind.deg),
    speed: convertMPSToKMH(wind.speed),
  },
  humidity: main.humidity,
  pressure: main.pressure,
})

const getErrorMessage = ({ message }) => {
  if (message) {
    if (message === 'User denied Geolocation') {
      return "It looks like we couldn't get access to your location. Check your browser settings and try again."
    }
    return message
  }
  return 'Something went wrong'
}

export const icons = {
  default: 'images/cloud.svg',
  Thunderstorm: 'images/cloud-lightning.svg',
  Drizzle: 'images/rain.svg',
  Rain: 'images/rain.svg',
  Snow: 'images/rain.svg',
  Clear: 'images/sunny.svg',
  Clouds: 'images/cloud.svg',
}
