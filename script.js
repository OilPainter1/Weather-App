var APIKey = "b0dae24107c6909617e7f4fbbd653e80"
var searches = []

for (var i = 0; i<localStorage.length;i++){
    searches[i]=localStorage.getItem(localStorage.key(i))
}
loadLocalStorage()


var searchBtn = document.getElementById("searchButton")

    function handleSearch(){
        
        
        var searchedWeather= document.querySelector("input").value
        removeWeatherForecastBlocks()
    
        fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + searchedWeather +"&appid=" + APIKey)
            .then(function(response){
                console.log(response)
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
                    console.log(data)
                    loadWeatherForecast(data)
                    addSearchToRecentSearches(data)
                })
            })
    }

    function loadWeatherForecast(data){
        for(var i=0;i<40;i=i+8){
            var weatherDayForecast= document.createElement("div")
            var WeatherBarDiv=document.getElementById("weatherDisplay")
            weatherDayForecast.style.fontSize="Medium"
            weatherDayForecast.style.fontWeight="bold"           
            weatherDayForecast.style.maxWidth="150px"
            weatherDayForecast.style.color="black"
            var link = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon +"@2x.png"
            weatherDayForecast.style.backgroundImage="url(" + link +")"
            WeatherBarDiv.appendChild(weatherDayForecast)
            
            
            
            
            
            weatherDayForecast.textContent=data.city.name +": " + moment.unix(data.list[i].dt).format("MMMM Do YYYY, h:mm a") 
               + " Temp: " + data.list[i].main.temp + " Wind Speed: " 
               + data.list[i].wind.speed + " mph Humidity: " + data.list[i].main.humidity + "%"
            weatherDayForecast.style.padding="10px"
            weatherDayForecast.style.margin="5px"
            weatherDayForecast.style.backgroundColor="bisque"

        }
    }

    function addSearchToRecentSearches(data){
        var element=document.createElement("div")
        
        var recentSearchItem= document.getElementById("results").appendChild(element)
        recentSearchItem.setAttribute("class","searchItems")
        recentSearchItem.textContent=data.city.name
        recentSearchItem.addEventListener("click",function(){
            document.querySelector("input").value = data.city.name
            handleSearch()
        })
        localStorage.setItem("search" +":" + data.city.name, data.city.name)
        
    }

   function loadLocalStorage() {
    for(var i =0; i <localStorage.length;i++){
        var element=document.createElement("div")
        
        var recentSearchItem= document.getElementById("results").appendChild(element)
        recentSearchItem.setAttribute("class","searchItems")
        recentSearchItem.textContent=localStorage.getItem(localStorage.key(i))
        recentSearchItem.addEventListener("click",function(){
            document.querySelector("input").value = this.textContent
            handleSearch()
        })

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

function clear(){
    localStorage.clear()
    var searchResults=document.getElementById("results")
    while(searchResults.lastChild.textContent != "Recent Searches:"){
        searchResults.removeChild(searchResults.lastChild)
    }
}

document.querySelector("#clearSearchHistory").addEventListener("click",clear)
    