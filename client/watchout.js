// start slingin' some d3 here.

var curScore = 0;
var highScore = 0;

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
    .classed('asteroid', true)
    .style('fill', 'white');

var dragged = function(d) {
  //make sure the mouse is in bounds horizontally
  if (d3.event.x <= 15 || d3.event.x >= 585) {
    return;
  }
  //make sure the mouse is in bounds vertically
  if (d3.event.y <= 15 || d3.event.y >= 485) {
    return;
  }

  //check for collisions
  var checkCollisions = function() {
    var asteroids = svg.selectAll('.asteroid');
    console.log(asteroids);
    for (var i = 0; i < asteroids[0].length; i++) {
      console.log(asteroids[0][i].cx);
    }
  };

  checkCollisions();
  //move the mouse circle
  d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
};

var drag = d3.behavior.drag().on('drag', dragged);

d3.select('.mouse')
  .call(drag);

var timer = d3.timer(function(elapsed) {

}, 1000);