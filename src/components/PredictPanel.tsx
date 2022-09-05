import type {RefObject} from 'react';
import React from 'react';

type PredictPanelParams = {
	canvasRef: RefObject<HTMLCanvasElement>;
};

const InputImagePanel = (params: PredictPanelParams) => (
	<div>
		<canvas ref={params.canvasRef}/>
		<textarea/>
		<button>Predict</button>
	</div>
);

// Const imageData = context.getImageData(
// 	boundingBox[0].xCenter * canvas.width, boundingBox[0].yCenter * canvas.height, boundingBox[0].width * canvas.width, boundingBox[0].height * canvas.height,
// );

export default InputImagePanel;
