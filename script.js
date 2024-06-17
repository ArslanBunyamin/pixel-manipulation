var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var shade =
  " .'`^" +
  '"' +
  ",:;Ili!<>~+-_?-[]{})1(|/tfjrxnurovcxzXYUJCQL0OZmwqpbkdhao*#MW&8%B@$";
function getPixelBrightness(imageData, x, y) {
  var index = (y * imageData.width + x) * 4;
  var red = imageData.data[index];
  var green = imageData.data[index + 1];
  var blue = imageData.data[index + 2];
  return Math.floor((red + green + blue) / 3);
}
function draw() {
  if (!video.videoHeight) return requestAnimationFrame(draw);
  if (!ctx) return alert("html canvas desteklenmiyor!");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var resolution = 6;
  var videoWidth = video.videoWidth / resolution;
  var videoHeight = video.videoHeight / resolution;
  ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
  var data = ctx.getImageData(0, 0, videoWidth, videoHeight);
  // ctx.clearRect(0, 0, videoWidth, videoHeight)
  var charSize;
  var paddingleft = 0;
  if (window.innerHeight < window.innerWidth) {
    charSize = window.innerHeight / videoHeight;
    paddingleft = window.innerWidth / 2 - (videoWidth * charSize) / 2;
  } else {
    charSize = window.innerWidth / videoWidth;
    paddingleft = 0;
  }
  for (var x = 0; x < data.width; x++) {
    for (var y = 0; y < data.height; y++) {
      var brihtness = getPixelBrightness(data, x, y);
      var shadeIndex = Math.floor((brihtness * shade.length) / 255);
      ctx.font = charSize + "px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(shade[shadeIndex], paddingleft + x * charSize, y * charSize);
    }
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
// Select the video element
var video = document.getElementById("webcam");
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    if (video) {
      video.srcObject = stream;
    }
  });
}
