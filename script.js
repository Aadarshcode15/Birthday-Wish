// Toggle Song Play/Pause
function toggleSong() {
    var song = document.getElementById('birthdaySong');
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }
}

// Open Popup
function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Close Popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Confetti and Fireworks
var confetti = document.getElementById('confetti');
var ctx = confetti.getContext('2d');

confetti.width = window.innerWidth;
confetti.height = window.innerHeight;

var pieces = [];
for (var i = 0; i < 150; i++) {
    pieces.push({
        x: Math.random() * confetti.width,
        y: Math.random() * confetti.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 20 + 10,
        color: "hsl(" + Math.random() * 360 + ", 100%, 50%)",
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
    });
}

var fireworks = [];

function createFirework() {
    var x = Math.random() * confetti.width;
    var y = Math.random() * confetti.height / 2;
    var count = 100;
    for (var i = 0; i < count; i++) {
        fireworks.push({
            x: x,
            y: y,
            r: Math.random() * 3 + 2,
            color: "hsl(" + Math.random() * 360 + ", 100%, 50%)",
            vx: Math.cos(i * Math.PI * 2 / count) * Math.random() * 5,
            vy: Math.sin(i * Math.PI * 2 / count) * Math.random() * 5,
            alpha: 1
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, confetti.width, confetti.height);

    for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();
    }

    for (var i = 0; i < fireworks.length; i++) {
        var f = fireworks[i];
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${hslToRgb(f.color)},${f.alpha})`;
        ctx.fill();
    }

    update();
}

function update() {
    for (var i = 0; i < pieces.length; i++) {
        var p = pieces[i];
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(0.01 + p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle) * 15;

        if (p.y > confetti.height) {
            pieces[i] = {
                x: Math.random() * confetti.width,
                y: -20,
                r: p.r,
                d: p.d,
                color: p.color,
                tilt: p.tilt,
                tiltAngleIncremental: p.tiltAngleIncremental,
                tiltAngle: p.tiltAngle
            };
        }
    }

    for (var i = 0; i < fireworks.length; i++) {
        var f = fireworks[i];
        f.x += f.vx;
        f.y += f.vy;
        f.alpha -= 0.01;
    }

    fireworks = fireworks.filter(f => f.alpha > 0);
}

function hslToRgb(hsl) {
    const sep = hsl.indexOf(",") > -1 ? "," : " ";
    const hslArr = hsl.substr(4).split(")")[0].split(sep);
    let h = hslArr[0],
        s = hslArr[1].substr(0, hslArr[1].length - 1),
        l = hslArr[2].substr(0, hslArr[2].length - 1);

    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return `${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)}`;
}

setInterval(createFirework, 2000);
setInterval(draw, 30);

window.addEventListener('resize', function () {
    confetti.width = window.innerWidth;
    confetti.height = window.innerHeight;
});

// Floating Balloons
function createBalloon() {
    var balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(balloon);

    setTimeout(() => {
        balloon.remove();
    }, 8000);
}

setInterval(createBalloon, 1000);
