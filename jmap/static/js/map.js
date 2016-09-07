//Определяем карту, координаты центра и начальный масштаб
//В карту включаем меню для добавления объектов
var map = L.map('map', {
    contextmenu: true,
    contextmenuWidth: 140,
    contextmenuItems: [{
        text: 'Добавить',
        callback: add_item
    }]}).setView([44.5919, 38.0242], 14);

//Добавляем на нашу карту слой OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Делаем меню и popup
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

    //Биндим меню
    l.bindContextMenu({
        contextmenu: true,
        contextmenuInheritItems: false,
        contextmenuItems: contextMenuItems
    });

    //Достаем свойства из geoJson
    if (f.properties){
        for(key in f.properties){
            out.push(key+": "+f.properties[key]);
        }
        l.bindPopup(out.join("<br />"));
    }
}

//Функция редактирования элемента
function edit_item(e) {
    //Получаем pk
    number = get_number(e);
    //Формируем ссылку
    url = "/"+number+'/update/';
    //Отправляем аякс запрос на получение формы
    $.ajax({
            url : url,
            type : "GET",
            success : function(html) {
                //пишем в скрытое окно нашу форму
                $("#hidden").html(html);
                //заменяем action у формы. Наверное так делать не стоило :)
                $("#update").attr('action',url);
                //показываем окно
                PopUpShow();
            },
            //Если ошибка
            error : function(xhr,errmsg,err) {
                // Пишем лог в консоль
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });
}
//Уделение объекта
function delete_item(e) {
    //Получаем pk
    number = get_number(e);
    //Формируем url
    url = "/"+number+'/delete/';
    //отправляем аякс запрос на получение формы
    $.ajax({
            url : url,
            type : "GET",
            success : function(html) {
                //пишем в скрытое окно нашу форму
                $("#hidden").html(html);
                //заменяем action у формы. Наверное так делать не стоило :)
                $("#delete").attr('action',url);
                //показываем окно
                PopUpShow();
            },
            //Если ошибка
            error : function(xhr,errmsg,err) {
                // Пишем лог в консоль
                console.log(xhr.status + ": " + xhr.responseText);
            }
        });
}

//Функция добавления элемента
function add_item(e)
{
    //Формируем ссылку
    url = '/create/';
    //Отправляем аякс запрос на получение формы
    $.ajax({
            url : url,
            type : "GET",
            success : function(html) {
                //пишем в скрытое окно нашу форму
                $("#hidden").html(html);
                //заменяем action у формы. Наверное так делать не стоило :)
                $("#update").attr('action',url);
                //добавляем широту и долготу
                $('#id_longitude').attr('value',e.latlng.lng);
                $('#id_latitude').attr('value',e.latlng.lat);
                //показываем окно
                PopUpShow();
            },
            //Если ошибка
            error : function(xhr,errmsg,err) {
                // Пишем в лог
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
}

//Функция получения pk
function get_number(e)
{
    //Достаем из popup, скорее всего есть способ лучше
    content = e.relatedTarget._popup._content;
    //Парсим
    number = parse_number(content);
    return number;
}

//Функция парсинга
function parse_number(content)
{
    var right = content.split('Номер: ')[1];
    var number = right.split('<br />')[0];
    return number;
}

//Добавляем слой geoJson загруженный через аякс
var jsonTest = new L.GeoJSON.AJAX(["go"],{onEachFeature:popUp}).addTo(map);