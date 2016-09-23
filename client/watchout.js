// start slingin' some d3 here.

var curScore = 0;
var highScore = 0;

var svg = d3.select('svg');

var makeCircles = function() {
  return d3.range(10).map(function() {
    return {
      x: Math.floor(Math.random() * 600),
      y: Math.floor(Math.random() * 500),
    };
  });
};

var circles = makeCircles();

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
  var mouseX = d3.event.x;
  var mouseY = d3.event.y;
  if (mouseX <= 15 || mouseX >= 585) {
    return;
  }
  //make sure the mouse is in bounds vertically
  if (mouseY <= 15 || mouseY >= 485) {
    return;
  }

  //check for collisions
  var checkCollisions = function() {
    var asteroids = d3.select('svg').selectAll('.asteroid');
    for (var i = 0; i < asteroids[0].length; i++) {
      var asteroidX = asteroids[0][i].cx.baseVal.value;
      var asteroidY = asteroids[0][i].cy.baseVal.value;
      if ((Math.abs(asteroidX - mouseX) <= 15) && (Math.abs(asteroidY - mouseY) <= 15)) {
        console.log('crash');
      }
    }
  };

  checkCollisions();
  //move the mouse circle
  d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
};

var drag = d3.behavior.drag().on('drag', dragged);

d3.select('.mouse')
  .call(drag);

var update = function(data) {
  console.log('!');
  var svg = d3.select('svg').selectAll('circle').data(data, function(d) { return d.x + d.y; });

  //exit old elements not present in new data
  svg.exit()
    .remove();

  //Update old elements present in new data
  svg.attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 15)
    .classed('asteroid', true)
    .style('fill', 'white');

  //enter new elements
  svg.enter().append('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 15)
    .classed('asteroid', true)
    .style('fill', 'white');



};

var timer = d3.timer(function(elapsed) {
  var newCircles = makeCircles();
  update(newCircles);
}, 500);