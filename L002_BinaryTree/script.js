var c = document.getElementById("Canvas"); 
var ctx = c.getContext("2d"); 


class Turtle{
    constructor(x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.angle = -90;
    this.penDown = true;
    }

    up() {
    this.penDown = false;
  }

  down() {
    this.penDown = true;
  }

  turn(angle){
    this.angle += angle; 
  }
    
    forward(r) {
    const x2 = this.x + r * Math.cos(this.angle*Math.PI/180);
    const y2 = this.y + r * Math.sin(this.angle*Math.PI/180);

    if (this.penDown) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }

    this.x = x2;
    this.y = y2;
  }

    binaryTree(livello, length, angle) {
        if (livello === 0) {
            this.forward(length);
            this.forward(-length);
        } else {
            this.forward(length);
            this.turn(angle);
            this.binaryTree(livello - 1, length / 1.2, angle);
            this.turn(-angle);
            this.turn(-angle);
            this.binaryTree(livello - 1, length / 1.2, angle);
            this.turn(angle);
            this.forward(-length);
        }
    }
}; 

let angle = 30; 
let livello = 4; 
let length = 80; 
let turtle= new Turtle(300, 450); 
ctx.strokeStyle = "black";
turtle.binaryTree(livello, length, angle); 

const range= document.querySelector("#range"); 
range.addEventListener("input", (e) => {
   livello=Number(e.target.value); 
   ctx.clearRect(0,0, c.clientWidth, c.height); 
   turtle.binaryTree(livello, length, angle); 
});

const grade= document.querySelector("#grade"); 
grade.addEventListener("input", (e) => {
    angle=Number(e.target.value); 
    ctx.clearRect(0,0, c.clientWidth, c.height); 
    turtle.binaryTree(livello, length, angle); 
}); 