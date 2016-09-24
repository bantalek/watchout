// start slingin' some d3 here.

var curScore = 0;
var highScore = 0;
var collisions = 0;
var svg = d3.select('svg');

var makeCircles = function() {
  return d3.range(20).map(function(elem, index) {
    return {
      x: Math.floor(Math.random() * 600),
      y: Math.floor(Math.random() * 500),
      i: index
    };
  });
};

var circles = makeCircles();
var flipped = false;
var moveCircles = function() {
  for (var i = 0; i < circles.length; i++) {
    var xOffset = (Math.random() * 100) - 50;
    var yOffset = (Math.random() * 100) - 50;

    if ((circles[i].x + xOffset > 0) && (circles[i].x + xOffset < 600)) {
      circles[i].x += xOffset;
    }

    if ((circles[i].y + yOffset > 0) && (circles[i].y + yOffset < 500)) {
      circles[i].y += yOffset;
    }
  }
};

//start by placing 10 randomly placed circles onto the board
svg.selectAll('image')
  .data(circles)
  .enter().append('image')
    .attr('xlink:href', 'bullet0.png')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .attr('width', 30)
    .attr('height', 30)
    .attr('visibility', 'visible')
    .classed('asteroid', true);

var date = new Date();
var lastCollisionTime = date.getTime();

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
      var asteroidX = asteroids[0][i].x.baseVal.value;
      var asteroidY = asteroids[0][i].y.baseVal.value;
      if ((Math.abs(asteroidX - mouseX) <= 30) && (Math.abs(asteroidY - mouseY) <= 30)) {
        curScore = 0;
        date = new Date();
        if (date.getTime() - lastCollisionTime > 500) {
          collisions += 1;
          d3.select('.collisions').select('span').text(collisions);
          lastCollisionTime = date.getTime();
        }
      }
    }
  };

  checkCollisions();
  //move the mouse circle
  d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
};

var drag = d3.behavior.drag().on('drag', dragged);

d3.select('svg').select('.mouse')
  .call(drag);

var update = function(data) {
  var svg = d3.select('svg').selectAll('.asteroid').data(data, function(d) { return d.i; });

  //exit old elements not present in new data
  svg.exit()
    .remove();

  flipped = !flipped;

  
  //Update old elements present in new data
  svg.transition(90).attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; });

  if (flipped) {
    svg.attr('href', 'bullet1.png');
  } else {
    svg.attr('href', 'bullet0.png');
  }

  svg.classed('asteroid', true);


  //enter new elements
  /*
  svg.enter().append('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 15)
    .classed('asteroid', true)
    .style('fill', 'white');
  */



};

setInterval(function() {
  //var newCircles = makeCircles();
  //update(newCircles); 
  curScore += 1;
  d3.select('.current').select('span').text(curScore);
  if (curScore > highScore) {
    highScore = curScore;
    d3.select('.highscore').select('span').text(highScore);
  }
  moveCircles();
  update(circles);
}, 100);