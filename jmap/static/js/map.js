

//Определяем карту, координаты центра и начальный масштаб
var map = L.map('map').setView([56.326944, 44.0075], 6);

//Добавляем на нашу карту слой OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function onEachFeature(feature, layer) {
    var popupContent = "<p>I started out as a GeoJSON " +
            feature.geometry.type + ", but now I'm a Leaflet vector!</p>";

    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}

var testLayer = L.geoJson(test, {

    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: baseballIcon});
    },

    onEachFeature: onEachFeature
}).addTo(map);

L.control.scale().addTo(map);

