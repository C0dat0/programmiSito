const cards = document.querySelectorAll(".hidden");

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;

        if (top < trigger) {
            card.classList.add("show");
        }
    });
}

document.querySelector(".container").addEventListener("scroll", revealOnScroll);