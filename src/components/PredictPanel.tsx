import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import tfjs from '@tensorflow/tfjs';

type PredictPanelParams = {
	canvasRef: RefObject<HTMLCanvasElement>;
};

const result = '';

const InputImagePanel = (params: PredictPanelParams) => {
	useEffect(() => {
		// Load model
	}, []);

	return (
		<div>
			<canvas ref={params.canvasRef}/>
			<textarea value={result} readOnly={true}/>
			<button onClick={() => {
				if (params.canvasRef.current !== null) {
					const imageData = getImageData(params.canvasRef.current);
					console.log(imageData);
				}
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
