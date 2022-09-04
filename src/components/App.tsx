import React, {useEffect} from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import './App.css';
import '@tensorflow-models/blazeface';
import {FaceDetection} from '@mediapipe/face_detection';

const canvasBufferRef = React.createRef<HTMLCanvasElement>();
const webcamRef = React.createRef<Webcam>();

const faceDetection = new FaceDetection({
	locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.0/${file}`,
});

faceDetection.onResults(results => {
	const canvas = canvasBufferRef.current;
	if (canvas === null) {
		return;
	}

	const ctx = canvas.getContext('2d');
	if (ctx === null) {
		return;
	}

	const video = webcamRef.current;
	if (video === null) {
		return;
	}

	if (results.detections.length > 0) {
		const detection = results.detections[0];
		const box = detection.boundingBox;
		const landmarksss = detection.landmarks;

		// Ctx.strokeStyle = 'red';
		// ctx.lineWidth = 2;
		ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
		// Ctx.strokeRect(box.xCenter, box.yCenter, box.width, box.height);
	} else {
		ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
	}
});

function App() {
	useEffect(() => {
		setInterval(() => {
			updateCanvasBuffer();
		}, 40);
	}, []);

	return (
		<div>
			<div>
				<h1 className={'title'}>Face Recognition</h1>
			</div>
			<div className={'cam'}>
				<Webcam audio={false} style={{width: 0, height: 0}}
					ref={webcamRef}/>
				<canvas className={'canvas-buffer'} ref={canvasBufferRef}
				/>
			</div>
			<div>
				<input type='file' multiple accept='image/*' onChange={onImageChange}/>
				<input type='text' placeholder={'https://myimagelink.png'}/>
				<button>Validate image from link</button>
				<canvas id={'img-input-canvas'}/>
			</div>
			<div>
				<button>Crop from video</button>
				<button>Crop from input</button>
				<canvas id={'cropped-face-canvas'}/>
			</div>
			<div>
				<textarea/>
				<button>Predict</button>
			</div>
		</div>
	);
}

// Async function loadModel() {
// 	const model = await tf.loadLayersModel('http://localhost:3000/model.json');
// 	model.summary();
// }

function updateCanvasBuffer() {
	const video = webcamRef.current;
	const canvas = canvasBufferRef.current;
	if (video === null || canvas === null) {
		return;
	}

	const ctx = canvas.getContext('2d');
	if (video.video === null || ctx === null) {
		return;
	}

	canvas.width = video.video.videoWidth;
	canvas.height = video.video.videoHeight;

	// Void faceDetection.send({image: video.video});
	ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
}

function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
	const {files} = event.target;
	if (files === null) {
		return;
	}

	const file = files[0];
	// Const image = document.createElement('img');
	// image.src = URL.createObjectURL(file);
	// image.onload = () => {
	// Const canvas = document.querySelector('canvas')!;
	// Const canvas = document.getElementById('img-input-canvas')!;
	// Const ctx = canvas.getContext('2d')!;
	// canvas.width = image.width;
	// canvas.height = image.height;
	// const context = canvas.getContext('2d')!;
	// context.drawImage(image, 0, 0);
	// const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	// Const data = imageData.data;
	// const tensor = tf.browser.fromPixels(imageData, 4);
	// tensor.print();
	// };
}

export default App;
