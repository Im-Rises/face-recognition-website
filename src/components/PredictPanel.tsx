import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import {loadLayersModel, tensor, browser} from '@tensorflow/tfjs';
import {urlFaceRecognitionModel} from '../constants/links';
import {lfwArray10Images} from '../constants/lfw-array';

type PredictPanelParams = {
	canvasRef: RefObject<HTMLCanvasElement>;
};

const result = '';
const model = loadLayersModel(urlFaceRecognitionModel);

const InputImagePanel = (params: PredictPanelParams) => {
	useEffect(() => {
		// Load model
	}, []);

	return (
		<div>
			<canvas ref={params.canvasRef}/>
			<textarea value={result} readOnly={true}/>
			<button onClick={() => {
				void model.then(model => {
					console.log('Model loaded');
					model.summary();
					const input = tensor(lfwArray10Images);
					const output = model.predict(input);
					console.log(output);
				});
				// If (params.canvasRef.current !== null) {
				// 	const imageData: ImageData = getImageData(params.canvasRef.current);
				// 	const tfImage = browser.fromPixels(imageData, 3).expandDims(0);
				// 	const prediction = model.then(model => model.predict(tfImage));
				// 	void prediction.then(prediction => {
				// 		// Array.from(prediction.toString());
				// 		console.log(prediction.toString());
				// 		console.log('here');
				// 	});
				// 	console.log(prediction);
				// }
			}}>Predict
			</button>
		</div>
	);
};

const getImageData = (canvas: HTMLCanvasElement): ImageData => {
	const ctx = canvas.getContext('2d');
	return ctx!.getImageData(0, 0, canvas.width, canvas.height);

	// Const canvas = params.canvasRef.current;
	// const imageData = getImageData(canvas!);
	// const tensor = tfjs.browser.fromPixels(imageData);
	// tensor.print();
	// tensor.dispose();
};

export default InputImagePanel;
