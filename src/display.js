import { getLatLon } from "./fetch-data"

const country = document.querySelector('select[name="country"]')
const countryState = document.querySelector('select[name="state"]')
const city = document.querySelector('input[name="city"]')

const form = document.forms['user-form']

const checkState = ()=>{
    if (form.country.value === 'US'){
        countryState.classList.remove('hidden')
        document.querySelector('.state').classList.remove('hidden')
        countryState.setAttribute('required','')
    } else {
        countryState.classList.add('hidden')
        document.querySelector('.state').classList.add('hidden')
        countryState.removeAttribute('required')
    }
}

const verifyData = ()=>{
    if (city.validity.valid && country.validity.valid){
        city.classList.remove('border-red-600')
        city.classList.remove('border-red-600')
        const cityValue = form.city.value
        const countryValue = form.country.value
        if(countryState.getAttribute('required') !== null){
            const stateValue = form.state.value
            getLatLon(countryValue,cityValue,stateValue)
        } else {
            getLatLon(countryValue,cityValue)
        }
    } else if (city.value === ''){
        city.setCustomValidity('Please Add Your City')
        city.reportValidity()
    }
}

const displayWeather = (data,system)=>{
    const weatherBox = document.getElementById('weather-info')
    const imgEl = document.querySelector('img')
    function formatWeatherType(weather){
        const removeFirstLetter = weather.slice(1) 
        const newFirstLetter = weather.charAt(0).toUpperCase()
        let formattedWeather = newFirstLetter.concat(removeFirstLetter)
        let finalWeather = formattedWeather
        if (weather.indexOf(' ') !== -1){
            const secondLetter = weather.charAt(weather.indexOf(' ')+1).toUpperCase()
            const secondWord = weather.slice(weather.indexOf(' ')+2)
            const formattedSecondWord = secondLetter.concat(secondWord)
            const removeSecondWord = formattedWeather.slice(0,formattedWeather.indexOf(' ')+1)
            let finalWeather = removeSecondWord.concat(formattedSecondWord)
            return finalWeather
        }
        return finalWeather
    }
    function formatWeatherNumbers(number){
        let newNumber = `${number}`
          if (newNumber.indexOf('.') !== -1){
              const indexOfDot = newNumber.indexOf('.')
              const finalNumber = newNumber.slice(0,indexOfDot)
              newNumber = finalNumber
              return newNumber
          }
        return newNumber
      }
    imgEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    imgEl.classList.remove('w-80')
    imgEl.classList.add('w-50')
    document.querySelector('main').classList.add('hidden')
    document.querySelector('h1').textContent = formatWeatherType(data.weather[0].description)
    document.querySelector('h2').innerHTML = `${formatWeatherNumbers(data.main.temp)} &deg;${system[0]}`
    document.querySelector('h2').classList.remove('hidden')
    weatherBox.children[0].innerHTML = `Feels like: ${formatWeatherNumbers(data.main.feels_like)} &deg;${system[0]}`
    weatherBox.children[1].textContent = `Humidity is at ${data.main.humidity}%`
    weatherBox.children[2].textContent = `Wind is ${formatWeatherNumbers(data.wind.speed)} ${system[1]} with gusts of ${formatWeatherNumbers(data.wind.gust)} ${system[1]}`
    weatherBox.classList.remove('hidden')
}

export {
    checkState,
    verifyData,
    displayWeather
}