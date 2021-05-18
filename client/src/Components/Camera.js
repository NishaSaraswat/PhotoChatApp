import React,{useState, useEffect} from 'react';

const Camera = () => {
    
    const [picutre, setPicture]=useState([]);

    const videoPlayer = React.forwardRef((props, ref) => {
        return <video ref={ref} autoplay></video>
    });

    const canvasElement = React.forwardRef((props, ref) => {
        return  <canvas id="canvas" width="320px" height="240px" ref={ref}></canvas>
    });

    const canvas = React.forwardRef((props, ref) => {
        return  <canvas id="canvas" width="320px" height="240px" ref={ref}></canvas>
    });
    
    const captureButton = React.forwardRef((props, ref) => {
        return  <button id="capture-btn" onClick={captureImage} ref={ref}>Capture</button>
    });

    const newCaptureButton = React.forwardRef((props, ref) => {
        return  <button id="new-capture-btn">Retake picture</button>
    });


    const imagePickerArea = React.forwardRef((props, ref) => {
        return  <div id="pick-image" ref={ref}>
                    <input type="file" accept="image/*" id="image-picker" onChange={pickImage}/>
                </div>
  
    });
    
    useEffect(()=>{
        initializeMedia();
        console.log(videoPlayer)
    },[])

    const initializeMedia=async ()=>{
      
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
            facingMode: "enviroment" // front-camera (back-camera is 'environment')
          }
        }).catch(() => {
          //imagePickerArea.style.display = 'block';
        });
      
        // stream the camera-image to the video
        videoPlayer.srcObject = stream;
        //videoPlayer.style.display = 'block';
        //canvasElement.style.display = 'none';
      }
      
    const dataURItoBlob=(dataURI)=>{
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
      
    const captureImage=()=>{
        // replace video player with canvas showing the picture
        canvasElement.style.display = 'block';
        videoPlayer.style.display = 'none';
       
      
        // take the image from the videoplayer and add to the canvas
        // to enable converting the image to a blob (file)
        let context = canvasElement.getContext('2d');
        context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));
      
        // stop player
        videoPlayer.srcObject.getVideoTracks().forEach(function (track) {
          track.stop();
        });
      
        // store picture blob in variable, and set quality to 80%
        // to decrease file-size
        setPicture(dataURItoBlob(canvasElement.toDataURL('image/jpeg', 0.8)));
      }
      
    const pickImage=(e)=>{
        setPicture(e.target.files[0])
    }
    return (
        <section>
            <div>
                <video id="player" autoPlay style={{display:'block'}}></video>
                <canvas id="canvas" width="320px" height="240px" style={{display:'none'}} ></canvas>
                <br />
                <button id="capture-btn" onClick={captureImage} style={{display:'block'}}>Capture</button>
                <button id="new-capture-btn" onClick={initializeMedia} style={{display:'none'}}>Retake picture</button>
            </div>
            <div id="pick-image">
                <input type="file" accept="image/*" id="image-picker" onChange={pickImage}/>
            </div>
          
            <button id="post-btn">Post image</button>
            <br />
        </section>  
    )
}

export default Camera;
