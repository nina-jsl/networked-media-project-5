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
            const randomX = Math.random()*maxX*2 - maxX; 
            const randomY = Math.random()*maxY*2 - maxY; 

            glow.style.setProperty("--random-x", randomX + "px");
            glow.style.setProperty("--random-y", randomY + "px");
            
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
            if (aboutContainer.style.display ==="none"){
                aboutContainer.style.display = "block";
            } else {
                aboutContainer.style.display = "none";
            }
        })
    }

    if (about){
        aboutCross.addEventListener("click", function(){
            if (aboutContainer.style.display ==="none"){
                aboutContainer.style.display = "block";
            } else {
                aboutContainer.style.display = "none";
            }
        })
    }

    if (postButton) {
        postButton.addEventListener("click", function () {
            const textInput = document.querySelector('.post-info');
            console.log('Input Element:', textInput);

            const textValue = textInput.value;


            const newDiv = document.createElement('div');
            newDiv.className = "glow";
            newDiv.textContent = textValue; // Set the text content of the new div

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const maxPosX = windowWidth - newDiv.offsetWidth;
            const maxPosY = windowHeight - newDiv.offsetHeight;

            const posX = Math.floor(Math.random() * maxPosX);
            const posY = Math.floor(Math.random() * maxPosY);

            newDiv.style.position = "absolute";
            newDiv.style.left = posX + 'px';
            newDiv.style.top = posY + "px";

            toggleDiv.parentNode.appendChild(newDiv);

            const formData = new FormData();
            formData.append('x', posX);
            formData.append('y', posY);
            formData.append('theimage', ''); 
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

            // Create a new post container
            const newPostContainer = document.createElement('div');
            newPostContainer.className = 'post-container';

            // Create and append cross icon
            const crossIcon = document.createElement('img');
            crossIcon.src = "../icon/cross-small.png";
            crossIcon.className = "icon cross2";
            newPostContainer.appendChild(crossIcon);

            // Create and append h1 element
            const heading = document.createElement('h1');
            heading.className = 'post';
            heading.textContent = 'Memory Information';
            newPostContainer.appendChild(heading);

            // Create and append p element with text value
            const paragraph = document.createElement('p');
            paragraph.className = 'post';
            paragraph.textContent = textValue;
            newPostContainer.appendChild(paragraph);

            // Append the new post container to the DOM
            toggleDiv.parentNode.appendChild(newPostContainer);

            // Hide all post containers
            const postContainers = document.querySelectorAll(".post-container");
            postContainers.forEach(function (postContainer) {
                postContainer.style.display = "none";
            });
        });
    }
});
