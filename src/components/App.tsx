import React, {useEffect} from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import blazeface from '@tensorflow-models/blazeface';
import './App.css';

const canvasBufferRef = React.createRef<HTMLCanvasElement>();
const webcamRef = React.createRef<Webcam>();
let faceDetector: blazeface.BlazeFaceModel;

function App() {
	useEffect(() => {
		setInterval(() => {
			updateCanvasBuffer();
		}, 40);
		setInterval(detectFaces, 100);
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

	ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
}

async function detectFaces() {
	if (faceDetector === null) {
		faceDetector = await blazeface.load();
	} else {
		const canvas = canvasBufferRef.current;
		if (canvas === null) {
			return;
		}

		const faces = await faceDetector.estimateFaces(canvas);

		if (faces.length > 0) {
			// Const [x1, y1] = faces[0].topLeft[0];
			// const [x2, y2] = faces[0].bottomRight;
			console.log('here');
			// Const width = x2 - x1;
			// const height = y2 - y1;
		}
	}
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
