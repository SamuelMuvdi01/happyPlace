
//map initialization script
let map;

let heatMapEnabled = false;

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    initMap(crd.latitude,crd.longitude);    
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    initMap(-34.397,150.644)
}

navigator.geolocation.getCurrentPosition(success, error, options);

function initMap(lat,long) {    
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: long },
        zoom: 8,
    });   
    if(heatMapEnabled){
        var heatMap = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            return "https://tile.openweathermap.org/map/temp_new/" + 
                    zoom + "/" + coord.x + "/" + coord.y + ".png?appid=" + key;
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 9,
        minZoom: 0,
        name: 'heatMap'
        });

        map.overlayMapTypes.insertAt(0, heatMap);
    }   
}

//key for  open weather map
// const key = '5bc768cc9df2685fbc7ab678cfaeb95e';
const key = '431a4a6cc1ba0a9c9b9ac7071f861685'


//url for searching by city id
const city_id_url = (id) =>
    `https://api.openweathermap.org/data/2.5/weather?units=imperial&id=${id}&appid=${key}`;

const temp_map_url = (z,x,y) => 
    `https://tile.openweathermap.org/map/temp_new/${z}/${x}/${y}.png?appid=${key}`;

let getDataByCityId = function(id){
    let url = city_id_url(id)
    console.log(url);
    $.get(url, function( wdata ){
        console.log(wdata);
        populate(wdata);
    });
}
let populate = function(data){
    $list_obj = $("<div></div>").attr("id",data.id)
        .addClass("city-list-item")
        .click(function(){
            const center = new google.maps.LatLng(data.coord.lat, data.coord.lon);
            map.panTo(center);
            var marker = new google.maps.Marker({
                position: center,
                title:data.name
            });
            
            // To add the marker to the map, call setMap();
            marker.setMap(map);
        });
    
    $city = $("<div></div>").attr("id",data.name)
        .addClass("city-name")
        .text(data.name)
        .appendTo($list_obj);

    $temp = $("<div></div>").attr("id",data.id + "-temp")
        .addClass("city-temp")
        .html(Math.ceil(data.main.temp)+"&#176;")
        .appendTo($list_obj);

    $desc = $("<div></div>").attr("id",data.id + "-desc")
    .addClass("city-desc")
    .text(data.weather[0].description)
    .appendTo($list_obj);

    $list_obj.appendTo("#left-panel");
}

$.getJSON("assets/js/default_list.json", function(json) {
    for(let loc in json){
        console.log(json[loc])
        getDataByCityId(json[loc].id);
    }
});

$("#heatMapToggle").click(function(){
    $(this).toggleClass("enabled");
    heatMapEnabled = !heatMapEnabled;
    navigator.geolocation.getCurrentPosition(success, error, options);
});