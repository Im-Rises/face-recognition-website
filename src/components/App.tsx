import React, {useEffect} from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import './App.css';

const canvasBufferRef = React.createRef<HTMLCanvasElement>();

function App() {
	useEffect(() => {
		setInterval(() => {
			console.log('Hello');
		}, 1000);
	}, []);

	return (
		<div>
			<div>
				<h1 className={'title'}>Face Recognition</h1>
			</div>
			<div className={'cam'}>
				<Webcam audio={false} style={{display: 'none'}}/>
				<canvas className={'canvas-buffer'} ref={canvasBufferRef}/>
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
				<textarea>Output here</textarea>
				<button>Predict</button>
			</div>
		</div>
	);
}

// UseEffect(() => {
//
// 	const canvas = canvasBufferRef.current;
// 	if (canvas === null) {
// 		return;
// 	}
//
// 	const context = canvas.getContext('2d');
// 	if (context === null) {
// 		return;
// 	}
//
// 	context.drawImage(document.querySelector('video')!, 0, 0, 640, 480);
//
// 	return () => {
// 		clearInterval(interval);
// 	};
// }, []);

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

// Async function loadModel() {
// 	const model = await tf.loadLayersModel('http://localhost:3000/model.json');
// 	model.summary();
// }

export default App;
