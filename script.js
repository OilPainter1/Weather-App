var APIKey = "b0dae24107c6909617e7f4fbbd653e80"

var searchBtn = document.getElementById("searchButton")

function handleSearch(){
    var searchedWeather= document.querySelector("input").value
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
                console.log(data)
            })
           

            

        })
      
    
   
}





searchBtn.addEventListener("click",handleSearch)