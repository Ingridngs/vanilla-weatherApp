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

function showTemperature(response) {
    let dataTemp = document.querySelector('#temperature')
    dataTemp.innerHTML = Math.round(celciusTemp)
    celciusTemp = Math.round(response.data.main.temp)
    let dataCity = document.querySelector('#city')
    dataCity.innerHTML = response.data.name
    let dataDescription = document.querySelector('#description')
    dataDescription.innerHTML = response.data.weather[0].description
    let dataWind = document.querySelector('#wind')
    dataWind.innerHTML = response.data.wind.speed
    let dataHumidity = document.querySelector('#humidity')
    dataHumidity.innerHTML = response.data.main.humidity
    let dataDate = document.querySelector('#lastupdate')
    dataDate.innerHTML = formatDate(response.data.dt * 1000)
    let iconElement = document.querySelector('#icon')
    iconElement.setAttribute(
        'src',
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    )
    iconElement.setAttribute('alt', response.data.weather[0].description)
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