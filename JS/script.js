const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pixels = Array.from({length: 100}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    speedY: Math.random() * 1 - 0.5,
    speedX: Math.random() * 1 - 0.5
}));

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pixels.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener("load", () => {
    document.querySelectorAll(".fill").forEach((bar) => {
        const targetWidth = bar.getAttribute("style").match(/\d+/)[0] + "%";
        bar.style.width = "0%";
        setTimeout(() => {
            bar.style.transition = "width 1.5s ease-in-out";
            bar.style.width = targetWidth;
        }, 500);
    });
});
