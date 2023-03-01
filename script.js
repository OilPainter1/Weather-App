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

     
            fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + searchedWeather +"&appid=" + APIKey)
            .then(function(response){
                var jsonData= response.json()
                return jsonData 
            })
            .then(function(data){
                var lat = data[0].lat
                var lon = data[0].lon
                fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
                .then(function(response){
                    jsonData=response.json()
                    return jsonData
                })
                .then(function(data){
                    loadWeatherForecast(data)
                    addSearchToRecentSearches(data)
                })
            })

      
    }

    function loadWeatherForecast(data){
        
            var weatherDayForecast= document.createElement("div")
            var WeatherBarDiv=document.getElementById("weatherDisplay")
            var locationHeader = document.createElement("h2")
            var timeHeader = document.createElement("h4")
            var tempHeader = document.createElement("h4")
            var windHeader = document.createElement("h4")
            var humidityHeader = document.createElement("h4")

            
            humidityHeader.textContent = "Humidity: " + data.main.humidity + "%"
            tempHeader.innerHTML = "Temperature: " + data.main.temp + " &#8457;"
            timeHeader.textContent = moment.unix(data.dt).format("MMMM Do YYYY, h:mm a")
            locationHeader.textContent = data.name
            windHeader.textContent = "Wind speed: " + data.wind.speed + " mph"

            var dataHeaders = [locationHeader,timeHeader,tempHeader,windHeader,humidityHeader]

            dataHeaders.forEach(Header => {
                weatherDayForecast.appendChild(Header)
            });

            weatherDayForecast.style.fontSize="Medium"
            weatherDayForecast.style.fontWeight="bold"           
            weatherDayForecast.style.maxWidth="400px"
            weatherDayForecast.style.color="black"
            weatherDayForecast.style.padding="10px"
            weatherDayForecast.style.margin="5px"
            weatherDayForecast.style.backgroundColor="bisque"

            WeatherBarDiv.setAttribute("class","container")

            WeatherBarDiv.appendChild(weatherDayForecast)

        
    }
    

    function addSearchToRecentSearches(data){
        var element=document.createElement("div")
        
        var recentSearchItem= document.getElementById("results").appendChild(element)
        recentSearchItem.setAttribute("class","searchItems")
        recentSearchItem.textContent=data.name
        recentSearchItem.addEventListener("click",function(){
            document.querySelector("input").value = data.name
            handleSearch()
        })
        localStorage.setItem("search" +":" + data.name, data.name)
        
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
                document.getElementById("weatherDisplay").removeChild(document.getElementById("weatherDisplay").firstChild) 
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
    