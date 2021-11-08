let celciusTemp = null

function formatDate(timestamp) {
    let date = new Date(timestamp)
    let hours = date.getHours()
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]
    let day = days[date.getDay()]

    return `${day} ${hours}:${minutes}`
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    let day = date.getDate()
    let weekdays = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Frid',
        'Sat',
    ]

    return weekdays[day]
}

function displayForecast(response) {
    let dailyForecast = response.data.daily
    let forecastElement = document.querySelector('#forecast')
    let forecastHTML = `<div class="row">`

    dailyForecast.forEach(function(forecast, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `
                 <div class="col-2">
                            <div class="weather-forecast-day">
                                ${formatDay(forecast.dt)}
                            </div>
                            <img src="https://openweathermap.org/img/wn/${
                              forecast.weather[0].icon
                            }@2x.png"
                                alt="" width="50px" />
                            <div class="weather-forecast-temperatures">
                                <span class="weather-forecast-maximum">${Math.round(
                                  forecast.temp.max,
                                )}°</span>
                                <span class="weather-forecast-minimun">${Math.round(
                                  forecast.temp.min,
                                )}°</span>
                            </div>
                        </div>
                    `
        }
    })

    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML
}

function getForecast(coordinates) {
    let latitude = coordinates.lat
    let longitude = coordinates.lon
    let apiKey = '8c7039eba87f78f3a90f7f73da79726f'
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast)
}

function showTemperature(response) {
    let dataTemp = document.querySelector('#temperature')
    let dataCity = document.querySelector('#city')
    let dataDescription = document.querySelector('#description')
    let dataWind = document.querySelector('#wind')
    let dataHumidity = document.querySelector('#humidity')
    let dataDate = document.querySelector('#lastupdate')
    let iconElement = document.querySelector('#icon')
    dataTemp.innerHTML = Math.round(celciusTemp)
    celciusTemp = Math.round(response.data.main.temp)
    dataCity.innerHTML = response.data.name
    dataDescription.innerHTML = response.data.weather[0].description
    dataWind.innerHTML = response.data.wind.speed
    dataHumidity.innerHTML = response.data.main.humidity
    dataDate.innerHTML = formatDate(response.data.dt * 1000)
    iconElement.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    )
    iconElement.setAttribute('alt', response.data.weather[0].description)

    getForecast(response.data.coord)
}

function search(city) {
    let apiKey = '8c7039eba87f78f3a90f7f73da79726f'
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    axios.get(apiUrl).then(showTemperature)
}

function handleSubmit(event) {
    event.preventDefault()
    let cityInputElement = document.querySelector('.city-input')
    search(cityInputElement.value)
}

function displayFarenheit(event) {
    event.preventDefault()
    let convertFarenheit = Math.round((celciusTemp * 9) / 5 + 32)
    let temperatureElement = document.querySelector('#temperature')
    celsius.classList.remove('active')
    farenheit.classList.add('active')
    temperatureElement.innerHTML = convertFarenheit
}

function displayCelsius(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector('#temperature')
    celsius.classList.add('active')
    farenheit.classList.remove('active')
    temperatureElement.innerHTML = celciusTemp
}

let getCity = document.querySelector('#search-form')
getCity.addEventListener('submit', handleSubmit)

let farenheit = document.querySelector('#farenheit-link')
farenheit.addEventListener('click', displayFarenheit)

let celsius = document.querySelector('#celsius-link')
celsius.addEventListener('click', displayCelsius)

search('New York')