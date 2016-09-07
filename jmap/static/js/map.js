//Определяем карту, координаты центра и начальный масштаб
//var map = L.map('map').setView([38.0242, 44.5919], 10);
var map = L.map('map', {
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
        text: 'Добавить',
        callback: add_item
    }]}).setView([44.5919, 38.0242], 14);

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
    number = get_number(e);
    url = "/"+number+'/update/';
    //window.location.href = url;
    $.ajax({
            url : url,
            type : "GET", // http method
            success : function(html) {
                //пишем в скрытое окно
                $("#hidden").html(html);
                //заменяем action у формы. Наверное так делать не стоило :)
                $("#update").attr('action',url);
                PopUpShow();
            },
            error : function(xhr,errmsg,err) {
                // Show an error
                alert(xhr.status + ": " + xhr.responseText);
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
}

function delete_item(e) {
    number = get_number(e);
    url = "/"+number+'/delete/';
    //window.location.href = url;
    $.ajax({
            url : url,
            type : "GET", // http method
            success : function(html) {
                //пишем в скрытое окно
                $("#hidden").html(html);
                //заменяем action у формы. Наверное так делать не стоило :)
                $("#delete").attr('action',url);
                PopUpShow();
            },
            error : function(xhr,errmsg,err) {
                // Show an error
                alert(xhr.status + ": " + xhr.responseText);
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
}

function add_item(e)
{
    url = '/create/';
    $.ajax({
            url : url,
            type : "GET", // http method
            success : function(html) {
                //пишем в скрытое окно
                $("#hidden").html(html);
                //заменяем action у формы. Наверное так делать не стоило :)
                $("#update").attr('action',url);
                //добавляем широту и долготу
                $('#id_longitude').attr('value',e.latlng.lng);
                $('#id_latitude').attr('value',e.latlng.lat);
                PopUpShow();
            },
            error : function(xhr,errmsg,err) {
                // Show an error
                alert(xhr.status + ": " + xhr.responseText);
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
}

function get_number(e)
{
    content = e.relatedTarget._popup._content;
    number = parse_number(content);
    return number;
}

function parse_number(content)
{
    var right = content.split('Номер: ')[1];
    var number = right.split('<br />')[0];
    return number;
}


var jsonTest = new L.GeoJSON.AJAX(["go"],{onEachFeature:popUp}).addTo(map);