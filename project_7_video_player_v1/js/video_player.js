(function () {
  'use strict';

  /*********************************************
  ***** Support the video element?
  *********************************************/
  var supportsVideo = !!document.createElement('video').canPlayType;

  // if (supportsVideo) {
    var videoContainer = document.getElementById('videoContainer');
    var video = document.getElementById('video');
    var videoControls = document.getElementById('video-controls');

  /*********************************************
  ***** Hide default controls, display custom controls
  *********************************************/
    video.controls = false;
    videoControls.setAttribute('data-state', 'visible');

  /*********************************************
  ***** Elements
  *********************************************/
    var playpause = document.getElementById('playpause');
    var stop = document.getElementById('stop');
    var mute = document.getElementById('mute');
    var volinc = document.getElementById('volinc');
    var voldec = document.getElementById('voldec');
    var progress = document.getElementById('progress');
    var progressBar = document.getElementById('progress-bar');
    var fullscreen = document.getElementById('fs');
    var subtitles = document.getElementById('subtitles');

  /*********************************************
  ***** Fullscreen API support ?
  *********************************************/
    var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);

  /*********************************************
  ***** If the browser doesn't support the Fulscreen API then hide the fullscreen button
  *********************************************/
    if (!fullScreenEnabled) {
      fullscreen.style.display = 'none';
    }

  /*********************************************
  ***** Check the volume
  *********************************************/
    var checkVolume = function(dir) {
      if (dir) {
        var currentVolume = Math.floor(video.volume * 10) / 10;
        if (dir === '+') {
          if (currentVolume < 1) video.volume += 0.1;
        }
        else if (dir === '-') {
          if (currentVolume > 0) video.volume -= 0.1;
        }
        if (currentVolume <= 0) video.muted = true;
        else video.muted = false;
      }
      changeButtonState('mute');
    };

  /*********************************************
  ***** Alter the volume
  *********************************************/
    var alterVolume = function(dir) {
      checkVolume(dir);
    };

  /*********************************************
  ***** Fullscreen
  *********************************************/
    var setFullscreenData = function(state) {
      videoContainer.setAttribute('data-fullscreen', !!state);
      fullscreen.setAttribute('data-state', !!state ? 'cancel-fullscreen' : 'go-fullscreen');
    };

  /************************************************************
  ***** Checks if the document is currently in fullscreen mode
  ************************************************************/
    var isFullScreen = function() {
      return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    };

    var handleFullscreen = function() {
      if (isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        setFullscreenData(false);
      }
      else {
        if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
        else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
        else if (videoContainer.webkitRequestFullScreen) {
          video.webkitRequestFullScreen();
        }
        else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
        setFullscreenData(true);
      }
    };

    if (document.addEventListener) {
      video.addEventListener('loadedmetadata', function() {
        progress.setAttribute('max', video.duration);
      });

  /*********************************************
  ***** Changes the button state
  *********************************************/
    var changeButtonState = function(type) {
      // Play/Pause button
      if (type == 'playpause') {
        if (video.paused || video.ended) {
          playpause.setAttribute('data-state', 'play');
        }
        else {
          playpause.setAttribute('data-state', 'pause');
        }
      }
      // Mute button
      else if (type == 'mute') {
        mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
      }
    };

  /*********************************************
  ***** Events
  *********************************************/
    video.addEventListener('play', function() {
      changeButtonState('playpause');
    }, false);
    video.addEventListener('pause', function() {
      changeButtonState('playpause');
    }, false);
    video.addEventListener('volumechange', function() {
      checkVolume();
    }, false);    
    playpause.addEventListener('click', function(e) {
      $(transcript).removeClass("highlight");
      if (video.paused || video.ended) video.play();
      else video.pause();
    }); 

    stop.addEventListener('click', function(e) {
      video.pause();
      video.currentTime = 0;
      progress.value = 0;
      changeButtonState('playpause');
    });
    mute.addEventListener('click', function(e) {
      video.muted = !video.muted;
      changeButtonState('mute');
    });
    volinc.addEventListener('click', function(e) {
      alterVolume('+');
    });
    voldec.addEventListener('click', function(e) {
      alterVolume('-');
    });
    fs.addEventListener('click', function(e) {
      handleFullscreen();
    });

  /*********************************************
  ***** Update the progress bar
  *********************************************/
    video.addEventListener('timeupdate', function() {
      if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
      progress.value = video.currentTime;
      progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
    });

    progress.addEventListener('click', function(e) {
      $(transcript).removeClass("highlight");
      var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft + this.offsetParent.offsetParent.offsetLeft)) / this.offsetWidth;
      video.currentTime = pos * video.duration;
    });
  }
 // }

  /******************************************
  ***** Hide controls except Progress Bar
  ******************************************/
  var $buttonsToHide = $("button.hide");
  var $videoContainer = $("#videoContainer");
  var $controls = $(".controls");
  var $dataFullscreenControls = $('figure[data-fullscreen="true"]').children('.controls');

  $videoContainer.mouseenter(function () {
    $buttonsToHide.fadeIn(400);
    $controls.animate({
    bottom: "50px"
   }, 400);
  });

  $videoContainer.mouseleave(function () {
    $buttonsToHide.fadeOut(400);
    $controls.animate({
    bottom: "20px"
   }, 400);
  });

  /******************************************
  ***** Highlight Text from Video
  ******************************************/
  function intoSeconds(seconds, showHours) {
    if(showHours) {
        var hours = Math.floor(seconds / 3600),
            seconds = seconds - hours * 3600;
    }
    var minutes = ("0" + Math.floor(seconds/60)).slice(-2);
    var seconds = ("0" + parseInt(seconds%60,10)).slice(-2);

    if(showHours) {
        var time = hours + ":" + minutes + ":" +  seconds;
    } else {
        var time = minutes + ":" + seconds + " " + "/";
    }
    return time;
  }

  var $video = $('#video');
  $video.on("timeupdate", function () {
    $('#current').html(intoSeconds($video[0].currentTime));
    $('#duration').html(intoSeconds($video[0].duration));
  });

  function secondsFromTimespan(timeSpan) {
    if(!timeSpan || !timeSpan.indexOf(':')) return 0;
    var parts = timeSpan.split(':');
    return +parts[0] * 60 + +parts[1]
  }

  var transcript = $("span[data-start]");
  var i = 0;
  var time = intoSeconds(video.currentTime);

  $.each(transcript, function() {
    var start = $(transcript[i]).attr("data-start");
    var startNum = parseFloat(start);
    if (time >= startNum) {
      $(transcript[i]).addClass("highlight");
    } else {
      $(transcript[i]).removeClass("highlight");
    }
    i++;
  });

  video.addEventListener('timeupdate', function() {
    for(i=0; i < transcript.length; i++) {
      if(secondsFromTimespan($(transcript[i]).attr("data-start")) == Math.floor(video.currentTime)){
        if(i === 0) {
           $(transcript[i]).addClass("highlight");
        }else{
           $(transcript[i-1]).removeClass("highlight");
           $(transcript[i]).addClass("highlight");
        }
      }
    }
  });
})();
