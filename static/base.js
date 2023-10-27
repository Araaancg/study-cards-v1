window.onload = function() {
    if (window.localStorage.getItem("theme") === "light") {
        const body = document.querySelector("body");
        body.className = "light";
    };
};