document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("post-icon");
    const toggleButton2 = document.getElementById("cross");
    const toggleDiv = document.getElementById("postDiv");
    const positionForm = document.getElementById("positionForm");
    
    const xPos = 0; 
    const yPos = 0; 
    const positionData = ""; 

    toggleButton.addEventListener("click", function () {
        if (toggleDiv.style.display === "none") {
            toggleDiv.style.display = "block";
        } else {
            toggleDiv.style.display = "none";
        }
    });

    toggleButton2.addEventListener("click", function () {
        if (toggleDiv.style.display === "none") {
            toggleDiv.style.display = "block";
        } else {
            toggleDiv.style.display = "none";
        }
    });

    postButton.addEventListener("click", function () {
        const newInput = document.createElement('input');
        newInput.id = "glow";

        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate maximum values for xPos and yPos
        const maxPosX = windowWidth - newDiv.offsetWidth;
        const maxPosY = windowHeight - newDiv.offsetHeight;

        // Generate random positions within window boundaries
        xPos = Math.floor(Math.random() * maxPosX);
        yPos = Math.floor(Math.random() * maxPosY);

        newDiv.style.position = "absolute";
        newDiv.style.left = xPos + 'px';
        newDiv.style.top = yPos + "px";

        toggleDiv.parentNode.appendChild(newDiv);

        positionData = `x: ${xPos}, y: ${yPos}`;
    });

    positionForm.addEventListener('submit', (e)=>{
        e.preventDefault();
    })
});

