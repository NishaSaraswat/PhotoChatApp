import React, { useState, useEffect, useRef } from 'react';

const Camera = () => {

  let  [picture, setPicture] = useState();
  let [address, setAddress] = useState({});
  let fetchedLocation = { lat: 0, lng: 0 };

  const videoPlayer = useRef()
  const canvas = useRef()
  const canvasElement=useRef()
  const captureButton = useRef()
  const newCaptureButton = useRef()
  const postButton = useRef()
  const imagePickerArea=useRef()
  const locationDisplay=useRef()
  const savedPicture=useRef()


  const toggleDisplay = (elementItem, displayStatus) => {
    elementItem.style = { display: displayStatus };
  }

  useEffect(() => {
    initializeMedia();
  }, [videoPlayer])

  const initializeMedia=async ()=>{
    captureButton.current.style.display = 'block';
    newCaptureButton.current.style.display = 'none';
  
    if (!('mediaDevices' in navigator)) {
      navigator.mediaDevices = {};
    }
    // handle different browser implementations
    if (!('getUserMedia' in navigator.mediaDevices)) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented!'));
        }
  
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }
    
    // this prompts the user to enable the camera
    let stream = await navigator.mediaDevices.getUserMedia({
      video: { 
        facingMode: "environment" // front-camera (back-camera is 'environment')
      }
    }).catch(() => {
      imagePickerArea.style.display = 'block';
    });
  
    // stream the camera-image to the video
    videoPlayer.current.srcObject = stream;
    videoPlayer.current.style.display = 'block';
    canvas.current.style.display = 'none';
  }
  
  const captureImage = () => {

    canvas.current.style.display = 'block';
    videoPlayer.current.style.display = 'none';
    captureButton.current.style.display = 'none';
    newCaptureButton.current.style.display = 'block';

  // take the image from the videoplayer and add to the canvas
  // to enable converting the image to a blob (file)
  //let context = canvasElement.current.getContext('2d');
  //context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));
  const ctx = canvas.current.getContext('2d');
// Draw the current frame from the video on the canvas.
    ctx.drawImage(videoPlayer.current, 0, 0, canvas.current.width, canvas.current.height);
  console.log('capture image')
  // stop player
  videoPlayer.current.srcObject.getVideoTracks().forEach(function (track) {
    track.stop();
  });

  // store picture blob in variable, and set quality to 80%
  // to decrease file-size
  picture = dataURItoBlob(canvas.current.toDataURL('image/jpeg', 0.8));
  }

  const pickImage = (e) => {
    setPicture(e.target.files[0])
  }

  const getGeolocation = () => {
    locationDisplay.current.innerHTML = ''

  if (!('geolocation' in navigator)) {
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    fetchedLocation = {lat: position.coords.latitude, lng: position.coords.longitude};

    address = await fetch(`https://geocode.xyz/${fetchedLocation.lat},${fetchedLocation.lng}?geoit=json`)
    address = await address.json()
    console.log(address);

    locationDisplay.insertAdjacentHTML('beforeend', `
      lat: ${fetchedLocation.lat}
      <br>
      lng: ${fetchedLocation.lng}
      <br><br>
      city: ${address.city}
      <br>
      street: ${address.staddress}
    `)
  }, 
  function(err) {
    console.log(err);
    alert('Couldn\'t fetch location!');
    fetchedLocation = {lat: 0, lng: 0};

    // timeout: amount of time before the error callback is invoked
  }, {timeout: 7000});
  }

  const uploadPicture = async () => {
    let formData = new FormData()
    formData.append('file', picture, Date.now() + '.jpg')
    formData.append('location', JSON.stringify(fetchedLocation))
    formData.append('address', JSON.stringify(address))

  let res = await fetch('/www/upload', {
    method: 'POST',
    body: formData
  })

  res = await res.json()
  console.log(res);

  // display uploaded picture
  savedPicture.current.src = '/uploads/' + res.file.name
  console.log('upload picture function')
  }

  const dataURItoBlob = (dataURI) => {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], {type: mimeString});
    return blob;
  }
  return (
    <div>
      <div>
        <video ref={videoPlayer} id="player" autoPlay style={{ display: 'block'}}></video>
        <canvas ref={canvas} id="canvas" width="240px" height="240px"></canvas>
        <button ref={captureButton} id="capture-btn" onClick={captureImage}>Capture</button>
        <button ref={newCaptureButton} id="new-capture-btn" onClick={initializeMedia}>Retake picture</button>
      </div>
      <div id="pick-image">
        <input type="file" accept="image/*" id="image-picker" onChange={pickImage} />
      </div>

      <button id="location-btn" onClick={getGeolocation}>Get Location</button>
      <div id="location-display" ref={locationDisplay}></div>

      <button ref={postButton} id="post-btn" onClick={uploadPicture}>Post image</button>

      <p>Saved picture:</p>
      <img id="saved-picture" ref={savedPicture}/>

    </div>
  )
}

export default Camera;
