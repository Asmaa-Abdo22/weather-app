// &------------------ HTML ELEMENTS----------------
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
// ^----------FIRST DAY -----------
const item1 = document.getElementById("item1");
// ^----------SECOND DAY -----------
const item2 = document.getElementById("item2");
// ^-------------THIRD DAY ---------
const item3 = document.getElementById("item3");
// &------------------GLOBAL VARIABLES -------------
let data = {};
let inputValue = searchInput.value;
let currentDate = new Date();
let month = currentDate.toLocaleString("default", { month: "long" }); //january
let day = currentDate.toLocaleString("default", { weekday: "long" }); //sunday
// &------------------ FUNCTIONS -------------------
async function getData(cityName) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?Key=%20ccfb4b43ed9148a3ab2230152240601&q=${cityName}&days=3`
  );

  if (response.ok == true) {
    data = await response.json();
    display();
  }
  console.log(data);
  console.log(data.location.name);
}
getData("alaska");
//*************************************
function display() {
  // first day
  let firstDay = ` <div class="item">
  <div class="day d-flex justify-content-between text-light p-2">
    <span >${day}</span>
    <span >${currentDate.getDate() + ` ` + month}</span>
  </div>
  <div class="city p-3">
    <h5 class="text-light my-4" >${data.location.name}</h5>
    <div
      class="degree text-light d-flex justify-content-between mb-3"
    >
      <span class="display-1 fw-bold"> <span >${
        data.current.temp_c
      }</span><sup>o</sup>c</span>
      <img  src="${data.current.condition.icon}" class="s-50"></img>
    </div>
    <p class="text-cloudy" >${data.current.condition.text}</p>
    <div class="d-flex justify-content-around align-items-center text-grey">
    <span>
    <i class="fa-solid fa-umbrella"></i>
    ${data.current.humidity} %
    </span>
    <span>
    <i class="fa-solid fa-wind"></i>
    ${data.current.wind_kph} km/h
    </span>
    <span>
    <i class="fa-regular fa-compass"></i>
    ${data.current.wind_kph}
    </span>
  </div>
  </div>
</div>
  `;
  item1.innerHTML = firstDay;
  //**********************************
  // second day
  let nextttDay = new Date(data.forecast.forecastday[1].date);
  console.log(nextttDay);
  let tomorrowDay = nextttDay.toLocaleString("default", { weekday: "long" });
  console.log(tomorrowDay)
  let secondDay = ` <div class="item text-center dark">
  <p class="day text-light p-2" id="secondDay">${tomorrowDay}</p>
  <div class="py-3">
    <img src="${data.forecast.forecastday[1].day.condition.icon}" ></img>
    <p class="text-light fw-bold pb-1  fs-3" ><span>${data.forecast.forecastday[1].day.maxtemp_c}</span><sup>o</sup>c</p>
    <p class="text-grey fw-bold pb-4  fs-6" ><span >${data.forecast.forecastday[1].day.mintemp_c}</span><sup>o</sup></p>
    <p class="text-cloudy pb-4" id="scndState">${data.forecast.forecastday[1].day.condition.text}</p>
  </div>
</div>
  `;
  item2.innerHTML = secondDay;
  //************************************
  // third day
  let after= new Date(data.forecast.forecastday[2].date)
  console.log(after)
  let afterTomorrow= after.toLocaleString("default",  { weekday: "long" })
  let thirdDay = `<div class="item text-center">
     <p class="day text-light p-2">${afterTomorrow}</p>
     <div class="py-3">
       <img class=" fs-3" src="${data.forecast.forecastday[2].day.condition.icon}"></img>
       <p class="text-light fw-bold pb-1 fs-3">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>c</p>
       <p class="text-grey fw-bold pb-4 fs-6" ><span >${data.forecast.forecastday[2].day.mintemp_c} </span><sup>o</sup></p>
       <p class="text-cloudy pb-4 ">${data.forecast.forecastday[2].day.condition.text}</p>
     </div>
   </div>`;
  item3.innerHTML = thirdDay;
}
// &------------------ EVENTS ----------------------
searchInput.addEventListener("input", function () {
  // console.log(searchInput.value)
  getData(searchInput.value);
});
searchBtn.addEventListener("click", function () {
  getData(searchInput.value);
});
