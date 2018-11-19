
const video = document.getElementById("videoElement");

if(navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => { 
        video.srcObject = stream 
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
    .catch(err => console.error(err));
}

module.exports = video;
