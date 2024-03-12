
function embedVideo() {
    var link = document.getElementById('youtubeLink').value;
    var video_id = link.split('v=')[1];
    var ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }

    var iframeMarkup = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' 
                        + video_id + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

    document.getElementById('videoContainer').innerHTML = iframeMarkup;
}

