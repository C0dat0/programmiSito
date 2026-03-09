const cards = document.querySelectorAll(".hidden");
const container = document.querySelector(".container");

function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    cards.forEach(card => {
        const top = card.getBoundingClientRect().top;
        if (top < trigger) {
            card.classList.add("show");
        }
    });
}

container.addEventListener("scroll", revealOnScroll);


const viewer = document.getElementById("demoViewer");
const frame = document.getElementById("demoFrame");

document.querySelectorAll(".demoLink").forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();
        const path = this.getAttribute("href");
        frame.src = path;
        viewer.style.display = "block";

        history.pushState({demo:true}, "", "#demo");
    });
});


function closeDemo(){
    viewer.style.display = "none";
    frame.src = "";
}

window.addEventListener("popstate", function(){
    if(viewer.style.display === "block"){
        closeDemo();
    }
});
