let formIDEL = $("#city-search");
let sectionIDEL = $("#section");
let submitBtnEL = $(".btn");
let cityNameEl = $("#city-name");
let tempEL = $("#temp");
let windEL = $("#wind");
let humidityEL = $("#humidity");
let input = $("#search");
let img = $("#img")
let cardGroupEL = $("#card-group")

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
            // console.log(data);
            // console.log(data.list[0].main.temp);
            // console.log(data.list[0].main.humidity);
            // console.log(data.list[0].wind.speed);
            cityNameEl.text(`${data.city.name} (${data.list[0].dt_txt})`);
            tempEL.text(`Temp: ${data.list[0].main.temp} °F`);
            windEL.text(`Wind: ${data.list[0].wind.speed} MPH`);
            humidityEL.text(`Humidity: ${data.list[0].main.humidity} %`);
            img.attr("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`)
            cardPrinter(data)
        })
        })
    }

    // function to add card for future day

    function cardPrinter(value){
        console.log(value);
        console.log(value.list[0].main.temp);
        console.log(value.list[0].main.humidity);
        console.log(value.list[0].wind.speed);
        for(let i = 4; i < value.list.length; i = i + 8){
        let cardEL = $("<section>");
        cardEL.attr("class", "card");
        let cardBodyEL = $("<article>");
        cardBodyEL.attr("class", "card-body");
        let dateHeadEL = $("<h5>");
        dateHeadEL.attr("class", "card-title");
        dateHeadEL.text(`${value.list[i].dt_txt}`);
        let cardImgEL = $("<img>");
        cardImgEL.attr("src", `https://openweathermap.org/img/wn/${value.list[i].weather[0].icon}@2x.png`);
        let cardTempEL = $("<p>");
        cardTempEL.attr("class", "card-text");
        cardTempEL.text(`Temp: ${value.list[i].main.temp} °F`);
        let cardWindEL = $("<p>");
        cardWindEL.attr("class", "card-text");
        cardWindEL.text(`Wind: ${value.list[i].wind.speed} MPH`);
        let cardHumidity = $("<p>");
        cardHumidity.attr("class", "card-text");
        cardHumidity.text(`Humidity: ${value.list[i].main.humidity} %`);
        cardGroupEL.append(cardEL);
        cardEL.append(cardBodyEL);
        cardBodyEL.append(dateHeadEL);
        cardBodyEL.append(cardImgEL);
        cardBodyEL.append(cardTempEL);
        cardBodyEL.append(cardWindEL);
        cardBodyEL.append(cardHumidity);
        }
    }