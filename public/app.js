// import { gsap } from "gsap";

const elements = document.getElementsByClassName("parallax");

let xval = 0, yval = 0; 

window.addEventListener("mousemove", (e)=>{
    xval = e.clientX - window.innerWidth/2;
    yval = e.clientY - window.innerHeight/2;
    for (let i = 0; i < elements.length; i++){
        let speedx = elements[i].dataset.speedx;
        let speedy = elements[i].dataset.speedy;
        let x = "calc(-50% + " + -xval*speedx + "px)";
        let y ="calc(-50% + " + yval*speedy + "px)";
        elements[i].style.transform = "translate(" + x + "," + y  + ")";
    };
})

let timeline = gsap.timeline();

for (let i = 0; i < elements.length; i++){
    let k = element[i].offsetHeight/2 + element[i].dataset.distance
    timeline.from(element[i], {
        top: k + "px",
        duration: 1,
    }, "1");
}