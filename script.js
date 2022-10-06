var APIKey = "b0dae24107c6909617e7f4fbbd653e80"

var searchBtn = document.getElementById("searchButton")

function handleSearch(){
    var searchedWeather= document.querySelector("input").value
    removeWeatherForecastBlocks()
    
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + searchedWeather +"&appid=" + APIKey)
        .then(function(response){
            var jsonData= response.json()
            return jsonData
            
        })
        .then(function(data){
            
            var lat = data[0].lat
            var lon = data[0].lon
            fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat +"&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
            .then(function(response){
               jsonData=response.json()
               return jsonData
            })
            .then(function(data){
                loadWeatherForecast(data)
            })
           

            

        })
      
    
   
}

function loadWeatherForecast(data){
    console.log(data)
    for(var i=0;i<40;i=i+8){
        var weatherDayForecast= document.createElement("div")
        var WeatherBarDiv=document.getElementById("weatherDisplay")
        WeatherBarDiv.appendChild(weatherDayForecast)
        

        weatherDayForecast.textContent=data.city.name +": " + moment.unix(data.list[i].dt).format("MMMM Do YYYY, h:mm a") +" Temp: " + data.list[i].main.temp
        weatherDayForecast.style.padding="10px"
        weatherDayForecast.style.margin="5px"
        weatherDayForecast.style.backgroundColor="Linen"

        
        
    }
}


function removeWeatherForecastBlocks(){
    if(document.getElementById("weatherDisplay").firstChild!=null){
        for(var i= 0;i<5;i++){
            document.getElementById("weatherDisplay").removeChild(document.getElementById("weatherDisplay").firstChild)
        }
    } else{
        return
    }

}



searchBtn.addEventListener("click",handleSearch)