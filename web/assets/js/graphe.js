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

function updateHeartBeatFreq(heartbeatPlot) {
    heartbeat.splice(0, 1);
    beat = Math.floor(Math.random() * 100);
    heartbeat.push([beat]);

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


});