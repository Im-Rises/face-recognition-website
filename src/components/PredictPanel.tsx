import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import * as tfjs from '@tensorflow/tfjs';
import {urlFaceRecognitionModel} from '../constants/links';
import {lfwArray10Images} from '../constants/lfw-array';
import {imgModelWidth, imgModelHeight, nbOutput} from '../canvas-handler/canvas-handler';
import {getImageData} from '../canvas-handler/canvas-handler';
import './PredictPanel.css';

const textAreatPredict: RefObject<HTMLTextAreaElement> = React.createRef<HTMLTextAreaElement>();
const model = tfjs.loadLayersModel(urlFaceRecognitionModel);

type PredictPanelParams = {
	canvasRef: RefObject<HTMLCanvasElement>;
};

const PredictPanel = (params: PredictPanelParams) =>
	(
		<div className={'predict-panel'}>
			<h2>Prediction panel</h2>
			<canvas ref={params.canvasRef} width={imgModelWidth} height={imgModelHeight} className={'croped-face'}/>
			<textarea ref={textAreatPredict} readOnly={true}/>
			<button onClick={() => {
				void model.then(model => {
					// Predict
					tfjs.engine().startScope();
					const imageData: ImageData = getImageData(params.canvasRef.current!);
					const tfImage = tfjs.browser.fromPixels(imageData, 3).expandDims(0);
					const prediction = (model.predict(tfImage) as tfjs.Tensor).dataSync();
					tfjs.engine().endScope();

					// Find the index of the highest probability
					const arrayResult = Array.from(prediction);
					const indices = [...arrayResult.keys()].sort((a, b) => arrayResult[b] - arrayResult[a]).slice(0, nbOutput);

					// Display the result
					textAreatPredict.current!.value = '';
					for (let i = 0; i < indices.length; i++) {
						textAreatPredict.current!.value += String(i + 1) + ' - ' + lfwArray10Images[indices[i]] + '\n';
					}
				});
			}}>Predict
			</button>
		</div>
	);

export default PredictPanel;
