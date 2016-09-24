var svg = d3.select('svg');

var makeCircle = function(d) {
  return d3.range(10).map(function(elem, index) {
    return {
      x : Math.random() * 600,
      y : Math.random() * 500,
      i : index
    }
  }) 
}


// right a function to generate an array length n where each node
// contains coordinate data 

var circles = makeCircle();

// d3selectsSvg to pump coordinate data to selectAll circle elements
// enter() new data with .data(circles).enter()
// append all circles to circle element in DOM and set attributes for
// coordinates, size, and color

svg.selectAll('circle')
  .data(circles)
  .enter().append('circle')
    .attr('cx', function(d) {return d.x})
    .attr('cy', function(d) {return d.y})
    .attr('r', '15')
    .attr('style', 'fill:red')


// allow circles to move 
// create a move circle function that commands svg to 
// pump new circle data into all existing entries
var newXCoords = function (d) {
    var linearScale = d3.scale.linear()
                     .domain([-600,1200])
                     .range([0,600])
    if(Math.random() < .5) {
      var newCoord = d.x + Math.random() * 600;
    } else {
      var newCoord = d.x - Math.random() * 600;
    }
    return linearScale([newCoord]);
}

var newYCoords = function(d) { 
  var linearScale = d3.scale.linear()
                     .domain([-600,1000])
                     .range([0,500])
    if(Math.random() < .5) {
      var newCoord = d.y + Math.random() * 500;
    } else {
      var newCoord = d.y - Math.random() * 500;
    }

  return linearScale([newCoord]);
}
function moveCircles() {
  // DATA JOIN
  // Join new data with old elements, if any.
  var selection = svg.selectAll("circle")
    .data(circles);

  // UPDATE
  // Update old elements as needed.
  selection.transition()
    .duration(1000).attr("class", "update")
  .attr('style', 'fill:purple')
  .attr("cx", function(d) {return newXCoords(d)})
  .attr("cy", function(d) {return newYCoords(d)})
  // EXIT
  // Remove old elements as needed.
  // selection.exit().remove();
}
setInterval(function() {
  moveCircles();
}, 2000)

