import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import WebcamFaceDetector from './WebcamFaceDetector';
import PredictPanel from './PredictPanel';
import './style/App.css';

const canvasBufferRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();
const croppedImageRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

const App = (): JSX.Element => (
	<div className={'App'}>
		<div>
			<h1 className={'App-header'}>Face Recognition</h1>
		</div>
		<WebcamFaceDetector canvasRef={canvasBufferRef} outputCanvasRef={croppedImageRef}/>
		<PredictPanel canvasRef={croppedImageRef}/>
	</div>
);

export default App;
