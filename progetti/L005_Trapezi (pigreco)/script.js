const canvas = document.getElementById("trapezi");
const ctx = canvas.getContext("2d");
const piDisplay = document.getElementById("piValue");

class CalcolatoreTrapezi {
    constructor(ctx) {
        this.ctx = ctx;
        this.raggio = 700; 
        this.piGreco = 0;
    }

    disegnoBase() {
        this.ctx.strokeStyle = "#cbd5e1";
        this.ctx.lineWidth = 2;

        const origineX = 250; 
        const origineY = 750;

        this.ctx.strokeRect(origineX, origineY - this.raggio, this.raggio, this.raggio);
        this.ctx.beginPath();
        this.ctx.arc(origineX, origineY, this.raggio, 1.5 * Math.PI, 2 * Math.PI);
        this.ctx.stroke();
    }
    
    gestioneTrapezi(nTrapezi) {
        const origineX = 250; 
        const origineY = 750;
        const h = 1 / nTrapezi; 
        let areaTotale = 0;
        const calcolaAltezzaCerchio = (origineX) => Math.sqrt(1 - origineX * origineX);

        this.ctx.fillStyle = "rgba(56, 189, 248, 0.5)";
        this.ctx.strokeStyle = "#38bdf8";

        for (let i = 0; i < nTrapezi; i++) {
            let x1 = i * h;
            let x2 = (i + 1) * h;

            let baseSx = calcolaAltezzaCerchio(x1); 
            let baseDx = calcolaAltezzaCerchio(x2);
            areaTotale += ((baseSx + baseDx) * h) / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(origineX + x1 * this.raggio, origineY);
            this.ctx.lineTo(origineX + x1 * this.raggio, origineY - baseSx * this.raggio);
            this.ctx.lineTo(origineX + x2 * this.raggio, origineY - baseDx * this.raggio);
            this.ctx.lineTo(origineX + x2 * this.raggio, origineY);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
        }
        this.piGreco = areaTotale * 4;
    }

    getPi() {
        return this.piGreco;
    }
}

const trapezi = new CalcolatoreTrapezi(ctx);
const range = document.querySelector("#range");
range.addEventListener("input", (e) => {
    let livello = Number(e.target.value);
    let n = Math.pow(2, livello); 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trapezi.disegnoBase();
    trapezi.gestioneTrapezi(n);
    piDisplay.innerText = trapezi.getPi().toFixed(6);
});
trapezi.disegnoBase();