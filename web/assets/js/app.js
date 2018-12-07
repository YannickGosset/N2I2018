const OWeatherMapAPIKey = "947d2e709c1ef57b6f9227766170be0e";
let nightMode = false;
let map;
let marker;

let darkThemeReserve = {
    title: {
        textColor: '#b7b7b7'
    },
    series: [
        {color: '#000098', highlightColor: '#0000c8'},
        {color: '#989800', highlightColor: '#c8c800'}
    ],
    grid: {
        backgroundColor: '#000000',
        gridLineColor: '#777777',
        borderColor: '#777777'
    },
    legend: {
        background: '#000000',
        textColor: '#b7b7b7',
        border: '0px'
    }

};

let optionsMaintenance = {
    series: [{
        label: 'Temperature',
        neighborThreshold: -1
    }],
    canvasOverlay: {
        show: true,
        objects: [
            {
                rectangle: {
                    ymax: 0, xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px",
                    color: "rgba(0, 0, 200, 0.3)", showTooltip: true, tooltipFormatString: "Too Cold"
                }
            },
            {
                rectangle: {
                    ymin: 100, xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px",
                    color: "rgba(200, 0, 0, 0.3)", showTooltip: true, tooltipFormatString: "Too Warm"
                }
            }
        ]
    },
    legend: {
        show: true,
        renderer: $.jqplot.EnhancedLegendRenderer,
        placement: "outsideGrid",
        labels: ['Temperature'],
        location: "s",
        rowSpacing: "0px",
        shrinkGrid : true,

        rendererOptions: {
            // set to true to replot when toggling series on/off
            // set to an options object to pass in replot options.
            numberColumns : 3,
            seriesToggle: 'normal',
            seriesToggleReplot: {resetAxes: true}
        }
    }
};

optionsMaintenance = addCursor(optionsMaintenance);
optionsMaintenance = addHighlighting(optionsMaintenance);
optionsMaintenance = setTitle(optionsMaintenance, 'Engine Temperature');
toggleOnAnimatePlot(optionsMaintenance);
let dataMaintenance = [[30,-10,90,20,50,130,80,120,50]];

let labels = ['Eau', 'Nourriture'];
let optionsReserve = {
    axes: {
        xaxis: {
            renderer:$.jqplot.DateAxisRenderer,
            rendererOptions: {tickInset: 0},
            tickRenderer: $.jqplot.CanvasAxisTickRenderer,
            tickOptions: {angle: -30, fontSize: '8pt', textColor:'black'},
            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            labelOptions: {fontSize: '8pt', textColor: 'black'}
        },
        yaxis:{
            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            labelOptions: {fontSize: '8pt', textColor: 'black'},
            //tickRenderer: $.jqplot.CanvasAxisTickRenderer,
            tickOptions: {fontSize: '8pt', textColor:'black'},
            rendererOptions: {
                // align the ticks on the yN axis with the y axis.
                alignTicks: false
            },
            padMax : 1.01,
            padMin : 1.01
        }
    },
    legend: {
        show: true,
        preDraw: true,
        renderer: $.jqplot.EnhancedLegendRenderer,
        placement: "outsideGrid",
        labels: labels,
        location: "s",
        rowSpacing: "0px",
        shrinkGrid : true,

        rendererOptions: {
            // set to true to replot when toggling series on/off
            // set to an options object to pass in replot options.
            numberColumns : 3,
            seriesToggle: 'normal',
            seriesToggleReplot: {resetAxes: true}
        }
    }
};
optionsReserve = setTitle(optionsReserve,'Réserves');
optionsReserve = addCursor(optionsReserve);
optionsReserve = addHighlighting(optionsReserve);
toggleOnAnimatePlot(optionsReserve);

let dataReserve = [
    [['6/12/2018',1000],['7/12/2018',950],['8/12/2018',870],['9/12/2018',842], ['10/12/2018',903]],
    [['6/12/2018',2000],['7/12/2018',1210],['8/12/2018',1822],['9/12/2018',2520], ['10/12/2018',1052]]
];


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

$('#settingsDisplayer').on('click', function () {
    $('.active').removeClass('active').fadeOut();
    $('#settingsLayer').addClass('active').fadeIn();
});

$('#reserveDisplayer').on('click', function () {
    $('.active').removeClass('active').fadeOut();
    $('#reserveLayer').addClass('active').fadeIn();
    let plotReserve = createPlot('plotReserve', dataReserve, optionsReserve);
    plotReserve.themeEngine.newTheme('darkThemeReserve', darkThemeReserve);
});

$('#maintenanceDisplayer').on('click', function () {
    $('.active').removeClass('active').fadeOut();
    $('#maintenanceLayer').addClass('active').fadeIn();
    let plotMaintenance = createPlot('plotMaintenance', dataMaintenance, optionsMaintenance);
    //plotReserve.themeEngine.newTheme('darkTheme', darkTheme);
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