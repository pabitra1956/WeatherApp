function getWeather() {
    const city = document.getElementById("city-input").value;
    const apiKey = "e3e3bc6382004fbeebce520ec644a60e";   // Replace with your API key
    if(city === "") {
        alert("Please enter a city name!");
        return;
    }
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod === "404") {
                document.getElementById("result").innerHTML = "<p>City not found!</p>";
                return;
            }
            const html = 
                "<h3>${data.name}</h3>"
 "<p><strong>Temperature:</strong> " + data.getMainTemp() + " °C</p>";
 "<p><strong>Humidity:</strong> " + data.getMain().gethumidity() + " %</p>";
 "<p><strong>Weather:</strong> " +  data.getweather().get(0).getDescription() + "</p>";
  "<p><strong>WindSpeed:</strong> " + data.getWind().getSpeed() + " m/s</p>";
            
document.getElementById("result").innerHTML=html;
})
    .catch(error=>
        console.error(error));
              }
