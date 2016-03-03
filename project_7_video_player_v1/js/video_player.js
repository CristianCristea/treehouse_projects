// init function, encapsulates all functions
function init() {
  var video = document.getElementById("video1");
  var playIcon = document.getElementById("play-icon");
  var videoFullscreen = document.getElementById("fullscreen");
  var progress = document.getElementById('progress');
  var progressBar = document.getElementById('progress-bar');
  var videoMute = document.getElementById("mute");
  var wrapper = document.getElementById("wrapper");
  var player = document.getElementById("player");
  var buttonBar = document.getElementById("button-bar");


  // Hide the default controls
  video.controls = false;

  // Display the user defined video controls
  buttonBar.style.display = 'block';

  // play
  function videoPlay() {
    var button = document.getElementById("play");

    if (video.paused) {
      console.log('play');
      video.play();
      playIcon.setAttribute("src", "img/icons/pause-icon.png");
      playIcon.setAttribute("alt", "pause icon");
    } else {
      console.log('pause');
      video.pause();
      playIcon.setAttribute("src", "img/icons/play-icon.png");
      playIcon.setAttribute("alt", "play icon");
    }
  }
// setAttribute("src", "img/icons/volume-off-icon.png");
  // function videoRestart() {
  //   video.currentTime = 0;
  // }

  function setTime(value) {
    if (value === 0) {
      video.currentTime = value;
    } else {
      video.currentTime  += value;
    }
  }

  function setVolume(value) {
    var vol = video.volume;

    val += value;

    if (vol >= 0 && vol <= 1) {
      video.volume = vol;
    } else {
      video.volume = (vol < 0) ? 0 : 1;
    }
  }

  function fullScreen() {

    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  video.addEventListener('loadedmetadata', function() {
    progress.setAttribute('max', video.duration);
  });

  // As the video is playing, update the progress bar
  video.addEventListener('timeupdate', function() {
    // For mobile browsers, ensure that the progress element's max attribute is set
    if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
    progress.value = video.currentTime;
    progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
  });

  // React to the user clicking within the progress bar
  progress.addEventListener('click', function(e) {
    var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
    video.currentTime = pos * video.duration;
  });


    

// button events
  // play
  document.getElementById("play").addEventListener("click", videoPlay, false);
  // restart
  // document.getElementById("restart").addEventListener("click", function(){
  //   setTime(0);
  // }, false);
  // skip backward 10s
  // document.getElementById("rew").addEventListener("click", function(){
  //   setTime(-10);
  // }, false);
  //skip forward 10s
  // document.getElementById("fwd").addEventListener("click", function(){
  //   setTime(10);
  // }, false);
  // mute
  videoMute.addEventListener("click", function(event) {
    var toggleMute = document.getElementsByClassName('toggleMute');
    if (video.muted) {
      video.muted = false;
      for (i = 0; i < toggleMute.length; i++) {
        toggleMute[0].setAttribute("src", "img/icons/volume-off-icon.png");
      }
      // event.target.innerHtml = "<img alt='volume off button' src='img/icons/volume-off-icon.png'";
    } else {
      video.muted = true;
      for (i = 0; i < toggleMute.length; i++) {
        toggleMute[0].setAttribute("src", "img/icons/volume-on-icon.png");
      }
      // event.target.innerHtml = "<img alt='volume off button' src='img/icons/volume-on-icon.png'";
    }
  }, false);
  // fullscreen
  videoFullscreen.addEventListener("click", fullScreen, false);

  player.addEventListener("mouseenter", function(event) {
    wrapper.classList.add("show");
    wrapper.classList.remove("hide");  
  }, false);

  player.addEventListener("mouseleave", function(event) {
    wrapper.classList.remove("show");
    wrapper.classList.add("hide");
  }, false);
} // end init


