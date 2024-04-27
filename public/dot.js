window.onload = () => {
    const cursor = document.querySelector(".cursor");
    const loginbut = document.querySelector(".login-btn");
    const iconList = document.querySelectorAll(".icon");
    const buttonList = document.querySelectorAll(".button");
    const navElements = document.querySelectorAll(".nav2");
    const toggleButton = document.getElementById("post-icon");
    const toggleButton2 = document.getElementById("cross");
    let crossList = document.querySelectorAll(".cross2");
    const toggleDiv = document.getElementById("toggleDiv");
    const postButton = document.getElementById("postButton");
    let glowList = document.querySelectorAll(".glow");
    const aboutCross = document.getElementById("about-cross");
    const aboutContainer = document.querySelector(".about-container");
    const about = document.getElementById("about");

    function updateGlowPosition(glow) {
        const maxX = 50;
        const maxY = 50;
        const randomX = Math.random() * (2 * maxX) - maxX;
        const randomY = Math.random() * (maxY * 2) - maxY;

        glow.style.setProperty("--random-x", randomX + "px");
        glow.style.setProperty("--random-y", randomY + "px");
    }

    function updateGlowPositions() {
        glowList.forEach(updateGlowPosition);
    }

    if (cursor) {
        console.log("detect cursor movement");
        document.addEventListener("mousemove", function (e) {
            let x = e.pageX;
            let y = e.pageY;

            cursor.style.top = y + "px";
            cursor.style.left = x + "px";
        });
    }

    if (navElements.length > 0) {
        navElements.forEach(function (nav2) {
            nav2.addEventListener("mouseenter", function () {
                console.log("over class nav2");
                cursor.classList.add("custom-cursor");
            });

            nav2.addEventListener("mouseleave", function () {
                cursor.classList.remove("custom-cursor");
            });
        });
    }

    if (loginbut) {
        loginbut.addEventListener("mouseenter", function () {
            console.log("over class aboutCross");
            cursor.classList.add("custom-cursor");
        });

        loginbut.addEventListener("mouseleave", function () {
            cursor.classList.remove("custom-cursor");
        });
    }

    if (iconList.length > 0) {
        iconList.forEach(function (icon) {
            icon.addEventListener("mouseenter", function () {
                console.log("over class button");
                cursor.classList.add("custom-cursor");
            });

            icon.addEventListener("mouseleave", function () {
                cursor.classList.remove("custom-cursor");
            });
        });
    }

    if (buttonList.length > 0) {
        buttonList.forEach(function (button) {
            button.addEventListener("mouseenter", function () {
                console.log("over class button");
                cursor.classList.add("custom-cursor");
            });

            button.addEventListener("mouseleave", function () {
                cursor.classList.remove("custom-cursor");
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



    if (aboutCross) {
        aboutCross.addEventListener("click", function () {
            console.log("about cross clicked");
            if (aboutContainer.style.display === "none") {
                aboutContainer.style.display = "block";
            } else {
                aboutContainer.style.display = "none";
            }
        })
        aboutCross.addEventListener("mouseenter", function () {
            console.log("over class aboutCross");
            cursor.classList.add("custom-cursor");
        });

        aboutCross.addEventListener("mouseleave", function () {
            cursor.classList.remove("custom-cursor");
        });
    }

    if (about) {
        about.addEventListener("click", function () {
            if (aboutContainer.style.display === "none") {
                aboutContainer.style.display = "block";
            } else {
                aboutContainer.style.display = "none";
            }
        })
    }

    if (postButton) {
        postButton.addEventListener("mouseenter", function () {
            console.log("over class postButton");
            cursor.classList.add("custom-cursor");
        });

        postButton.addEventListener("mouseleave", function () {
            cursor.classList.remove("custom-cursor");
        });
        postButton.addEventListener("click", function (event) {
            event.preventDefault();
            const textInput = document.querySelector('.post-info');
            console.log('Input Element:', textInput);

            const textValue = textInput.value;


            const newDiv = document.createElement('div');
            newDiv.className = "glow";
            // newDiv.textContent = textValue; 

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const maxPosX = 0.7 * windowWidth;
            const maxPosY = 0.7 * windowHeight;

            const minPosX = 0.2 * windowWidth;
            const minPosY = 0.2 * windowHeight;

            const posX = Math.floor(Math.random() * maxPosX) + minPosX;
            const posY = Math.floor(Math.random() * maxPosY) + minPosY;

            newDiv.style.position = "absolute";
            newDiv.style.left = posX + 'px';
            newDiv.style.top = posY + "px";

            toggleDiv.parentNode.appendChild(newDiv);
            
    

            if (!textValue.trim()) {
                alert("Please enter something to post.");
                return;
            }

            const formData = new FormData();
            formData.append('x', posX);
            formData.append('y', posY);
            // console.log('Text Value:', textValue);
            formData.append('text', textValue);

            fetch('/upload', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (!response.ok) {
                    console.error('Failed to create div');
                }
                textInput.value = '';
                glowList = document.querySelectorAll(".glow");
                crossList = document.querySelectorAll(".cross2");
                if (glowList.length > 0) {
                    glowList.forEach(passGlow);
                    glowList.forEach(function(glow) {
                        glow.addEventListener("mouseenter", function() {
                            console.log("over class glow");
                            cursor.classList.add("custom-cursor");
                        });
                
                        glow.addEventListener("mouseleave", function() {
                            cursor.classList.remove("custom-cursor");
                        });
                    });
                }

                if (crossList.length > 0) {
                    crossList.forEach(passCross);
                    crossList.forEach(function(cross) {
                        cross.addEventListener("mouseenter", function() {
                            console.log("over class cross");
                            cursor.classList.add("custom-cursor");
                        });
            
                        cross.addEventListener("mouseleave", function() {
                            cursor.classList.remove("custom-cursor");
                        });
                    });
                }
                // location.reload();
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
            toggleDiv.style.display = "none";

        });
        updateGlowPositions();
        if (glowList.length>0){
            glowList.forEach(passGlow);
            glowList.forEach(function(glow) {
                glow.addEventListener("mouseenter", function() {
                    console.log("over class glow");
                    cursor.classList.add("custom-cursor");
                });
        
                glow.addEventListener("mouseleave", function() {
                    cursor.classList.remove("custom-cursor");
                });
            });
        
        }
        if (crossList.length>0){
            crossList.forEach(passCross)
            crossList.forEach(function(cross) {
                cross.addEventListener("mouseenter", function() {
                    console.log("over class cross");
                    cursor.classList.add("custom-cursor");
                });
    
                cross.addEventListener("mouseleave", function() {
                    cursor.classList.remove("custom-cursor");
                });
            });
        }
        // setInterval(updateGlowPositions, 1000);

    }

}

function passGlow(glow) {
    glow.addEventListener("click", function () {
        console.log("glow clicked");
        
        const postContainer = glow.nextElementSibling;
        if (postContainer.style.display === "none") {
            postContainer.style.display = "block";
        } else {
            postContainer.style.display = "none";
        }
    });
    
}

function passCross(cross) {
    cross.addEventListener("click", function () {
        const postContainer = cross.parentElement; // Get the parent element, which is the post-container
        if (postContainer.style.display === "none") {
            postContainer.style.display = "block";
        } else {
            postContainer.style.display = "none";
        }
    });
}