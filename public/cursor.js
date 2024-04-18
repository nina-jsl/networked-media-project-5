document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.querySelector(".cursor");

    if (cursor) {
        document.addEventListener("mousemove", function(e) {
            let x = e.pageX;
            let y = e.pageY;

            cursor.style.top = y + "px";
            cursor.style.left = x + "px";
        });
    } else {
        console.error("Cursor element not found.");
    }
});
