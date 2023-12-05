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
let cityNameArray = [];

creatObject("Philadelphia");
// function to print text from local storage
function printCityName(){
    let storedCityName = JSON.parse(localStorage.getItem("CityName"));
    if(storedCityName !== null){
        cityNameArray = storedCityName;

        for(let i = 0; i < cityNameArray.length; i++){
            creatObject(cityNameArray[0]);
            let buttonName = $("<button>");
            buttonName.text(cityNameArray[i]);
            buttonName.attr("class", "city-button");
            formIDEL.append(buttonName);
        }
    } 
}
printCityName();
// function for submit button
function addButton(event) {
    let textValue = input.val().trim();
        console.log(textValue);
    cityNameArray.push(textValue);
    localStorage.setItem("CityName", JSON.stringify(cityNameArray));

    let buttonName = $("<button>");
    buttonName.text(textValue);
    buttonName.attr("class", "city-button");
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
            let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=3b3153aacbf761a7477c9bcfe312b0cc`
            
            fetch(weatherURL)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    cityNameEl.text(`${data.city.name} (${data.list[0].dt_txt})`);

                    tempEL.text(`Temp: ${data.list[0].main.temp} °F`);

                    windEL.text(`Wind: ${data.list[0].wind.speed} MPH`);

                    humidityEL.text(`Humidity: ${data.list[0].main.humidity} %`);

                    img.attr("src", `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);

                    remove();
                    cardPrinter(data);
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
        let cardImgEL = $("<img>");
        let cardTempEL = $("<p>");
        cardTempEL.attr("class", "card-text");
        let cardWindEL = $("<p>");
        cardWindEL.attr("class", "card-text");
        let cardHumidity = $("<p>");
        cardHumidity.attr("class", "card-text");
        cardGroupEL.append(cardEL);
        cardEL.append(cardBodyEL);
        cardBodyEL.append(dateHeadEL);
        cardBodyEL.append(cardImgEL);
        cardBodyEL.append(cardTempEL);
        cardBodyEL.append(cardWindEL);
        cardBodyEL.append(cardHumidity);
        dateHeadEL.text(`${value.list[i].dt_txt}`);
        cardImgEL.attr("src", `https://openweathermap.org/img/wn/${value.list[i].weather[0].icon}@2x.png`);
        cardTempEL.text(`Temp: ${value.list[i].main.temp} °F`);
        cardWindEL.text(`Wind: ${value.list[i].wind.speed} MPH`);
        cardHumidity.text(`Humidity: ${value.list[i].main.humidity} %`);
    }
}

// function to remove old cards
 function remove(){
    let sectionArrayEL = document.querySelectorAll(".card");
    console.log(sectionArrayEL);
    for(let i = 0; i < sectionArrayEL.length; i++){
        sectionArrayEL[i].remove();
    }
 }
    
// function for event listener for history buttons
let cityListenner = function(event){
    event.preventDefault();

    let cityName = event.target.innerText;
    console.log(cityName);
    creatObject(cityName);
}



// event listener for clear button
let clear = document.querySelector("#remove-button");
clear.addEventListener("click", function(){
    city = [];
    localStorage.setItem("CityName", JSON.stringify(city));
});
// event listener for history buttons
formIDEL.on("click", ".city-button", cityListenner);
// event listener for submit button
sectionIDEL.on("click", ".btn", addButton);