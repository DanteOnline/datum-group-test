//Определяем карту, координаты центра и начальный масштаб
//var map = L.map('map').setView([38.0242, 44.5919], 10);
var map = L.map('map', {
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
        text: 'Show coordinates',
        callback: showCoordinates
    }, {
        text: 'Center map here',
        callback: centerMap
    }, '-', {
        text: 'Zoom in',
        icon: '/static/js/images/zoom-in.png',
        callback: zoomIn
    }, {
        text: 'Zoom out',
        icon: '/static/js/images/zoom-out.png',
        callback: zoomOut
    }]
    }).setView([44.5919, 38.0242], 14);

function showCoordinates (e) {
    alert(e.latlng);
}

function centerMap (e) {
    map.panTo(e.latlng);
}

function zoomIn (e) {
    map.zoomIn();
}

function zoomOut (e) {
    map.zoomOut();
}
 
//Добавляем на нашу карту слой OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function popUp(f,l){
    var out = [];

      var contextMenuItems = [{
            text: 'Редактировать',
            callback: edit_item
        },
        {
            text: 'Удалить',
            callback: delete_item
        },
        ];

    l.bindContextMenu({
        contextmenu: true,
        contextmenuInheritItems: false,
        contextmenuItems: contextMenuItems
    });

    if (f.properties){
        for(key in f.properties){
            out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));
    }
}

function edit_item(e) {
    map.zoomOut();
}

function delete_item(e) {
/*
    if (confirm("Вы подтверждаете удаление?")) {
        $.ajax({
            url : "delete_post/", // the endpoint
            type : "DELETE", // http method
            data : { 'lng' : e.latlng.lng, 'lat': e.latlng.lat }, // data sent with the delete request
            success : function(json) {
                alert('Объект был успешно удален');
            },
            error : function(xhr,errmsg,err) {
                // Show an error
                alert(xhr.status + ": " + xhr.responseText);
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
    }*/
    PopUpShow();
}


var jsonTest = new L.GeoJSON.AJAX(["go"],{onEachFeature:popUp}).addTo(map);