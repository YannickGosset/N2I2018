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

/*
* createPlot(target,data,options)
* target : the id where plot will be add 'id'
* data : the data to plot as a multi-dimension array
* options : as a js object
*/
function createPlot(target, data, options){
    return $.jqplot (target, data, options);
}




