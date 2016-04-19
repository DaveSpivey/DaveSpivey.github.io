var w = 0.92;
var h = .8;
var width = window.innerWidth * w
|| document.documentElement.clientWidth * w
|| document.body.clientWidth * w;

var height = window.innerHeight * h
|| document.documentElement.clientHeight * h
|| document.body.clientHeight * h;
var radius = 35;
var nodeNum = 16;


var svg = d3.select('main').append('svg')
  .attr('width', width)
  .attr('height', height);

svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('class', '3');

for (var i = 0; i < nodeNum; i++) {
  var color = getRandomColor();
  var c = svg.append('circle')
    .attr('cx', (Math.random() * (width - radius * 2) + radius))
    .attr('cy', (Math.random() * (height - radius * 2) + radius))
    .attr('r', radius)
    .attr('fill', color)
    .attr('class', '3 node')
    .attr('id', ("node" + i))
    .attr('fill-opacity', 0.6)
}

function newPosition(left, top) {
  var leftPos = parseInt(left, 10);
  var topPos = parseInt(top, 10);
  var newLeft = Math.floor(Math.random() * 9.8) + leftPos - 4;
  var newTop = Math.floor(Math.random() * 9.8) + topPos - 4;
  if (newLeft > radius && newTop > radius) {
    return [newLeft, newTop];
  } else {
    return [leftPos, topPos];
  }
}

function moveNodes() {
  var duration = 350;
  d3.selectAll('.node').each(function(d,i) {
    var node = d3.select(this);
    var left = node.attr('cx');
    var top = node.attr('cy');
    var newPos = newPosition(left, top);
    var color = node.style('fill');
    if (color[0] == 'r') {
      var newColor = changeColor(color);
    } else {
      var newColor = color;
    }
    node.transition()
      .attr('cx', newPos[0])
      .attr('cy', newPos[1])
      .ease('linear')
      .style('fill', newColor)
      .duration(duration);
  })
  setTimeout(function() { moveNodes(); }, duration)
}

function getRandomColor() {
  // var hexVals = '0123456789ABCDEF'.split('');
  // var color = '#';
  // for (var i = 0; i < 6; i++) {
  //     color += hexVals[Math.floor(Math.random() * 16)];
  // }
  var color = ['rgb('];
  for (var i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 255).toString())
    if (i < 2) {
      color.push(', ');
    } else {
      color.push(')');
    }
  }
  return color.join('');
}

function changeColor(color) {
  var newColor = ['rgb('];
  var changer = color.match(/([0-9]+)/g);
  changer.forEach(function(string, idx) {
    var num = parseInt(string, 10);
    var change = Math.floor(Math.random() * 60 + .5) - 30
    if (num >= 30 || num <= 225) {
      num += change;
      newColor.push(num.toString());
      if (idx < 2) {
        newColor.push(', ');
      } else {
        newColor.push(')');
      }
    }
  })
  return newColor.join('');
}

function flash(nodeId) {
  var node = d3.select('#' + nodeId);
  var color = node.style('fill');
  node.transition()
    .style('fill', 'white')
    .duration(50);

  setTimeout(function() {
    node.transition()
      .style('fill', color)
      .duration(100);
  }, 50)
}


// function adjustBrightness(direction=1) {
//   var level = getLevel();
//   if (level <= 9 && level >= 1) {
//     var newClass = (level + direction).toString() + " node";
//     $('circle').attr('class', newClass);
//     $('rect').attr('class', (level + direction));

//     var color = $('rect').css('fill');
//     var newColor = changeColor(color, + direction * 20);
//     $('rect').css('fill', newColor);
//   }
// }

moveNodes();