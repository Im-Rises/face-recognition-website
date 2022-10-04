import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import Webcam from 'react-webcam';
import type {CameraOptions} from 'react-use-face-detection';
import {useFaceDetection} from 'react-use-face-detection';
import type {NormalizedRect} from '@mediapipe/face_detection';
import FaceDetection from '@mediapipe/face_detection';
import {Camera} from '@mediapipe/camera_utils';

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
		<div className={'cam'}>
			{isLoading ? <p>Loading...</p> : ''}
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

const drawInCanvas = (video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
	const context = canvas.getContext('2d');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	context!.drawImage(video, 0, 0, canvas.width, canvas.height);
};

const drawRectangle = (canvas: HTMLCanvasElement, boundingBox: NormalizedRect[]) => {
	const context = canvas.getContext('2d');
	context!.beginPath();
	context!.lineWidth = 2;
	context!.strokeStyle = 'red';
	context!.rect(boundingBox[0].xCenter * canvas.width, boundingBox[0].yCenter * canvas.height, boundingBox[0].width * canvas.width, boundingBox[0].height * canvas.height);
	context!.stroke();
};

const cropGetFaceImageVideo = (canvas: HTMLCanvasElement, outputCanvas: HTMLCanvasElement, boundingBox: NormalizedRect[]) => {
	const croppedContext = outputCanvas.getContext('2d');
	croppedContext!.drawImage(canvas, boundingBox[0].xCenter * canvas.width, boundingBox[0].yCenter * canvas.height, boundingBox[0].width * canvas.width, boundingBox[0].height * canvas.height, 0, 0, 100, 100);
};

export default WebcamFaceDetector;
