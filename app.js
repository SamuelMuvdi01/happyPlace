const cityName = document.getElementById("city-name");
const tempNum = document.getElementById("temp-num");
document.getElementById('selection-box').addEventListener('change', function() {
    console.log(this.value);
});

const key = '5bc768cc9df2685fbc7ab678cfaeb95e';

function getInput() {
    var userInput = document.getElementById('search-box').value;
    console.log(userInput);
    document.getElementById("city-name").innerHTML = userInput;
}

var subButton = document.getElementById('submit-button');
subButton.addEventListener('click', getInput, false);




const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
