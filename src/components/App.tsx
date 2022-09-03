import React from 'react';
import * as tf from '@tensorflow/tfjs';
import Webcam from 'react-webcam';
import './App.css';

function App() {
	return (
		<div className='App'>
			<input type='file' multiple accept='image/*' onChange={onImageChange} />
			<canvas/>
			<Webcam audio={false} style={{display: 'none'}}/>
		</div>
	);
}

function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
	const {files} = event.target;
	if (files === null) {
		return;
	}

	const file = files[0];
	const image = document.createElement('img');
	image.src = URL.createObjectURL(file);
	image.onload = () => {
		const canvas = document.querySelector('canvas')!;
		canvas.width = image.width;
		canvas.height = image.height;
		const context = canvas.getContext('2d')!;
		context.drawImage(image, 0, 0);
		const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		// Const data = imageData.data;
		const tensor = tf.browser.fromPixels(imageData, 4);
		tensor.print();
	};
}

export default App;
