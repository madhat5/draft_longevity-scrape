// console.log('sim sim salabim');

// canvas
var margin, width, height, g;

margin = {
    left: 100,
    right: 10,
    top: 50,
    bottom: 150
};

width = 750 - margin.left - margin.right;
height = 550 - margin.top - margin.bottom;

g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// labels
g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', width / 2)
    .attr('y', height + 100)
    .attr('font-size', '21px')
    .attr('text-anchor', 'middle')
    .text('Career length')

// data 