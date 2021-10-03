const api = {
  key: "c24c3d671ee1c125a99c6fbe56fedec5",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then((weather) => {
      console.log(weather);
      buildMap(weather.coord.lat, weather.coord.lon);
    });
}

function buildMap(lat, lon) {
  document.getElementById("mapid").innerHTML =
    "<div id='map' style='width: 850px; height: 1000px;'></div>";
  const mymap = L.map("map").setView([lat, lon], 12);
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(mymap);

  // todo map
  var todoMap = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 17,
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    }
  );
  // water color map
  var watercolor = L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",
    {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: "abcd",
      minZoom: 1,
      maxZoom: 16,
      ext: "jpg",
    }
  );
  //ersi world map
  var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
  );

  // Making a marker with a custom icon
  const icon1 = L.icon({
    iconUrl: "img/placeholder (1).png",
    iconSize: [38, 65],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  let marker1 = L.marker([16.461109, 107.570183], { icon: icon1 });
  var popup1 = marker1
    .bindPopup(
      "<h1> Temperature Information </h1><p>Sunny at  + marker1.getLatLng() </p>"
    )
    .openPopup();
  popup1.addTo(mymap);

  const icon2 = L.icon({
    iconUrl: "img/rainny1.png",
    iconSize: [38, 65],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  let marker2 = L.marker([16.5134, 107.5636], { icon: icon2 });
  var popup2 = marker2
    .bindPopup("Rainny at " + marker2.getLatLng())
    .openPopup();
  popup2.addTo(mymap);
  09;

  const icon3 = L.icon({
    iconUrl: "img/tree.png",
    iconSize: [38, 65],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  var photoImg = '<img scr="./img/rice1.png"/>';
  let marker3 = L.marker([16.4242, 107.59574], { icon: icon3 });
  // var popup3 = marker3.bindPopup("Tree at " + marker3.getLatLng()).openPopup();
  var popup3 = marker3
    .bindPopup(
      "<h1> Agriculture Informations </h1> <p>Rice plants:  </p> <p>Shallow crops(corn, peanuts, cassava, potatoes):  </p> <p>Industrial crops: </p> <img scr='img/rice2.jpg' />"
    )
    .openPopup();
  popup3.addTo(mymap);

  const icon4 = L.icon({
    iconUrl: "img/pin.png",
    iconSize: [38, 65],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });
  let marker4 = L.marker([16.521, 107.6432], { icon: icon4 });
  var popup4 = marker4
    // .bindPopup("Disaster at " + marker4.getLatLng())
    .bindPopup("Disaster at " + marker4.getLatLng())
    .openPopup();
  popup4.addTo(mymap);

  //Layer controller
  var baseMaps = {
    OSM: tiles,
    "Todo Map": todoMap,
    "Water color map": watercolor,
    "Esri_World map": Esri_WorldImagery,
  };

  var overlayMaps = {
    marker1: marker1,
    marker2: marker2,
    marker3: marker3,
  };
  L.control.layers(baseMaps, overlayMaps).addTo(mymap);
}
