import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import {loadLayersModel, tensor, browser} from '@tensorflow/tfjs';
import {urlFaceRecognitionModel} from '../constants/links';
import {lfwArray10Images} from '../constants/lfw-array';
import {getImageData} from '../canvas-handler/canvas-handler';
import './PredictPanel.css';

type PredictPanelParams = {
	canvasRef: RefObject<HTMLCanvasElement>;
};

const result = '';
const model = loadLayersModel(urlFaceRecognitionModel);

const PredictPanel = (params: PredictPanelParams) =>
	(
		<div className={'predict-panel'}>
			<h2>Prediction panel</h2>
			<canvas ref={params.canvasRef} width={94} height={125} className={'croped-face'}/>
			<textarea value={result} readOnly={true}/>
			<button onClick={() => {
				void model.then(model => {
					const imageData: ImageData = getImageData(params.canvasRef.current!);
					const tfImage = browser.fromPixels(imageData, 3).expandDims(0);
					const prediction = model.predict(tfImage);
					console.table(prediction);
					// Let predict = Array.from(prediction[].dataSync());
					// Const input = tensor(lfwArray10Images);
					// const output = model.predict(input);
					// console.log(output);
				});
			}}>Predict
			</button>
		</div>
	);

export default PredictPanel;
