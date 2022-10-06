import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import WebcamFaceDetector from './WebcamFaceDetector';
import PredictPanel from './PredictPanel';
import './App.css';
import About from './About';

const canvasBufferRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();
const croppedImageRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

const App = (): JSX.Element => (
	<div>
		<About/>
		<h1 className={'App-header'}>Face Recognition</h1>
		<div className={'App'}>
			<WebcamFaceDetector canvasRef={canvasBufferRef} outputCanvasRef={croppedImageRef}/>
			<PredictPanel canvasRef={croppedImageRef}/>
		</div>
	</div>
);

export default App;
