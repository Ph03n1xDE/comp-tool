/* eslint-disable space-before-function-paren */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */

// Create variables to hold the player objects
let player1;
let player2;

// Variables for start times
let start1;
let start2;

// Variables for end times
let end1;
let end2;

// timeouts

let timeout1;
let timeout2;

function onYouTubeIframeAPIReady() {
  const playBtn = document.getElementById("playBtn");
  const resetBtn = document.getElementById("resetBtn");

  const urlParams = new URLSearchParams(window.location.search);
  const video1 = urlParams.get("video1");
  const video2 = urlParams.get("video2");
  start1 = urlParams.get("start1");
  start2 = urlParams.get("start2");
  end1 = urlParams.get("end1");
  end2 = urlParams.get("end2");

  player1 = new YT.Player("player1", {
    videoId: video1,
    startSeconds: start1,
    events: {
      onStateChange: onPlayer1StateChange,
    },
  });

  player2 = new YT.Player("player2", {
    videoId: video2,
    startSeconds: start2,
    events: {
      onStateChange: onPlayer2StateChange,
    },
  });

  playBtn.addEventListener("click", function () {
    player2.mute();
    player1.seekTo(start1);
    player2.seekTo(start2);
    player1.playVideo();
    player2.playVideo();

    startTimers();
  });

  resetBtn.addEventListener("click", function () {
    resetTimers();

    player1.seekTo(start1);
    player2.seekTo(start2);
    player1.pauseVideo();
    player2.pauseVideo();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const playerContainers = document.getElementsByClassName("player");

  for (let i = 0; i < playerContainers.length; i++) {
    const maxWidth = playerContainers[i].clientWidth;
    const maxHeight = Math.floor(maxWidth * (9 / 16));

    playerContainers[i].style.height = maxHeight + "px";
    playerContainers[i].style.width = maxWidth + "px";
  }
});

function onPlayer1StateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    timeout1 = setTimeout(function () {
      if (player1.getCurrentTime() >= end1) {
        player1.pauseVideo();
      }
    }, end1 * 1000 - start1 * 1000);
  }
}

function onPlayer2StateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    timeout2 = setTimeout(function () {
      if (player2.getCurrentTime() >= end1) {
        player2.pauseVideo();
      }
    }, end2 * 1000 - start2 * 1000);
  }
}

function startTimers() {
  // Set the start times for each timer
  starttime1 = new Date().getTime();
  starttime2 = new Date().getTime();

  // Start updating the display for each timer every millisecond
  interval1 = setInterval(updateTimer1, 1);
  interval2 = setInterval(updateTimer2, 1);
}

function stopTimer1() {
  // Stop the timer for video 1
  clearInterval(interval1);

  // Set the end time for video 1
  endtime1 = new Date().getTime();
  endtime1 = (endtime1 - starttime1) / 1000;

  // Update the timer display for video 1 with the final time
  document.getElementById("timer1").innerHTML = endtime1.toFixed(2) + "s";

  // Check if both timers have finished
  if (typeof endtime2 !== "undefined") {
    // Calculate the difference between the elapsed times
    const timediff = Math.abs(endtime1 - endtime2);

    // Display the timediff in parentheses next to the second timer
    document.getElementById("timer2").innerHTML +=
      " (+" + timediff.toFixed(2) + "s)";
  }
}

function stopTimer2() {
  // Stop the timer for video 2
  clearInterval(interval2);

  // Set the end time for video 2
  endtime2 = new Date().getTime();
  endtime2 = (endtime2 - starttime2) / 1000;

  // Update the timer display for video 2 with the final time
  document.getElementById("timer2").innerHTML = endtime2.toFixed(2) + "s";

  // Check if both timers have finished
  if (typeof endtime1 !== "undefined") {
    // Calculate the difference between the elapsed times
    const timediff = Math.abs(endtime1 - endtime2);

    // Display the timediff in parentheses next to the second timer
    document.getElementById("timer2").innerHTML +=
      " (+" + timediff.toFixed(2) + "s)";
  }
}

function updateTimer1() {
  // Calculate the elapsed time for video 1
  let elapsed1 = new Date().getTime() - starttime1;
  elapsed1 = elapsed1 / 1000;

  // Update the timer display for video 1 with the elapsed time
  elapsed1 = Math.round(elapsed1 * 1000) / 1000;
  document.getElementById("timer1").innerHTML = elapsed1.toFixed(2) + "s";

  // Check if the elapsed time is within the start and end times of video 1
  if (player1.getCurrentTime() >= end1) {
    // Stop the timer for video 1
    stopTimer1();
  }
}

function updateTimer2() {
  // Calculate the elapsed time for video 2
  let elapsed2 = new Date().getTime() - starttime2;
  elapsed2 = elapsed2 / 1000;

  // Update the timer display for video 2 with the elapsed time
  elapsed2 = Math.round(elapsed2 * 1000) / 1000;
  document.getElementById("timer2").innerHTML = elapsed2.toFixed(2) + "s";

  // Check if the elapsed time is within the start and end times of video 2
  if (player2.getCurrentTime() >= end2) {
    // Stop the timer for video 2
    stopTimer2();
  }
}

function resetTimers() {
  clearInterval(interval1);
  clearInterval(interval2);

  clearTimeout(timeout1);
  clearTimeout(timeout2);

  document.getElementById("timer1").innerHTML = "0.00s";
  document.getElementById("timer2").innerHTML = "0.00s";
}
