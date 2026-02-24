var c = document.getElementById("Successione"); 
var ctx = c.getContext("2d");  

class Regole{
    number="0"; 
    livello; 
    constructor(number, livello){
        this.number=number; 
        this.livello=livello; 
    }; 

    successione(){
        for(let j=this.livello; j>0; j--){
            let number1=""; 
            for(let i = 0; i < this.number.length; i++){
                if(this.number[i]=="0"){
                    number1=number1+"01"; 
                }else{
                    number1=number1+"10"; 
                }; 
            }; 
            this.number=number1;
        }; 
        return this.number; 
    }; 
}; 


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
  
  draw(number, length){
        for(let i=0; i< number.length; i++){
            if(number[i]=="0"){
                this.forward(length); 
            }
            if(number[i] == "1"){
                this.turn(-60); 
            }
        }
    }
}
 
    let length=1;
    let number="0"; 
    let livello=15; 
    let regole= new Regole(number, livello); 
    let a=regole.successione(); 
    console.log(a); 
    let turtle = new Turtle(850, 300); 
    turtle.draw(a, length);