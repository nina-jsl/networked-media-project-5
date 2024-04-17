document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("post-icon");
    const toggleButton2 = document.getElementById("cross");
    const toggleDiv = document.getElementById("postDiv");
    const postButton = document.getElementById("post-submit");

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
        const newDiv = document.createElement("div");
        newDiv.id = "glow";

        // Get window dimensions
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate maximum values for xPos and yPos
        const maxPosX = windowWidth - newDiv.offsetWidth;
        const maxPosY = windowHeight - newDiv.offsetHeight;

        // Generate random positions within window boundaries
        const xPos = Math.floor(Math.random() * maxPosX);
        const yPos = Math.floor(Math.random() * maxPosY);

        newDiv.style.position = "absolute";
        newDiv.style.left = xPos + 'px';
        newDiv.style.top = yPos + "px";

        toggleDiv.parentNode.appendChild(newDiv);

        const positionData = `x: ${xPos}, y: ${yPos}`;
        storeInDatabase(positionData);
    });
});

function storeInDatabase(data) {
    fetch('storeData.php', {
        method: 'POST',
        body: JSON.stringify({ data: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Data stored successfully:', data);
        })
        .catch(error => {
            console.error('Error storing data:', error);
        });
}
