const canvas = document.getElementById("monteCarlo");
const ctx = canvas.getContext("2d");
const piDisplay = document.getElementById("piValue");

class MonteCarlo {
    constructor(ctx) {
        this.ctx = ctx;
        this.puntiCerchio = 0;
        this.puntiTotali = 0;
    }

    disegnoBase() {
        this.puntiCerchio = 0;
        this.puntiTotali = 0;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.strokeStyle = "#cbd5e1";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(250, 50, 700, 700);
        this.ctx.beginPath();
        this.ctx.arc(600, 400, 350, 0, Math.PI * 2);
        this.ctx.stroke();
    }

    generaPunti(n) {
        for (let i = 0; i < n; i++) {
            let x = Math.random() * 700 + 250;
            let y = Math.random() * 700 + 50;
            this.puntiTotali++;

            if (Math.pow(x - 600, 2) + Math.pow(y - 400, 2) <= Math.pow(350, 2)) {
                this.puntiCerchio++;
                this.ctx.fillStyle = "#38bdf8";
            } else {
                this.ctx.fillStyle = "#ef4444";
            }
            this.ctx.fillRect(x, y, 2, 2);
        }
    }

    getCalcoloPi() {
        if (this.puntiTotali === 0) {return 0;}
        return 4 * (this.puntiCerchio / this.puntiTotali);
    }
}

const monteCarlo = new MonteCarlo(ctx);

const range = document.querySelector("#slider");
range.addEventListener("input", (e) => {
    let livello = Number(e.target.value);
    let numeroPunti = Math.pow(2, livello) * 10; 
    monteCarlo.disegnoBase();
    monteCarlo.generaPunti(numeroPunti);
    piDisplay.innerText = monteCarlo.getCalcoloPi().toFixed(6);
});
monteCarlo.disegnoBase();