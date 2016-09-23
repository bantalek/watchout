// start slingin' some d3 here.

var svg = d3.select('svg');

var circles = d3.range(10).map(function() {
  return {
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 500),
  };
});

//start by placing 10 randomly placed circles onto the board
svg.selectAll('circle')
  .data(circles)
  .enter().append('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 15)
    .style('fill', 'white');

var dragged = function(d) {
  console.log('dx = ' + d3.event.x + ' dy = ' + d3.event.y);
  d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
};

var drag = d3.behavior.drag().on('drag', dragged);

d3.select('.mouse')
  .call(drag);