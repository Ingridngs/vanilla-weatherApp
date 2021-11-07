function formatDate(timestamp) {
    let date = new Date(timestamp)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let day = date.getDay()

    return `${day} ${hours}: ${minutes}`
}

function showTemperature(response) {
    let dataTemp = document.querySelector('#temperature')
    dataTemp.innerHTML = Math.round(response.data.main.temp)
    let dataCity = document.querySelector('#city')
    dataCity.innerHTML = response.data.name
    let dataDescription = document.querySelector('#description')
    dataDescription.innerHTML = response.data.weather[0].description
    let dataWind = document.querySelector('#wind')
    dataWind.innerHTML = response.data.wind.speed
    let dataDate = document.querySelector('#lastupdate')
    dataDate.innerHTML = formatDate(response.data.dt * 1000)
}

let apiKey = '8c7039eba87f78f3a90f7f73da79726f'
let city = 'New York'
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(showTemperature)