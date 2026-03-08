class TorreDiHanoi {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.input = document.getElementById("numDischi");
        this.contatoreElem = document.getElementById("contatore");
        this.messaggio = document.getElementById("messaggio");

        this.torri = [[], [], []];
        this.contatore = 0;
        this.selezionato = null;

        this.canvas.addEventListener("click", (e) => this.click(e));
    }

    avvia() {
        const n = Math.max(1, Math.min(6, parseInt(this.input.value)));
        this.torri = [[], [], []];
        this.contatore = 0;
        this.selezionato = null;
        this.contatoreElem.textContent = 0;
        this.messaggio.textContent = "";

        for (let i = n; i >= 1; i--) {
            this.torri[0].push(i);
        }

        this.disegna();
    }

    click(e) {
        const x = e.clientX - this.canvas.getBoundingClientRect().left;
        const torre = Math.floor(x / (this.canvas.width / 3));

        if (this.selezionato === null && this.torri[torre].length > 0) {
            this.selezionato = torre;
        } else if (this.selezionato !== null) {
            this.muovi(this.selezionato, torre);
            this.selezionato = null;
        }
    }

    muovi(from, to) {
        const disco = this.torri[from].pop();
        const destinazione = this.torri[to];
        if (!disco) return;

        if (destinazione.length === 0 || disco < destinazione[destinazione.length - 1]) {
            destinazione.push(disco);
            this.contatore++;
            this.contatoreElem.textContent = this.contatore;
            this.disegna();
            this.checkVittoria();
        } else {
            this.torri[from].push(disco);
            this.messaggio.textContent = "Mossa non valida!";
            setTimeout(() => this.messaggio.textContent = "", 1000);
        }
    }

    checkVittoria() {
        const n = parseInt(this.input.value);
        if (this.torri[1].length === n || this.torri[2].length === n) {
            this.messaggio.textContent = "Hai vinto!";
        }
    }

    disegna() {
        const ctx = this.ctx;
        const larghezzaTorre = this.canvas.width / 3;
        const baseY = this.canvas.height - 20;
        const altezzaPalo = this.canvas.height - 50; 

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = "black";
            ctx.fillRect(larghezzaTorre * i + larghezzaTorre / 2 - 5, 20, 10, altezzaPalo);

            this.torri[i].forEach((disco, idx) => {
                const larghezza = disco * 30;
                const altezza = 20;
                const y = baseY - (idx + 1) * altezza;
                ctx.fillStyle = "blue";
                ctx.fillRect(larghezzaTorre * i + larghezzaTorre / 2 - larghezza / 2, y, larghezza, altezza);
            });
        }
    }
}

const gioco = new TorreDiHanoi();
function avvia() { gioco.avvia(); }