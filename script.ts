const canvas: HTMLCanvasElement = document.getElementById("theCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d", { willReadFrequently: true });
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const shade = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:," + '"' + "^`'. "

function getPixelBrightness(imageData: ImageData, x: number, y: number) {
  const index = (y * imageData.width + x) * 4;

  const red = imageData.data[index];
  const green = imageData.data[index + 1];
  const blue = imageData.data[index + 2];

  return Math.floor((red + green + blue) / 3)
}

function draw() {
  if (!video.videoHeight) return requestAnimationFrame(draw);
  if (!ctx) return alert("html canvas desteklenmiyor!");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const videoWidth = video.videoWidth / 12;
  const videoHeight = video.videoHeight / 12;

  ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
  const data = ctx.getImageData(0, 0, videoWidth, videoHeight);
  // ctx.clearRect(0, 0, videoWidth, videoHeight)
  let charSize: number;
  let paddingleft = 0;
  if (window.innerHeight < window.innerWidth) {
    charSize = window.innerHeight / videoHeight;
    paddingleft = window.innerWidth / 2 - videoWidth * charSize / 2;
  }
  else {
    charSize = window.innerWidth / videoWidth;
    paddingleft = 0;
  }

  for (let x = 0; x < data.width; x++) {
    for (let y = 0; y < data.height; y++) {
      const brihtness = getPixelBrightness(data, x, y);
      const shadeIndex = Math.floor(brihtness * shade.length / 255)
      ctx.font = charSize + "px Arial";
      ctx.fillText(shade[shadeIndex], paddingleft + x * charSize, y * charSize);
    }
  }



  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);


// Select the video element
const video = document.getElementById('webcam') as HTMLVideoElement;

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      if (video) {
        video.srcObject = stream;
      }

    })
}



