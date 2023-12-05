let formIDEL = $("#city-search");
let sectionIDEL = $("#section");
let submitBtnEL = $(".btn");
let cityNameEl = $("#city-name");
let tempEL = $("#temp");
let windEL = $("#wind");
let humidityEL = $("#humidity");
let input = $("#search");

sectionIDEL.on("click", ".btn", addButton);

function addButton(event) {
    let textValue = input.val();
        console.log(textValue);
    
    let buttonName = $("<button>");
    buttonName.text(textValue);
    buttonName.attr("id", "name-button");
    formIDEL.append(buttonName);

    event.preventDefault();
}