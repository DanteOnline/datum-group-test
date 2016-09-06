//Определяем карту, координаты центра и начальный масштаб
var map = L.map('map').setView([56.326944, 44.0075], 3);
 
//Добавляем на нашу карту слой OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function popUp(f,l){
    var out = [];
    if (f.properties){
        for(key in f.properties){
            out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));
    }
}
var jsonTest = new L.GeoJSON.AJAX(["go"],{onEachFeature:popUp}).addTo(map);