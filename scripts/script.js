/* bron: https://codepen.io/Kuiae/pen/rRQPRb */

var canvas = document.getElementById("canvas")
var c = canvas.getContext('2d')
var drag = false;
var color = [
  '#D92B9C',
  '#F2CB57',
  '#BF5B04',
  '#D99E89',
  '#730C02'
]
canvas.width = innerWidth;
canvas.height = innerHeight;
var mouse = {
  x : 0,
  y : 0
}

function random(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var radius = 5
var Circle = function(x,y,radius,color) {
  this.radius = Math.floor(Math.random() *radius + 1)
  this.color = color
  this.dx = (Math.random() - 0.5) * 2;
  this.dy = (Math.random() - 0.5) * 2;
  this.pos = {
    x : x,
    y : y
  }
}
Circle.prototype.update = function(){
  this.pos.x += this.dx;
  this.pos.y += this.dy
    if(this.pos.x + this.radius > canvas.width || this.pos.x - this.radius < 0){
      this.dx = -this.dx
    }
    if(this.pos.y + radius > canvas.height || this.pos.y - radius < 0){
      this.dy = -this.dy
    }

    if (this.pos.x + this.radius * 2 > mouse.x && mouse.x != 0){
      this.dx -= 1
    }
    if (this.pos.x < mouse.x - this.radius * 2 && mouse.x != 0){
      this.dx += 1.5
    }

    if (this.dx > 5)
      this.dx -=1

    if (this.pos.y + this.radius * 2 > mouse.y + this.radius * 1 && mouse.y != 0){
      this.dy -= 1
    }
    if (this.pos.y < mouse.y - this.radius * 2 && mouse.y != 0){
      this.dy += 1.5
    }

    if (this.dy > 5)
      this.dy -=1

}
Circle.prototype.render = function(){
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.strokeStyle = this.color
    c.fill();
    c.stroke();
}
Circle.prototype.initCircle = function() {
  this.pos = {
    // x : Math.random() * (canvas.width - this.radius * 2) + this.radius,
    // y : Math.random() * (canvas.height - this.radius * 2) + this.radius
  }
}


addEventListener("mousemove", function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("click", function(event) {
    for (var i = 0; i < circle.length; i++) {
      var distX = Math.abs(circle[i].pos.x - mouse.x);
      var distY = Math.abs(circle[i].pos.y - mouse.y);
      var dist = Math.sqrt(distX * distX + distY * distY);
      if (dist <= circle[i].radius * 2) {
        circle[i].initCircle();
      }
    }
  });  

/* ---- Functions ---- */


var circle = [];
for (var i = 0; i < 10 ; i++) {
    var randomX = Math.random() * (canvas.width - radius * 1) + radius
    var randomY = Math.random() * (canvas.height - radius * 1) + radius
    circle.push(new Circle(randomX,randomY, radius, color[Math.floor(Math.random() * color.length)]))
}
c.fillStyle = "rgba(0,0,0,0.1)";
c.fillRect(0,0,canvas.width,canvas.height)
c.fill();

function loop(){
    c.fillStyle='rgba(255, 255, 255, 0.3)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.beginPath();
    c.fillStyle = "black";
    c.textAlign = "center";
    c.font = "80px Sans-serif";
    c.fillText("Move",canvas.width/2, canvas.height/2);
    c.closePath();
    for (var i = 0; i < circle.length ; i++) {
      circle[i].update();
      circle[i].render();
    }

    requestAnimationFrame(loop);
}
loop();