import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import * as tfjs from '@tensorflow/tfjs';
import {urlFaceRecognitionModel} from '../constants/links';
import {lfwArray10Images} from '../constants/lfw-array';
import {imgModelWidth, imgModelHeight} from '../canvas-handler/canvas-handler';
import {getImageData} from '../canvas-handler/canvas-handler';
import './PredictPanel.css';

const textAreatPredict: RefObject<HTMLTextAreaElement> = React.createRef<HTMLTextAreaElement>();

type PredictPanelParams = {
	canvasRef: RefObject<HTMLCanvasElement>;
};

const result = '';
const model = tfjs.loadLayersModel(urlFaceRecognitionModel);

const PredictPanel = (params: PredictPanelParams) =>
	(
		<div className={'predict-panel'}>
			<h2>Prediction panel</h2>
			<canvas ref={params.canvasRef} width={imgModelWidth} height={imgModelHeight} className={'croped-face'}/>
			<textarea value={result} readOnly={true}/>
			<button onClick={() => {
				void model.then(model => {
					tfjs.engine().startScope();

					const imageData: ImageData = getImageData(params.canvasRef.current!);
					const tfImage = tfjs.browser.fromPixels(imageData, 3).expandDims(0);
					const prediction = (model.predict(tfImage) as tfjs.Tensor).dataSync();

					tfjs.engine().endScope();

					const result = Array.from(prediction);
					const maxIndex = result.indexOf(Math.max(...result));

					console.log('Prediction: ', result);

					// Const sdjijdsqiqds = Array.from(prediction.dataSync());
					// Prediction.dataSync().data().then(y => {
					// 	// YArr.push(Number(y));
					// 	// if (x == 10) {
					// 	// 	plot(xArr, yArr);
					// 	// }
					// });

					// Const test = tfjs.Rank.R0;
					// Console.log(prediction[]);

					// (prediction as tfjs.Tensor).print();
					// Console.table(prediction);
					// console.log(prediction);
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
