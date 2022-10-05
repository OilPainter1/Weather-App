var APIKey = "b0dae24107c6909617e7f4fbbd653e80"

var searchBtn = document.getElementById("searchButton")

function handleSearch(){
    var searchedWeather= document.querySelector("input").value
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=Madison&appid=" + APIKey)
    .then(function(response){
        console.log(response.json())

    })
    
    
}

searchBtn.addEventListener("click",handleSearch)