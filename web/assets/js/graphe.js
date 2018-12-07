function toggleOnAnimatePlot(options){
    options.animate = true;
    return options;
}

function toggleOffAnimatePlot(options){
    options.animate = false;
    return options;
}

function addCursor(options){
    options.cursor = {
        show: true,
        zoom: true
    };
    return options;
}

function addHighlighting(options){
    options.highlighter = {
        sizeAdjust: 5,
        tooltipLocation: 'n',
        tooltipFormatString: '%.2f'
    };
    return options;
}

function setTitle(options, title){
    options.title = title;
    return options;
}

function updateSeries() {
    myData.splice(0, 1);
    x = (new Date()).getTime();
    y = Math.floor(Math.random() * 100);
    myData.push([x, y]);

    plot1.series[0].data = myData;
    plot1.resetAxesScale();
    plot1.axes.xaxis.numberTicks = 10;
    plot1.axes.y2axis.numberTicks = 15;
    plot1.replot();
}

/*
* createPlot(target,data,options)
* target : the id where plot will be add 'id'
* data : the data to plot as a multi-dimension array
* options : as a js object
*/
function createPlot(target, data, options){
    return $.jqplot (target, data, options);
}

$(document).ready(function(){

    var darkTheme = {
        title: {
            textColor: '#b7b7b7'
        },
        series: [
            {color: '#000098', highlightColor: '#0000c8'},
            {color: '#989800', highlightColor: '#c8c800'}
            //{color: '#980000', highlightColor: '#c80000', },
            //{color: '#009800', highlightColor: '#00c800'},
            //{color: '#980098', highlightColor: '#c800c8'},
            //{color: '#009898', highlightColor: '#00c8c8'}
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


    var options = {
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
        }
    };

    options = addCursor(options);
    options = addHighlighting(options);
    options = setTitle(options, 'Body Temperature');
    var plot = createPlot('chart', [[30,-10,90,20,50,130,80,120,50]], options);
    var labels = ['waterTank', 'FoodUnits'];
    var optionsWater = {
        axes: {
            xaxis: {
                renderer:$.jqplot.DateAxisRenderer,
                rendererOptions: {tickInset: 0},
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {angle: -30},
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer
            },
            yaxis:{
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                useSeriesColor : true,
                padMax : 1.01,
                padMin : 1.01
            }
        },
        legend: {
            show: true,
            renderer: $.jqplot.EnhancedLegendRenderer,
            placement: "outsideGrid",
            labels: labels,
            location: "ne",
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
    optionsWater = setTitle(optionsWater,'Tanks');
    optionsWater = addCursor(optionsWater);
    optionsWater = addHighlighting(optionsWater);

    var dataWater = [
        [['6/12/2018',1000],['7/12/2018',950],['8/12/2018',870],['9/12/2018',842], ['10/12/2018',903]],
        [['6/12/2018',2000],['7/12/2018',1210],['8/12/2018',1822],['9/12/2018',2520], ['10/12/2018',1052]]
    ];

    var plotWaterTank = createPlot('chartWaterTank',dataWater, optionsWater)
    plotWaterTank.themeEngine.newTheme('darkTheme',darkTheme);
    plotWaterTank.activateTheme('darkTheme');

});