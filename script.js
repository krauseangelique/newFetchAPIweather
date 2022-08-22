const output = document.getElementById("app");
const city = "Liège";
const counter = 3;
const key = "4bbff4a3c69a9b2c5ec037d55762eb79";
const months = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];
const days = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=${counter}&units=metric&appid=${key}&lang=fr`;

fetch(url)
  .then((response) => response.json())
  .then((datas) => {
    const dataList = datas.list;
    dataList.forEach((data) => {
      const template = document.querySelector("template");
      const clone = document.importNode(template.content, true);
      const day = clone.getElementById("day");
      //   const city = clone.getElementById("city");
      const imgCloud = clone.getElementById("cloud");
      const tempMax = clone.getElementById("tempMax");
      const tempMin = clone.getElementById("tempMin");
      const wind = clone.getElementById("wind");
      const descr = clone.getElementById("descr");
      let date = new Date(data.dt_txt);

      // Afficher les données dans le navigateur
      // day.textContent = date.getDate();
      day.textContent = `
      ${days[date.getDay()]} 
      ${date.getDate()} 
      ${months[date.getMonth()]} 
      ${date.getFullYear()} 
      (${date.getHours()}h)`;
      //   city.textContent = data.city;
      imgCloud.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      output.appendChild(clone);
      tempMax.textContent = `${Math.round(data.main.temp_max)} °C`;
      tempMin.textContent = `${Math.round(data.main.temp_min)} °C`;
      wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
      descr.textContent = data.weather[0].description.toUpperCase();
    });
  })
  .catch((er) => console.log(er));
