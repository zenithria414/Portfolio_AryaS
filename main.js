// Theme toggle
const btn = document.getElementById('toggle-mode');
const body = document.body;
let dark = true;
function setMode(forceDark) {
  dark = forceDark !== undefined ? forceDark : !dark;
  if (dark) {
    body.classList.remove('light');
    btn.innerText = '🌙';
    btn.title = "Switch to light mode";
  } else {
    body.classList.add('light');
    btn.innerText = '☀️';
    btn.title = "Switch to dark mode";
  }
}
btn.onclick = () => setMode();
setMode(true);

// Hamburger menu for mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.onclick = function() {
  navLinks.classList.toggle('show');
};
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('show'));
});

// Floating dots webbing effect (canvas)
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("webbing");
  const ctx = canvas.getContext("2d");
  let width = window.innerWidth;
  let height = window.innerHeight;
  let dots = [];
  const DOT_RADIUS = 2.1;
  const MAX_DIST = 125;
  const MOUSE_DIST = 140;
  let DOTS_COUNT = Math.floor((width * height) / 21000);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    DOTS_COUNT = Math.floor((width * height) / 21000);
    createDots();
  }

  function createDots() {
    dots = [];
    for (let i = 0; i < DOTS_COUNT; ++i) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }
  }

  let mouse = { x: -1000, y: -1000 };
  canvas.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    for (const d of dots) {
      ctx.beginPath();
      ctx.arc(d.x, d.y, DOT_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
    }
    // Draw lines between dots
    for (let i = 0; i < dots.length; ++i) {
      for (let j = i + 1; j < dots.length; ++j) {
        const a = dots[i], b = dots[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < MAX_DIST) {
          var isLight = document.body.classList.contains('light');
ctx.strokeStyle = isLight ? "#2563eb" : "#38bdf8"; 
          ctx.globalAlpha = 0.18 + 0.16 * (1 - d / MAX_DIST);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      // Draw line between dot and mouse if close
      const dm = Math.hypot(dots[i].x - mouse.x, dots[i].y - mouse.y);
      if (dm < MOUSE_DIST) {
        var isLight = document.body.classList.contains('light');
ctx.strokeStyle = isLight ? "#2563eb" : "#38bdf8"; 
        ctx.globalAlpha = 0.13 + 0.3 * (1 - dm / MOUSE_DIST);
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    for (const d of dots) {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > width) d.vx *= -1;
      if (d.y < 0 || d.y > height) d.vy *= -1;
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
});

// Typewriter effect for roles
const roles = [
  "Electronics Undergrad",
  "Web Developer",
  "Leetcode Enthusiast",
  "VLSI Amateur"
];
const typewriter = document.getElementById("typewriter-text");
let roleIdx = 0, charIdx = 0, typing = true, typeTimeout = null;

function typeLoop() {
  let role = roles[roleIdx];
  if (typing) {
    charIdx++;
    typewriter.textContent = role.slice(0, charIdx);
    if (charIdx === role.length) {
      typing = false;
      typeTimeout = setTimeout(typeLoop, 1200);
    } else {
      typeTimeout = setTimeout(typeLoop, 80);
    }
  } else {
    charIdx--;
    typewriter.textContent = role.slice(0, charIdx);
    if (charIdx === 0) {
      typing = true;
      roleIdx = (roleIdx + 1) % roles.length;
      typeTimeout = setTimeout(typeLoop, 300);
    } else {
      typeTimeout = setTimeout(typeLoop, 35);
    }
  }
}
if (typewriter) typeLoop();

// Custom cursor circle with color changing
const cursorCircle = document.getElementById('cursor-circle');
const cursorColors = ["#38bdf8", "#facc15", "#16a34a", "#f472b6", "#f87171", "#34d399", "#818cf8"];
let colorIdx = 0;
let lastChange = 0;
document.addEventListener('mousemove', e => {
  cursorCircle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  let now = Date.now();
  if (now - lastChange > 150) {
    colorIdx = (colorIdx + 1) % cursorColors.length;
    cursorCircle.style.background = cursorColors[colorIdx];
    lastChange = now;
  }
});
document.addEventListener('mouseleave', () => {
  cursorCircle.style.opacity = "0";
});
document.addEventListener('mouseenter', () => {
  cursorCircle.style.opacity = "0.7";
});

const funFacts = [
  "I can write code faster than my coffee gets cold!",
  "I once debugged a bug by talking to my rubber duck.",
  "My browser has more tabs open than a music store.",
  "I dream in code and sometimes in memes.",
  "Ctrl+C and Ctrl+V are my secret superpowers.",
  "I’ve built more projects than I’ve finished TV shows.",
  "I use dark mode even when the lights are off.",
  "My favorite language is... whichever one has fewer bugs today.",
  "I can explain recursion, but only if you already understand recursion.",
  "I name my variables after my mood."
];

window.addEventListener("DOMContentLoaded", function() {
  const funFactBox = document.getElementById('funFactBox');
  if (funFactBox) {
    const idx = Math.floor(Math.random() * funFacts.length);
    funFactBox.innerHTML = `<b>Fun fact about me:</b><br>${funFacts[idx]}`;
  }
});

// Simple form handler to show a success message (no backend)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.contact-form');
  const success = document.querySelector('.contact-success');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  }
});