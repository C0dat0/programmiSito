// Classe per la Torre di Hanoi
class TorreDiHanoi {
    constructor(canvasId, inputId, contatoreId, messaggioId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.inputDischi = document.getElementById(inputId);
        this.contatoreElem = document.getElementById(contatoreId);
        this.messaggioElem = document.getElementById(messaggioId);

        this.torri = [[], [], []];
        this.mosse = [];
        this.contatore = 0;
        this.selezionato = null;
        this.modalita = null;
        this.animazione = null;

        // Limita input 1-6
        this.inputDischi.addEventListener("input", () => {
            if (this.inputDischi.value > 6) this.inputDischi.value = 6;
            if (this.inputDischi.value < 1) this.inputDischi.value = 1;
        });

        this.canvas.addEventListener("click", (e) => this.gestisciClickManuale(e));
    }

    // Seleziona modalità di gioco
    selezionaModalita(mod) {
        this.modalita = mod;
        const btns = document.querySelectorAll("#riquadroOpzioni .pulsantiModalita button");
        btns.forEach(btn => btn.style.border = "none");
        if (mod === 'simulazione') btns[0].style.border = "3px solid #ffa500";
        else btns[1].style.border = "3px solid #ffa500";
    }

    // Avvia il gioco
    avvia() {
        const numDischi = Math.min(6, Math.max(1, parseInt(this.inputDischi.value)));

        this.torri = [[], [], []];
        this.mosse = [];
        this.contatore = 0;
        this.selezionato = null;
        this.animazione = null;
        this.messaggioElem.textContent = "";
        this.contatoreElem.textContent = this.contatore;

        for (let i = numDischi; i >= 1; i--) this.torri[0].push(i);

        this.draw();

        if (this.modalita === "simulazione") {
            this.hanoi(numDischi, 0, 2, 1);
            this.animazioneMosse();
        }
    }

    // Genera mosse per simulazione
    hanoi(n, from, to, aux) {
        if (n === 0) return;
        this.hanoi(n-1, from, aux, to);
        this.mosse.push([from, to]);
        this.hanoi(n-1, aux, to, from);
    }

    // Animazione simulazione
    animazioneMosse() {
        if (this.mosse.length === 0) return;
        this.animazione = setInterval(() => {
            if (this.mosse.length === 0) {
                clearInterval(this.animazione);
                this.checkVittoria();
                return;
            }
            const [from, to] = this.mosse.shift();
            this.muoviDisco(from, to);
            this.contatore++;
            this.contatoreElem.textContent = this.contatore;
        }, 500);
    }

    // Muove un disco rispettando le regole
    muoviDisco(from, to) {
        if (this.torri[from].length === 0) return;
        const disco = this.torri[from][this.torri[from].length - 1];
        const dest = this.torri[to];

        if (dest.length === 0 || disco < dest[dest.length - 1]) {
            this.torri[from].pop();
            this.torri[to].push(disco);
            this.draw();
            this.checkVittoria();
        } else {
            this.messaggioElem.textContent = "⚠️ Mossa non valida!";
            setTimeout(() => { this.messaggioElem.textContent = ""; }, 1500);
        }
    }

    // Controllo vittoria (qualsiasi torre)
    checkVittoria() {
        const numDischi = parseInt(this.inputDischi.value);
        for (let torre of this.torri) {
            if (torre.length === numDischi) {
                this.messaggioElem.textContent = "🎉 Hai vinto! 🎉";
                clearInterval(this.animazione);
                return;
            }
        }
    }

    // Click manuale
    gestisciClickManuale(e) {
        if (this.modalita !== "manuale") return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const torreCliccata = Math.floor(x / (this.canvas.width / 3));

        if (this.selezionato === null && this.torri[torreCliccata].length > 0) {
            this.selezionato = torreCliccata;
        } else if (this.selezionato !== null) {
            this.muoviDisco(this.selezionato, torreCliccata);
            this.contatore++;
            this.contatoreElem.textContent = this.contatore;
            this.selezionato = null;
        }
    }

    // Disegna tutto nel canvas
    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const torreLarghezza = this.canvas.width / 3;
        const baseY = this.canvas.height - 20;

        for (let i = 0; i < 3; i++) {
            // Palo
            ctx.fillStyle = "#fff";
            ctx.fillRect(torreLarghezza * i + torreLarghezza/2 - 5, 50, 10, this.canvas.height - 70);

            // Dischi
            this.torri[i].forEach((disco, index) => {
                const discoLarghezza = disco * (torreLarghezza / 6);
                const discoAltezza = 20;
                const y = baseY - (index +1)*discoAltezza;
                ctx.fillStyle = `hsl(${disco*40}, 80%, 60%)`;
                ctx.fillRect(torreLarghezza*i + torreLarghezza/2 - discoLarghezza/2, y, discoLarghezza, discoAltezza);
            });
        }
    }
}

// --- Inizializzazione --- //
const hanoi = new TorreDiHanoi("canvas", "numDischi", "contatore", "messaggio");

// Funzioni globali per collegare pulsanti
function selezionaModalita(mod) { hanoi.selezionaModalita(mod); }
function avvia() { hanoi.avvia(); }