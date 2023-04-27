var video1 = videojs("video1");
var video2 = videojs("video2");
var startingTimeVideo1 = 0;
var startingTimeVideo2 = 0;
var intervalId1 = null;
var intervalId2 = null;

video1.on("keydown", function (e) {
  if (e.which === 190) {
    // period key
    myPlayer.pause();
    myPlayer.currentTime(
      myPlayer.currentTime() + 1.0 / myPlayer.playbackRate() / 60
    ); // 30 frames per second
  } else if (e.which === 188) {
    // comma key
    myPlayer.pause();
    myPlayer.currentTime(
      myPlayer.currentTime() - 1.0 / myPlayer.playbackRate() / 60
    ); // 30 frames per second
  }
});

video2.on("keydown", function (e) {
  if (e.which === 190) {
    // period key
    myPlayer.pause();
    myPlayer.currentTime(
      myPlayer.currentTime() + 1.0 / myPlayer.playbackRate() / 60
    ); // 30 frames per second
  } else if (e.which === 188) {
    // comma key
    myPlayer.pause();
    myPlayer.currentTime(
      myPlayer.currentTime() - 1.0 / myPlayer.playbackRate() / 60
    ); // 30 frames per second
  }
});

function saveStartingTime(videoId) {
  var player = videojs(videoId);
  if (videoId === "video1") {
    startingTimeVideo1 = player.currentTime();
    document.getElementById("saved-time-video1").textContent =
      startingTimeVideo1.toFixed(2) + "s";
  } else {
    startingTimeVideo2 = player.currentTime();
    document.getElementById("saved-time-video2").textContent =
      startingTimeVideo2.toFixed(2) + "s";
  }
}

function startVideos() {
  video2.muted(true);
  clearInterval(intervalId1);
  clearInterval(intervalId2);
  intervalId1 = setInterval(function () {
    var time1 = video1.currentTime() - startingTimeVideo1;
    document.getElementById("video-1-timer").innerHTML = time1.toFixed(2) + "s";
  }, 10);
  intervalId2 = setInterval(function () {
    var time2 = video2.currentTime() - startingTimeVideo2;
    document.getElementById("video-2-timer").innerHTML = time2.toFixed(2) + "s";
  }, 10);
  video1.currentTime(startingTimeVideo1);
  video2.currentTime(startingTimeVideo2);
  video1.play();
  video2.play();
}

document.getElementById("start-btn").addEventListener("click", function () {
  startVideos();
});

const urlParams = new URLSearchParams(window.location.search);

// Get the value of the video1 URL parameter, if it exists
const video1Param = urlParams.get("video1");
if (video1Param) {
  var player = videojs.players.video1;
  player.poster("");
  player.src({
    src: `https://www.youtube.com/watch?v=${video1Param}`,
    type: "video/youtube",
  });
}

// Get the value of the video2 URL parameter, if it exists
const video2Param = urlParams.get("video2");
if (video2Param) {
  video2.src({
    src: `https://www.youtube.com/watch?v=${video2Param}`,
    type: "video/youtube",
  });
}

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

function copyToClipboard() {
  let url =
    window.location.href +
    "&start1=" +
    startingTimeVideo1.toFixed(4) +
    "&start2=" +
    startingTimeVideo2.toFixed(4);
  // Create a temporary input element
  const input = document.createElement("input");
  input.style.position = "absolute";
  input.style.left = "-9999px";
  input.value = url;
  document.body.appendChild(input);

  // Select the input field and copy the URL
  input.select();
  document.execCommand("copy");

  // Remove the input element
  document.body.removeChild(input);

  const notification = document.getElementById("share-msg");
  const button = document.getElementById("share-btn");

  notification.classList.remove("hidden");
  button.classList.add("hidden");

  setTimeout(function () {
    notification.classList.add("hidden");
    button.classList.remove("hidden");
  }, 1000);
}
