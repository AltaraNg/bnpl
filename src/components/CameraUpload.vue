<template>
    <div class="container p-5" align="center">
  <div class="">
    <b>Your Cam:</b><br>
    <video ref="cameraStream" class="border border-5 border-danger"></video>
  </div>
  <div class="">
    <button :disabled="disable" id="flip-btn" class="btn btn-sm btn-warning" @click="flipCamera">
      Flip Camera
    </button>
    <button id="capture-camera" class="btn btn-sm btn-primary" @click="takePhoto">
      Take photo
    </button>
  </div>
  <div class="mt-3">
    <b>Output:</b>
    <br>
    <canvas id="canvas" class="bg-light shadow border border-5 border-success">
    </canvas>
  </div>
</div>
</template>
<script setup>
import{ref} from 'vue'
const disable = ref(false)
const cameraStream = ref(null);

  let constraints = { audio: false, video: true }
  let shouldFaceUser = true;

  // check whether we can use facingMode
  let supports = navigator.mediaDevices.getSupportedConstraints();
  if( supports['facingMode'] === true ) {
    // flipBtn.disabled = false;
  }

  let stream = null;

  function capture() {
    constraints.video = {
        width: {
        min: 192,
        ideal: 192,
        max: 192,
      },
      height: {
        min: 192,
        ideal: 192,
        max: 192
      },
      facingMode: shouldFaceUser ? 'user' : 'environment'
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
        stream  = mediaStream;
        cameraStream.value.srcObject = stream;
        cameraStream.value.play();
      })
      .catch(function(err) {
        console.log(err)
      });
  }
  function flipCamera(){
     if( stream == null ) return
    // we need to flip, stop everything
    stream.getTracks().forEach(t => {
      t.stop();
    });
    // toggle / flip
    shouldFaceUser = !shouldFaceUser;
    capture();
  }

  function takePhoto(){
    // Elements for taking the snapshot
      const video = document.querySelector('video');
       const canvas = document.querySelector('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
  }

  capture();
</script>
<style>
video  {
  width: 192px;
  height: 192px;
  background: rgba(0,0,0,0.2);
  -webkit-transform: scaleX(-1); /* mirror effect while using front cam */
  transform: scaleX(-1);         /* mirror effect while using front cam */
}

#canvas  {
  width: 192px;
  height: 192px;
  -webkit-transform: scaleX(-1); /* mirror effect while using front cam */
  transform: scaleX(-1);         /* mirror effect while using front cam */
}
</style>