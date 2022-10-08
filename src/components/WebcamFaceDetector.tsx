import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import Webcam from 'react-webcam';
import type {CameraOptions} from 'react-use-face-detection';
import {useFaceDetection} from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import {Camera} from '@mediapipe/camera_utils';
import {drawInCanvas, drawRectangle, cropGetFaceImageVideo} from '../canvas-handler/canvas-handler';
import './WebcamFaceDetector.css';

const canvasVideoFaceRectangleRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();
const canvasVideoBufferRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

type CameraParams = {
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
		const canvas = canvasVideoFaceRectangleRef.current!;
		const video = (webcamRef! as RefObject<Webcam>).current;
		drawInCanvas(video!.video!, canvas);
		drawInCanvas(video!.video!, canvasVideoBufferRef.current!);
		if (facesDetected) {
			drawRectangle(canvas, boundingBox);
		}
	});

	return (
		<div className={'webcam-panel'}>
			{/* {isLoading ? <p>Loading...</p> : ''} */}
			<h2>Webcam panel</h2>
			<p style={isLoading ? {display: 'block'} : {display: 'none'}}>Loading camera...</p>
			<Webcam
				ref={webcamRef}
				style={{width: 0, height: 0}}
			/>
			<canvas ref={canvasVideoBufferRef} style={{width: 0, height: 0}}/>
			<canvas ref={canvasVideoFaceRectangleRef}/>
			<button onClick={() => {
				cropGetFaceImageVideo(canvasVideoBufferRef.current!, params.outputCanvasRef.current!, boundingBox);
			}}>Crop face
			</button>
		</div>);
};

export default WebcamFaceDetector;
