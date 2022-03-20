// get elements
const search_input = document.querySelector(".search-bar")
const cidade = document.querySelector(".cidade")
const date = document.querySelector(".data")
const temp = document.querySelector(".temp")
const ceuAtual = document.querySelector(".ceuAtual")

// API
const api = {
    key: "3cbfc12f0323fd1b93519a5fc64f7d41",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

// dateBuilder(new Date())
const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
}


search_input.addEventListener('keypress', enter)
function enter(event){
    key = event.keyCode
    if(key === 13) {
        searchResults(search_input.value);
    }
}

// ask for geolocation on load
window.addEventListener('load', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    }
    else {
        alert("Navegador não suporta geolocalização");
    }
    function setPosition(position){
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        coordResults(lat, long);
    }
    function showError(error){
        alert(`erro: ${error.message}`)
    }
})

// fetch api lat-lon
function coordResults(lat, long) {
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
        .then(response => {            
            if(!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
            })
            .catch(error => {
            alert(error.message)
            })
            .then(response => {
            displayResults(response)
            
            });
}


// fetch api city
function searchResults(city){
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then((response) => {
    if(!response.ok) {
        throw new Error(`http error: status ${response.status}`)
    }
    return response.json();
    })
    .catch(error => {
    alert(error.message)
    })
    .then(response => {
    displayResults(response)
    });
}

function displayResults(weather) {
    ceuAtual.innerText = `${weather.weather[0].description}`

    temp.innerText = `${Math.round(weather.main.temp)}°`

    cidade.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = dateBuilder(new Date());
}