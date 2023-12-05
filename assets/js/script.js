let formIDEL = $("#city-search");
let sectionIDEL = $("#section");
let submitBtnEL = $(".btn");
let cityNameEl = $("#city-name");
let tempEL = $("#temp");
let windEL = $("#wind");
let humidityEL = $("#humidity");
let input = $("#search");
let img = $("#img")

sectionIDEL.on("click", ".btn", addButton);

// event listener for submit button
function addButton(event) {
    let textValue = input.val().trim();
        console.log(textValue);
    
    let buttonName = $("<button>");
    buttonName.text(textValue);
    buttonName.attr("id", "name-button");
    formIDEL.append(buttonName);
    creatObject(textValue);
    event.preventDefault();
}

// function to create header
function creatObject(value){
    let cityNametURL = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=3b3153aacbf761a7477c9bcfe312b0cc`

    fetch(cityNametURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data[0].lon);
            console.log(data[0].lat);
            let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=3b3153aacbf761a7477c9bcfe312b0cc`
            fetch(weatherURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.list[0].main.temp);
            console.log(data.list[0].main.humidity);
            console.log(data.list[0].wind.speed);
            cityNameEl.text(`${data.city.name} (${data.list[0].dt_txt})`);
            tempEL.text(`Temp: ${data.list[0].main.temp} °F`);
            windEL.text(`Wind: ${data.list[0].wind.speed} MPH`);
            humidityEL.text(`Humidity: ${data.list[0].main.humidity} %`);
            img.attr("src", "https://openweathermap.org/img/wn/10d@2x.png")
        })
        })
    }