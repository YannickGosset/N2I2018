$(document).ready(function(){
    var plot1 = $.jqplot ('chart', [[30,-10,90,20,50,130,80,120,50]], {
        series: [{
            label: 'Test',
            neighborThreshold: -1
        }],
        canvasOverlay: {
            show: true,
            objects: [
                { rectangle: { ymax: 0, xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px",
                        color: "rgba(0, 0, 200, 0.3)", showTooltip: true, tooltipFormatString: "Too Cold" } },
                { rectangle: { ymin: 100, xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px",
                        color: "rgba(200, 0, 0, 0.3)", showTooltip: true, tooltipFormatString: "Too Warm" } }
            ]
        },
        cursor: {
            show: true,
            zoom: true
        }
    });
});