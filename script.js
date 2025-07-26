const searchButton = document.getElementById("search");

const mainDegree = document.getElementById("degree");
const currentLocation = document.getElementById("location");
const speed = document.getElementById("speed");
const humidity = document.getElementById("humidity");

let cityName = null;
let errorData = null;
let weatherData = null;

function updateValues(){
  mainDegree.innerHTML = parseInt(weatherData.main.temp - 273.15).toString() + "&deg;";
  speed.innerHTML = weatherData.wind.speed.toString();
  humidity.innerHTML = parseInt(weatherData.main.humidity).toString() + "&percnt;";
  currentLocation.innerHTML = cityName.toUpperCase();
}

async function fetchData() {

  function apiKey(){
    let value = "";
    let one = "79f435cb04069e03";
    let two = "f5fe4a04f0e7c3f3";
    let eCount = 0;
    let oCount = 0;
    for(let i=0; i<32; i++){
      if(i%2 == 0){
        value += one[eCount];
        eCount++;
      }else{
        value += two[oCount];
        oCount++;
      }
    }
    return value;
  }

  try{
    searchButton.disabled = true;
    searchButton.innerHTML = "searching..."
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey()}`)
    weatherData = await data.json();
    updateValues();
    searchButton.innerHTML = "Search"
    searchButton.disabled = false;
  }catch(error){
    searchButton.innerHTML = "Search"
    searchButton.disabled = false;
    alert("Invalid")
  }
}

searchButton.addEventListener("click", () => {
  cityName = document.getElementById("city-name").value;
  if (cityName) {
    fetchData();
  }
});
