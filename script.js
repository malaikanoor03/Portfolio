 // Loader
window.addEventListener("load",()=>{
    document.querySelector(".loader").style.display="none";
    });
    
    // Typing Effect
    const text="MALAIKA NOOR";
    let i=0;
    function typing(){
    if(i<text.length){
    document.getElementById("typing").innerHTML+=text.charAt(i);
    i++;
    setTimeout(typing,100);
    }
    }
    typing();
    
    // Custom Cursor
    const cursor=document.querySelector(".cursor");
    document.addEventListener("mousemove",(e)=>{
    cursor.style.left=e.clientX+"px";
    cursor.style.top=e.clientY+"px";
    });
    // Mobile Menu Toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
// EmailJS Setup
(function(){
    emailjs.init("AVWBeV9yoePEAO-t4"); 
})();

document.getElementById("contact-form").addEventListener("submit", function(e){
    e.preventDefault();

    emailjs.sendForm(
        "service_d9u4tm7",   //  Service ID
        "template_b9fuowk",  //  Template ID
        this
    )
    .then(function(){
        alert("Message Sent Successfully!");
        document.getElementById("contact-form").reset();
    })
    .catch(function(error){
        alert("Failed to send. Try again.");
        console.log("EmailJS Error:", error); 
    });
});
// Parallax Effect
window.addEventListener("scroll", () => {
    let scroll = window.scrollY;
    document.querySelector(".hero").style.transform =
    "translateY(" + scroll * 0.3 + "px)";
    });

// PARTICLES BACKGROUND 

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Particle class
class Particle {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw(){
        ctx.fillStyle = "rgba(72,98,139,0.8)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particlesArray = [];
const numParticles = 100;

for(let i=0;i<numParticles;i++){
    particlesArray.push(new Particle());
}

function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw lines between close particles
    for(let a=0;a<particlesArray.length;a++){
        for(let b=a;b<particlesArray.length;b++){
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 120){
                ctx.strokeStyle = "rgba(72,98,139,0.2)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();
AOS.init();

// DARK/LIGHT THEME TOGGLE 
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    themeBtn.style.background =
    document.body.classList.contains("light-theme") ? "#0F172A" : "#48628b";});

// CURSOR TRAIL EFFECT
const trailCount = 10;
const trails = [];
for(let i=0;i<trailCount;i++){
    const t = document.createElement("div");
    t.classList.add("trail");
    document.body.appendChild(t);
    trails.push({el: t, x: 0, y: 0});
}
document.addEventListener("mousemove", (e)=>{ trails[0].x = e.clientX; trails[0].y = e.clientY; });
function animateTrail(){
    for(let i=trails.length-1;i>0;i--){
        trails[i].x += (trails[i-1].x - trails[i].x)*0.2;
        trails[i].y += (trails[i-1].y - trails[i].y)*0.2;
        trails[i].el.style.left = trails[i].x+"px";
        trails[i].el.style.top = trails[i].y+"px";
    }
    requestAnimationFrame(animateTrail);
}
animateTrail();

// BACK TO TOP BUTTON 
const backBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", ()=>{
    backBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
backBtn.addEventListener("click", ()=>{ window.scrollTo({top:0,behavior:"smooth"}); });

// PORTFOLIO FILTERING 
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".projects .card");
filterBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        filterBtns.forEach(b=>b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.getAttribute("data-filter");
        projectCards.forEach(card=>{
            card.style.display = (category==="all" || card.getAttribute("data-category")===category) ? "block" : "none";
        });
    });
});

// SMOOTH SECTION REVEAL 
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", ()=>{
    sections.forEach(sec=>{
        const top = sec.getBoundingClientRect().top;
        if(top < window.innerHeight-100){
            sec.setAttribute("data-aos", "");
            sec.classList.add("aos-animate");
        }
    });
});
// PROJECT MODAL 

const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalDemo = document.getElementById("modal-demo");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".projects .card").forEach(card => {
    card.addEventListener("click", (e) => {

        // Prevent modal if button is clicked
        if(e.target.tagName === "A") return;

        const img = card.querySelector("img")?.src;
        const title = card.querySelector("h3").innerText;
        const desc = card.querySelector("p").innerText;

        if(img) modalImg.src = img;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;

        modalDemo.href = card.querySelector(".btn-outline")?.href || "#";

        modal.style.display = "flex";
    });
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if(e.target === modal){
        modal.style.display = "none";
    }
});
// SCROLL PROGRESS BAR 

const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";
});
// COUNTER ANIMATION 

const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");
        let count = 0;

        const update = () => {

            const increment = target / 100;

            if(count < target){
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(update,20);
            } 
            else{
                counter.innerText = target;
            }

        };

        update();

    });

};

let counterStarted = false;

window.addEventListener("scroll", () => {

    const statsSection = document.getElementById("stats");

    if(!counterStarted && window.scrollY > statsSection.offsetTop - 400){
        startCounter();
        counterStarted = true;
    }

});
// MAGNETIC BUTTONS 

const magneticBtns = document.querySelectorAll(".btn, .btn-outline");

magneticBtns.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;

        btn.style.transform = `translate(${x*0.2}px, ${y*0.2}px) scale(1.05)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0) scale(1)";
    });
});
document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("mousemove",(e)=>{
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");
    });
});
