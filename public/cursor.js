document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.querySelector(".cursor");
    const navElements = document.querySelectorAll(".nav2");
    const crossList = document.querySelectorAll(".cross2");
    const postButton = document.getElementById("postButton");
    const aboutCross = document.getElementById("about-cross");
    const glowList = document.querySelectorAll(".glow");
    const buttonList = document.querySelectorAll(".button");
    const loginbut = document.querySelector(".login-btn");
    const iconList = document.querySelectorAll(".icon");


    if (loginbut){
        loginbut.addEventListener("mouseenter", function() {
            console.log("over class aboutCross");
            cursor.classList.add("custom-cursor");
        });

        loginbut.addEventListener("mouseleave", function() {
            cursor.classList.remove("custom-cursor");
        });
    }

    if (aboutCross){
        aboutCross.addEventListener("mouseenter", function() {
            console.log("over class aboutCross");
            cursor.classList.add("custom-cursor");
        });

        aboutCross.addEventListener("mouseleave", function() {
            cursor.classList.remove("custom-cursor");
        });
    }

    if (postButton){
        postButton.addEventListener("mouseenter", function() {
            console.log("over class postButton");
            cursor.classList.add("custom-cursor");
        });

        postButton.addEventListener("mouseleave", function() {
            cursor.classList.remove("custom-cursor");
        });
    }

    if (cursor){
        document.addEventListener("mousemove", function(e) {
            let x = e.pageX;
            let y = e.pageY;
    
            cursor.style.top = y + "px";
            cursor.style.left = x + "px";
        });
    }

    if (iconList.length>0){
        iconList.forEach(function(icon) {
            icon.addEventListener("mouseenter", function() {
                console.log("over class button");
                cursor.classList.add("custom-cursor");
            });
    
            icon.addEventListener("mouseleave", function() {
                cursor.classList.remove("custom-cursor");
            });
        });
    }

    if (buttonList.length>0){
        buttonList.forEach(function(button) {
            button.addEventListener("mouseenter", function() {
                console.log("over class button");
                cursor.classList.add("custom-cursor");
            });
    
            button.addEventListener("mouseleave", function() {
                cursor.classList.remove("custom-cursor");
            });
        });
    }

    if (glowList.length>0){
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
    
    if (navElements.length>0){
        navElements.forEach(function(nav2) {
            nav2.addEventListener("mouseenter", function() {
                console.log("over class nav2");
                cursor.classList.add("custom-cursor");
            });
    
            nav2.addEventListener("mouseleave", function() {
                cursor.classList.remove("custom-cursor");
            });
        });
    }


    if (crossList.length>0){
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
    else {
        console.error("Cursor element or nav elements not found.");
    }
});
