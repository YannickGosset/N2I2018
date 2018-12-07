const OWeatherMapAPIKey = "947d2e709c1ef57b6f9227766170be0e";
let map;
let marker;


$(document).ready(function () {
    randomLLama();
});

$('#homeDisplayer').on('click', function () {
    $('.active').removeClass('active').fadeOut();
    $('#homeLayer').addClass('active').fadeIn();
});

$('#weatherDisplayer').on('click', function () {
    $('.active').removeClass('active').fadeOut();
    $('#weatherLayer').addClass('active').fadeIn();
    getWeatherInformations();
});

$('#locationDisplayer').on('click', function () {
    $('.active').removeClass('active').fadeOut();
    $('#locationLayer').addClass('active').fadeIn();
    map = L.map('map').setView(coordinates, 7);
    L.tileLayer('http://toolserver.org/tiles/hikebike/{z}/{x}/{y}.png').addTo(map);
    L.Control.geocoder().addTo(map);
    marker = L.marker(coordinates).addTo(map);
    map.on('click', onMapClick);
});

function getWeatherInformations() {
    let coordinates_temp;
    $.ajax({
        url: Routing.generate('get-coordinates'),
        type: 'POST',
    }).done(function(response){
        response = JSON.parse(response);
        console.log(response);
        coordinates_temp = {
            lat: response.latitude,
            lng: response.longitude
        };
        $('#results').empty();
        $.get("https://api.openweathermap.org/data/2.5/weather?lat=" + coordinates_temp.lat + "&lon=" + coordinates_temp.lng +
            "&units=metric" + "&lang=fr&APPID=" + OWeatherMapAPIKey, function (data)
        {
            let date = timeConverter(data.dt);

            $('#results').append(
                '<tr>' +
                '<td>' + date + '</td>' +
                '<td>' + ucWords(data.weather[0].description) + '</td>' +
                '<td>' + parseInt(data.main.temp) + '°C</td>' +
                '<td>' + parseInt(data.wind.speed) + 'm/s</td>' +
                '</tr>'
            );
        });
        $.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + coordinates_temp.lat + "&lon=" + coordinates_temp.lng +
            "&units=metric" + "&lang=fr&APPID=" + OWeatherMapAPIKey, function (data)
        {
            data.list.every(function (element, index) {

                if(index >= 9) return false;

                let date = timeConverter(element.dt);

                $('#results').append(
                    '<tr>' +
                    '<td>' + date + '</td>' +
                    '<td>' + ucWords(element.weather[0].description) + '</td>' +
                    '<td>' + parseInt(element.main.temp) + '°C</td>' +
                    '<td>' + parseInt(element.wind.speed) + 'm/s</td>' +
                    '</tr>'
                );
                return true;
            });
        }).fail(function (error) {
            console.log(error);
        });
    });
}

// Fonction permettant de mettre les premières lettres de chaque mot en majuscule
function ucWords(str) {
    return str.toLowerCase().replace(/^[\u00C0-\u1FFF\u2C00-\uD7FF\w]|\s[\u00C0-\u1FFF\u2C00-\uD7FF\w]/g, function(letter) {
        return letter.toUpperCase();
    });
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + 'h0' + min + 'm0' + sec + 's';
}

function onMapClick(e) {
    if(marker !== undefined)
        map.removeLayer(marker);

    marker = L.marker(e.latlng).addTo(map);
    console.log(e.latlng);
    $.ajax({
        url: Routing.generate('modify-coordinates'),
        type: 'POST',
        data: {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
        }
    }).done(function(data){
        $('#locationAlerts').empty();
        $('#locationAlerts').append('<div class="alert alert-success" id="successModif" role="alert">\n' +
            '  Votre localisation a bien été modifiée!\n' +
            '</div>');
        $("#successModif").fadeTo(2000, 500).slideUp(500, function(){
            $("#successModif").slideUp(500);
        });
    });
}