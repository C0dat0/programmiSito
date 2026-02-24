const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


class Turtle {
  constructor(x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.angle = 0;
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
  
  vonKoch(length, level) {
    if (level === 0) {
    this.forward(length);
    return;
  }
  length /= 3;
  this.vonKoch(length, level - 1);
  this.turn(-60);
  this.vonKoch(length, level - 1);
  this.turn(120);
  this.vonKoch(length, level - 1);
  this.turn(-60);
  this.vonKoch(length, level - 1);
}

}
    ctx.strokeStyle = "blue";
    let turtle=new Turtle(300, 200); 
    turtle.angle = 0;
    let livello = 4; 
    for(let i=0;  i < 3; i++){
        turtle.vonKoch(300, livello); 
        turtle.turn(120); 
  }

const slider= document.querySelector("#slider"); 
slider.addEventListener("input", (e) => {
   livello=Number(e.target.value); 
   ctx.clearRect(0,0, canvas.clientWidth, canvas.height); 
   for(let i=0;  i < 3; i++){
        turtle.vonKoch(300, livello); 
        turtle.turn(120); 
  }
});
