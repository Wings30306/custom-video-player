/**
 * Get elements
 */
const player = document.querySelector('.player')
const video = player.querySelector(".viewer")
const progress = player.querySelector(".progress")
const progressBar = player.querySelector(".progress__filled")
const toggle = player.querySelector(".toggle")
const skipButtons = player.querySelectorAll("[data-skip]")
const ranges = player.querySelectorAll(".player__slider")
// EXPAND added after tutorial end
const expandButton = player.querySelector(".expand")

/**
 * Build functions
 */
function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ?  `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
    toggle.innerHTML = icon;
}

function skip() {
    video.currentTime += parseInt(this.dataset.skip)
}

function handleRangeUpdate() {
    video[this.name] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    scrubTime = (e.offsetX / e.toElement.offsetWidth)
    video.currentTime = scrubTime * video.duration
}

// EXPAND added after tutorial end
function toggleFullScreen() {
    fullScreen = !fullScreen
    console.log({fullScreen})
    fullScreen ? width = "100vw" : width = "50vw";
    fullScreen ? height = "100vh" : height = "auto"
    player.style.width = width;
    player.style.height = height
}


/**
 *  Hook up event listeners
 */
toggle.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress)

skipButtons.forEach(button => button.addEventListener("click", skip))

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate))
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate))
ranges.forEach(range => range.addEventListener("touchmove", handleRangeUpdate))

let mousedown = false;
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e) => mousedown && scrub(e))
progress.addEventListener("touchmove", scrub)
progress.addEventListener("mousedown", () => mousedown = true)
progress.addEventListener("mouseup", () => mousedown = false)

// EXPAND added after tutorial end
let fullScreen = false
expandButton.addEventListener("click", toggleFullScreen)
