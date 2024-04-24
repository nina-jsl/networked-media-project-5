document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("post-icon");
    const toggleButton2 = document.getElementById("cross");
    const crossList = document.querySelectorAll(".cross2");
    const toggleDiv = document.getElementById("toggleDiv");
    const postButton = document.getElementById("postButton");
    const glowList = document.querySelectorAll(".glow");
    const aboutCross = document.getElementById("about-cross");
    const aboutContainer = document.querySelector(".about-container");
    const about = document.getElementById("about");


    
    if (glowList.length > 0) {
        glowList.forEach(function (glow) {
            const maxX = 150; 
            const maxY = 150;
            const randomX = Math.random() * (2 * maxX) - maxX; 
            const randomY = Math.random() * (maxY * 2) - maxY; 
            const randomSize = Math.random() * 20 + 20;


            glow.style.setProperty("--random-x", randomX + "px");
            glow.style.setProperty("--random-y", randomY + "px");
            glow.style.setProperty("--randomSize", randomSize + "px");
            
            glow.addEventListener("click", function () {
                console.log("glow clicked");
                const postContainer = glow.nextElementSibling; 
                if (postContainer.style.display === "none") {
                    postContainer.style.display = "block";
                } else {
                    postContainer.style.display = "none";
                }
            });
        });
    }
   
          
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            if (toggleDiv.style.display === "none") {
                toggleDiv.style.display = "block";
            } else {
                toggleDiv.style.display = "none";
            }
        });
    }
    
    if (toggleButton2) {
        toggleButton2.addEventListener("click", function () {
            const formContainers = document.querySelectorAll(".form-container");
            formContainers.forEach(function (formContainer) {
                if (formContainer.style.display === "none") {
                    formContainer.style.display = "block";
                } else {
                    formContainer.style.display = "none";
                }
            });
        });
    }

    if (crossList.length > 0) {
        crossList.forEach(function (cross) {
            cross.addEventListener("click", function () {
                const postContainer = cross.parentElement; // Get the parent element, which is the post-container
                if (postContainer.style.display === "none") {
                    postContainer.style.display = "block";
                } else {
                    postContainer.style.display = "none";
                }
            });
        });
    }
    
    if (aboutCross){
        aboutCross.addEventListener("click", function(){
            console.log("about cross clicked");
            if (aboutContainer.style.display ==="none"){
                aboutContainer.style.display = "block";
            } else {
                aboutContainer.style.display = "none";
            }
        })
    }

    if (about){
        about.addEventListener("click", function(){
            if (aboutContainer.style.display ==="none"){
                aboutContainer.style.display = "block";
            } else {
                aboutContainer.style.display = "none";
            }
        })
    }

    if (postButton) {
        postButton.addEventListener("click", function () {
            console.log(aboutContainer.style.display)
            const textInput = document.querySelector('.post-info');
            console.log('Input Element:', textInput);

            const textValue = textInput.value;


            const newDiv = document.createElement('div');
            newDiv.className = "glow";
            newDiv.textContent = textValue; 

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const maxPosX = 0.8* windowWidth;
            const maxPosY = 0.8*windowHeight;

            const minPosX = 0.2* windowWidth;
            const minPosY = 0.2*windowHeight;

            const posX = Math.floor(Math.random() * maxPosX) + minPosX;
            const posY = Math.floor(Math.random() * maxPosY) + minPosY;

            newDiv.style.position = "absolute";
            newDiv.style.left = posX + 'px';
            newDiv.style.top = posY + "px";

            toggleDiv.parentNode.appendChild(newDiv);


            const formData = new FormData();
            formData.append('x', posX);
            formData.append('y', posY);
            console.log('Text Value:', textValue);
            formData.append('text', textValue);

            fetch('/upload', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (!response.ok) {
                    console.error('Failed to create div');
                }
            }).catch(error => {
                console.error('Error: ', error);
            });

            aboutContainer.style.display = "none";

            const newPostContainer = document.createElement('div');
            newPostContainer.className = 'post-container';

            const crossIcon = document.createElement('img');
            crossIcon.src = "../icon/cross-small.png";
            crossIcon.className = "icon cross2";
            newPostContainer.appendChild(crossIcon);

            const heading = document.createElement('h1');
            heading.className = 'post';
            heading.textContent = 'Memory Information';
            newPostContainer.appendChild(heading);

            const paragraph = document.createElement('p');
            paragraph.className = 'post';
            paragraph.textContent = textValue;
            newPostContainer.appendChild(paragraph);

            toggleDiv.parentNode.appendChild(newPostContainer);

            const postContainers = document.querySelectorAll(".post-container");
            postContainers.forEach(function (postContainer) {
                postContainer.style.display = "none";
            });
        });
    }
});
