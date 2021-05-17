import React from 'react'

const Avatar = () => {
    return (
        <section>
            <div>
                <video id="player" autoplay></video>
                <canvas id="canvas" width="320px" height="240px"></canvas>
            </div>
            <br />
            <div>
                <button id="capture-btn">Capture</button>
                <button id="new-capture-btn">Retake picture</button>
            </div>
            <div id="pick-image">
                <input type="file" accept="image/*" id="image-picker" />
            </div>
        </section>
    )
}

export default Avatar
