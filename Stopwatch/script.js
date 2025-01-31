let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = []; // Array to store lap times
let darkMode = true; // Default theme

const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps").querySelector("ul");
const themeToggle = document.getElementById("themeToggle");

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    display.textContent = "00:00:00";
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    laps.push(lapTime);
    renderLaps();
}

function renderLaps() {
    lapsContainer.innerHTML = "";
    laps.forEach((lap, index) => {
        const lapItem = document.createElement("li");
        const lapText = document.createElement("span");
        lapText.textContent = `Lap ${index + 1}: ${lap}`;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            laps.splice(index, 1);
            renderLaps();
        });

        lapItem.appendChild(lapText);
        lapItem.appendChild(deleteButton);
        lapsContainer.appendChild(lapItem);
    });
}

function toggleTheme() {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
        themeToggle.textContent = "Switch Theme";
        document.body.style.color = "#fff";
    } else {
        document.body.style.background = "linear-gradient(135deg, #f5f5f5, #e0e0e0)";
        themeToggle.textContent = "Switch Theme";
        document.body.style.color = "#000";
    }
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);
themeToggle.addEventListener("click", toggleTheme);