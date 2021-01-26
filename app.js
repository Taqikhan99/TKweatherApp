// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// months array
let months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// api use
const weatherapi={
    key:"db1db4eeee71b3bb7f6850f811bb33b1",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather?"
}

const searchInput=document.getElementById('inputbox');
let weatherIcon=document.getElementById('weathericon');


searchInput.addEventListener('keypress',function(event){

    // check for enter key
    if(event.keyCode==13){
        console.log(searchInput.value);
        getWeatherReport(searchInput.value);
        document.querySelector('.weatherbody').style.display='flex';
        setTimeout(()=>{
            searchInput.value='';
        },500);
        
    }
})


// get weather report
function getWeatherReport(city){
    fetch(`${weatherapi.baseUrl}q=${city}&appid=${weatherapi.key}&units=metric`)
    .then(weather=>{
        return weather.json();
    }).then(showWeatherReport);
}



// show weather function
function showWeatherReport(weather){
    console.log(weather);

    let city=document.getElementById('city');
    city.innerHTML=weather.name+', '+weather.sys.country;

    let temperature=document.getElementById('temp');
    temperature.innerHTML=Math.round(weather.main.temp)+'&deg;C';

    let feelLike=document.getElementById('feellike');
    feelLike.innerHTML='feels like: '+Math.round(weather.main.feels_like)+'&deg;C';

    let minMax=document.getElementById('maxmin');
    minMax.innerHTML='MIN: '+Math.floor(weather.main.temp_min)+'&deg;C / MAX: '+Math.ceil(weather.main.temp_max)+'&deg;C'

    let weatherType=document.getElementById('weatherEnv');
    weatherType.innerHTML=weather.weather[0].main;

    let date=document.getElementById('date');
    let todayDate=new Date();
    date.innerHTML=todayDate.getDate()+' '+months[todayDate.getMonth()]+' '+todayDate.getFullYear();


    // setting background based on weather type
    if(weatherType.textContent=='Clouds'){
        document.body.style.backgroundImage='url("images/cloudyback.jpg")';
        weatherIcon.src='images/005-cloudy.png';
    }
    else if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage='url("images/sunnyback.jpg")';
        weatherIcon.src='images/003-sunny.png';
    }
    else if(weatherType.textContent=='Rain'){
        document.body.style.backgroundImage='url("images/rainyback.jpg")';
        weatherIcon.src='images/009-rainy.png';
    }
    else if(weatherType.textContent=='Snow'){
        document.body.style.backgroundImage='url("images/snowback.jpg")';
        weatherIcon.src='images/006-snowy.png';
    }
    else if(weatherType.textContent=='Haze'){
        document.body.style.backgroundImage='url("images/haze.jpg")';
        weatherIcon.src='images/007-windy.png';
    }
    else if(weatherType.textContent=='Thunderstorm'){
        document.body.style.backgroundImage='url("images/thunderback.jpg")';
        weatherIcon.src='images/004-thunderstorm.png';
    }

}