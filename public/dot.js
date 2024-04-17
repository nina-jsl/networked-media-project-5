document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("post-icon");
    const toggleButton2 = document.getElementById("cross");
    const toggleDiv = document.getElementById("toggleDiv");
    const postButton = document.getElementById("postButton");

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
        const newDiv = document.createElement('div');
        newDiv.id = "glow";

        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate maximum values for xPos and yPos
        const maxPosX = windowWidth - newDiv.offsetWidth;
        const maxPosY = windowHeight - newDiv.offsetHeight;

        const posX = Math.floor(Math.random() * maxPosX);
        const posY = Math.floor(Math.random() * maxPosY);
       

        newDiv.style.position = "absolute";
        newDiv.style.left = posX + 'px';
        newDiv.style.top = posY + "px";

        toggleDiv.parentNode.appendChild(newDiv);

        // positionData = `x: ${xPos}, y: ${yPos}`;
    });
});

function sendPositionData(position){
    const data = `top=${position.top}&left=${position.left}`;
    fetch('/storePosition', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:data
    })
    .then(response =>{
        if (!response.ok){
            throw new Error ('Network')
        }
    })
}
