import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import Webcam from 'react-webcam';
import type {CameraOptions} from 'react-use-face-detection';
import {useFaceDetection} from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import {Camera} from '@mediapipe/camera_utils';
import {drawInCanvas, drawRectangle, cropGetFaceImageVideo} from '../canvas-handler/canvas-handler';
import './WebcamFaceDetector.css';

const canvasVideoBuffer: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

type CameraParams = {
	canvasRef: RefObject<HTMLCanvasElement>;
	outputCanvasRef: RefObject<HTMLCanvasElement>;
};

const WebcamFaceDetector = (params: CameraParams) => {
	const {webcamRef, boundingBox, isLoading, detected, facesDetected} = useFaceDetection({
		faceDetectionOptions: {
			model: 'short',
		},
		faceDetection: new FaceDetection.FaceDetection({
			locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
		}),
		camera: ({mediaSrc, onFrame, width, height}: CameraOptions) =>
			new Camera(mediaSrc, {
				onFrame,
				width,
				height,
			}),
	});

	useEffect(() => {
		const canvas = params.canvasRef.current;
		const video = (webcamRef! as RefObject<Webcam>).current;
		drawInCanvas(video!.video!, canvas!);
		drawInCanvas(video!.video!, canvasVideoBuffer.current!);
		if (facesDetected) {
			drawRectangle(canvas!, boundingBox);
		}
	});

	return (
		<div className={'webcam-panel'}>
			{/* {isLoading ? <p>Loading...</p> : ''} */}
			<p style={isLoading ? {display: 'block'} : {display: 'none'}}>Loading camera...</p>
			<Webcam
				ref={webcamRef}
				style={{width: 0, height: 0}}
			/>
			<canvas ref={params.canvasRef}/>
			<canvas ref={canvasVideoBuffer} style={{width: 0, height: 0}}/>
			<button onClick={() => {
				cropGetFaceImageVideo(canvasVideoBuffer.current!, params.outputCanvasRef.current!, boundingBox);
			}}>Crop face
			</button>
		</div>);
};

export default WebcamFaceDetector;
