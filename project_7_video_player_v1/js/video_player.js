(function () {
  'use strict';
  /*********************************************
  ***** Support the video element?
  *********************************************/
  var supportsVideo = !!document.createElement('video').canPlayType;

  if (supportsVideo) {
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

    // If the browser doesn't support the progress element, set its state for some different styling
    // var supportsProgress = (document.createElement('progress').max !== undefined);
    // if (!supportsProgress) progress.setAttribute('data-state', 'fake');

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
    }

    /*********************************************
    ***** Alter the volume
    *********************************************/
    var alterVolume = function(dir) {
      checkVolume(dir);
    }

    /*********************************************
    ***** Fullscreen
    *********************************************/
    var setFullscreenData = function(state) {
      videoContainer.setAttribute('data-fullscreen', !!state);
      fullscreen.setAttribute('data-state', !!state ? 'cancel-fullscreen' : 'go-fullscreen');
    }

    // Checks if the document is currently in fullscreen mode
    var isFullScreen = function() {
      return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }

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
      }

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
      }

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
        if (video.paused || video.ended) video.play();
        else video.pause();
      }); 

      // Turn off all subtitles
      for (var i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'hidden';
      }

      // Creates and returns a menu item for the subtitles language menu
      // var subtitleMenuButtons = [];
      // var createMenuItem = function(id, lang, label) {
      //   var listItem = document.createElement('li');
      //   var button = listItem.appendChild(document.createElement('button'));
      //   button.setAttribute('id', id);
      //   button.className = 'subtitles-button';
      //   if (lang.length > 0) button.setAttribute('lang', lang);
      //   button.value = label;
      //   button.setAttribute('data-state', 'inactive');
      //   button.appendChild(document.createTextNode(label));
      //   button.addEventListener('click', function(e) {
      //     // Set all buttons to inactive
      //     subtitleMenuButtons.map(function(v, i, a) {
      //       subtitleMenuButtons[i].setAttribute('data-state', 'inactive');
      //     });
          // Find the language to activate
        //   var lang = this.getAttribute('lang');
        //   for (var i = 0; i < video.textTracks.length; i++) {
        //     // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
        //     if (video.textTracks[i].language == lang) {
        //       video.textTracks[i].mode = 'showing';
        //       this.setAttribute('data-state', 'active');
        //     }
        //     else {
        //       video.textTracks[i].mode = 'hidden';
        //     }
        //   }
        //   subtitlesMenu.style.display = 'none';
        // });
        // subtitleMenuButtons.push(button);
        // return listItem;
      // }
      // Go through each one and build a small clickable list, and when each item is clicked on, set its mode to be "showing" and the others to be "hidden"
      // var subtitlesMenu;
      // if (video.textTracks) {
      //   var df = document.createDocumentFragment();
      //   var subtitlesMenu = df.appendChild(document.createElement('ul'));
      //   subtitlesMenu.className = 'subtitles-menu';
      //   subtitlesMenu.appendChild(createMenuItem('subtitles-off', '', 'Off'));
      //   for (var i = 0; i < video.textTracks.length; i++) {
      //     subtitlesMenu.appendChild(createMenuItem('subtitles-' + video.textTracks[i].language, video.textTracks[i].language, video.textTracks[i].label));
      //   }
      //   videoContainer.appendChild(subtitlesMenu);
      // }


      subtitles.addEventListener('click', function(e) {
        if (subtitlesMenu) {
          subtitlesMenu.style.display = (subtitlesMenu.style.display == 'block' ? 'none' : 'block');
        }
      });

      // The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
      stop.addEventListener('click', function(e) {
        video.pause();
        video.currentTime = 0;
        progress.value = 0;
        // Update the play/pause button's 'data-state' which allows the correct button image to be set via CSS
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
        var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft + this.offsetParent.offsetParent.offsetLeft)) / this.offsetWidth;
        video.currentTime = pos * video.duration;
      });
    }
   }

 })();
