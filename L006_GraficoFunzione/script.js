const canvas = document.getElementById("graficoCanvas");
const ctx = canvas.getContext("2d");
const inputFunzione = document.getElementById("funzioneInput");
const btnDisegna = document.getElementById("disegnaBtn");

class Visualizzatore {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.scala = 40; 
        this.ox = canvas.width / 2;
        this.oy = canvas.height / 2;
    }

    disegnaAssi() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = "#cbd5e1";
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.oy); this.ctx.lineTo(this.canvas.width, this.oy);
        this.ctx.moveTo(this.ox, 0); this.ctx.lineTo(this.ox, this.canvas.height);
        this.ctx.stroke();
    }

    // Traduttore infallibile
    preparaFormula(testo) {
        let f = testo.toLowerCase().replace(/\s+/g, '');
        
        // Trasforma x3 in x^3 (temporaneo)
        f = f.replace(/x(\d+)/g, "x^$1");
        
        // Trasforma 2x in 2*x
        f = f.replace(/(\d+)x/g, "$1*x");
        
        // Trasforma x^3 in Math.pow(x,3)
        f = f.replace(/x\^(\d+)/g, "Math.pow(x,$1)");
        
        // Se c'è un numero prima di Math.pow, metti il *
        f = f.replace(/(\d+)Math/g, "$1*Math");

        return f;
    }

    disegna() {
        this.disegnaAssi();
        const formula = this.preparaFormula(inputFunzione.value);
        
        this.ctx.strokeStyle = "#38bdf8";
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        let primo = true;
        
        // Creiamo la funzione una volta sola per performance
        let calcolaY;
        try {
            calcolaY = new Function('x', `return ${formula};`);
        } catch(e) {
            alert("Errore nella formula! Scrivi ad esempio: 2x3 + 4x2 + 5");
            return;
        }

        for (let px = 0; px < this.canvas.width; px++) {
            let xMat = (px - this.ox) / this.scala;
            try {
                let yMat = calcolaY(xMat);
                let py = this.oy - (yMat * this.scala);

                if (primo) {
                    this.ctx.moveTo(px, py);
                    primo = false;
                } else {
                    // Evita di disegnare linee che vanno all'infinito
                    if (Math.abs(py) < 10000) this.ctx.lineTo(px, py);
                }
            } catch(e) {}
        }
        this.ctx.stroke();
    }
}

const grafico = new Visualizzatore(ctx, canvas);
grafico.disegna(); // Disegna subito all'avvio

btnDisegna.onclick = () => grafico.disegna();