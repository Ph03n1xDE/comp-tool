let player1;
let player2;
var startingTimeVideo1 = 0;
var startingTimeVideo2 = 0;
var intervalId1 = null;
var intervalId2 = null;

const urlParams = new URLSearchParams(window.location.search);

const start1Param = urlParams.get("start1");
if (start1Param) {
  startingTimeVideo1 = parseFloat(start1Param);
  document.getElementById("saved-time-video1").textContent =
    startingTimeVideo1.toFixed(2) + "s";
}

const start2Param = urlParams.get("start2");
if (start2Param) {
  startingTimeVideo2 = parseFloat(start2Param);
  document.getElementById("saved-time-video2").textContent =
    startingTimeVideo2.toFixed(2) + "s";
}

function onPlayer1Ready() {
  // Get the value of the video1 URL parameter, if it exists
  const video1Param = urlParams.get("video1");
  if (video1Param) {
    player1.loadVideoById(video1Param);
  } else {
    alert("Please use a valid URL with 2 video IDs!");
  }

  const start1Param = urlParams.get("start1");
  if (start1Param) {
    startingTimeVideo1 = parseFloat(start1Param);
    document.getElementById("saved-time-video1").textContent =
      startingTimeVideo1.toFixed(2) + "s";

    player1.playVideo();
    player1.seekTo(startingTimeVideo1);
    player1.pauseVideo();
  } else {
    player1.playVideo();
    player1.seekTo(0);
    player1.pauseVideo();
  }
}

function onPlayer2Ready() {
  // Get the value of the video2 URL parameter, if it exists
  const video2Param = urlParams.get("video2");
  if (video2Param) {
    player2.loadVideoById(video2Param);
  } else {
    alert("Please use a valid URL with 2 video IDs!");
  }

  const start2Param = urlParams.get("start2");
  if (start2Param) {
    startingTimeVideo2 = parseFloat(start2Param);
    document.getElementById("saved-time-video2").textContent =
      startingTimeVideo2.toFixed(2) + "s";

    player2.playVideo();
    player2.seekTo(startingTimeVideo2);
    player2.pauseVideo();
  } else {
    player2.playVideo();
    player2.seekTo(0);
    player2.pauseVideo();
  }
}

function onYouTubeIframeAPIReady() {
  player1 = new YT.Player("player1", {
    height: "360",
    width: "640",
    playerVars: {
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      autoplay: 0,
      fs: 0,
    },
    events: {
      onReady: onPlayer1Ready,
    },
  });

  player2 = new YT.Player("player2", {
    height: "360",
    width: "640",
    playerVars: {
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      autoplay: 0,
      fs: 0,
    },
    events: {
      onReady: onPlayer2Ready,
    },
  });
}

function saveStartingTime(videoId) {
  if (videoId === "video1") {
    startingTimeVideo1 = player1.getCurrentTime();
    document.getElementById("saved-time-video1").textContent =
      startingTimeVideo1.toFixed(2) + "s";
  } else {
    startingTimeVideo2 = player2.getCurrentTime();
    document.getElementById("saved-time-video2").textContent =
      startingTimeVideo2.toFixed(2) + "s";
  }
}

function startVideos() {
  player2.mute();
  clearInterval(intervalId1);
  clearInterval(intervalId2);
  intervalId1 = setInterval(function () {
    let time1 = player1.getCurrentTime() - startingTimeVideo1;
    document.getElementById("video-1-timer").innerHTML = time1.toFixed(2) + "s";
  }, 10);
  intervalId2 = setInterval(function () {
    let time2 = player2.getCurrentTime() - startingTimeVideo2;
    document.getElementById("video-2-timer").innerHTML = time2.toFixed(2) + "s";
  }, 10);
  player1.seekTo(startingTimeVideo1);
  player2.seekTo(startingTimeVideo2);
  player1.playVideo();
  player2.playVideo();
}

function copyToClipboard() {
  const newUrl =
    window.location.href
      .replace(/([&?])start1=\d+\.\d+/gi, "") // remove existing start1 parameter
      .replace(/([&?])start2=\d+\.\d+/gi, "") + // remove existing start2 parameter
    (window.location.search ? "&" : "?") + // add query separator
    "start1=" +
    startingTimeVideo1.toFixed(2) + // add new start1 parameter
    "&start2=" +
    startingTimeVideo2.toFixed(2); // add new start2 parameter

  navigator.clipboard
    .writeText(newUrl)
    .then(() => {
      const notification = document.getElementById("share-msg");
      const button = document.getElementById("share-btn");

      notification.classList.remove("hidden");
      button.classList.add("hidden");

      setTimeout(function () {
        notification.classList.add("hidden");
        button.classList.remove("hidden");
      }, 1000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

function pad(num) {
  return ("0" + num).slice(-2);
}

document.getElementById("start-btn").addEventListener("click", function () {
  startVideos();
});
