var videoArray = [
  'resources/backgrounds/video-1.mp4',
  'resources/backgrounds/video-2.mp4',
  'resources/backgrounds/video-3.mp4',
  'resources/backgrounds/video-4.mp4'
];

document.getElementById('background').src = videoArray[Math.floor(Math.random() * videoArray.length)];
