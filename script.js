'use strict'

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form')
const containerWorkouts = document.querySelector('.workouts')
const inputType = document.querySelector('.form__input--type')
const inputDistance = document.querySelector('.form__input--distance')
const inputDuration = document.querySelector('.form__input--duration')
const inputCadence = document.querySelector('.form__input--cadence')
const inputElevation = document.querySelector('.form__input--elevation')

//Checking if browser is supporting geolocation
if ('geolocation' in navigator) {
  // Geolocation is available
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  function successCallback (position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    console.log(`https://www.google.com/maps/@26.929745,80.934703`)
    const coords = [latitude, longitude]
    let map = L.map('map').setView(coords, 14)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    L.marker(coords).addTo(map).bindPopup('Home').openPopup()

    map.on('click', onMapClick)
    function onMapClick (e) {
      const { lat, lng } = e.latlng
      let newMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup'
          })
        )
        .setPopupContent('workout')
        .openPopup()
      const formElement = document
        .querySelector('.form')
        .classList.remove('hidden')
    }
  }

  function errorCallback (error) {
    console.error(error.message)
  }
} else {
  // Geolocation is not available
  console.error('Geolocation is not supported in this browser.')
}
