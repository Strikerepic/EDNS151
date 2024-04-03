var timeValues = [];
    function changeVideoSource() {
        var fileInput = document.getElementById('videoFile');
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var videoPath = e.target.result;

            // Get the video element
            var videoElement = document.getElementById('videoPlayer');

            if (videoElement) {
                // Set the video element's src attribute
                videoElement.src = videoPath;
            }
        };

        reader.readAsDataURL(file);
    }
    function logCurrentTime() {
    var videoPlayer = document.getElementById('videoPlayer');
    setInterval(function() {
      console.log("Current Time:" + videoPlayer.currentTime);
    }, 1000);
    return videoPlayer.currentTime;
  }

    function storeTime() {
    var videoPlayer = document.getElementById('videoPlayer');
    var currentTime = videoPlayer.currentTime;
    
    if (!timeValues.includes(currentTime)) {
      timeValues.push(currentTime);
      createButtons();
    }
  }

  function createButtons() {
  var container = document.getElementById('buttonContainer');
  container.innerHTML = '';
  timeValues.forEach(function(time, index) {
    var div = document.createElement('div');
    var button = document.createElement('button');
    var delBut = document.createElement('button');
    delBut.textContent = 'Delete This';
    delBut.onmouseup = function() {
      timeValues.splice(index, 1); // Delete the time at the current index
      container.removeChild(div); // Remove the div containing the button
    };
    button.textContent = 'Time ' + (index + 1) + ': ' + time;
    button.onmouseup = function() {
      var videoPlayer = document.getElementById('videoPlayer');
      videoPlayer.currentTime = time;
      timeValues.splice(index, 1); // Delete the time at the current index
    };
    div.appendChild(button);
    div.appendChild(delBut);
    container.appendChild(div);
  });
}

  function jumpToLast() {
    var videoPlayer = document.getElementById('videoPlayer');
    var lastTime = timeValues[timeValues.length - 1];
    videoPlayer.currentTime = lastTime;
  }


  function goForward10S() {
    var videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.currentTime += 10;
  }


  function goBack10S() {
    var videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.currentTime -= 10;
  }


  function loopBetweenLast2StopPoints() {
    var checkBoxState = document.getElementById('loopCheckbox');
    var videoPlayer = document.getElementById('videoPlayer');

    if(checkBoxState.checked) {
      var lastTime = timeValues[timeValues.length - 1];
      var secondLastTime = timeValues[timeValues.length - 2];
      videoPlayer.currentTime = secondLastTime;
      videoPlayer.ontimeupdate = function() {
        if (videoPlayer.currentTime >= lastTime) {
          videoPlayer.currentTime = secondLastTime;
        }
      };
    } else {
      videoPlayer.ontimeupdate = null; // Remove the event handler when the checkbox is unchecked
    }
  }

