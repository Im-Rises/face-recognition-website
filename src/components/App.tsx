import type {RefObject} from 'react';
import React, {useEffect} from 'react';
import Webcam from 'react-webcam';
import type {CameraOptions} from 'react-use-face-detection';
import {useFaceDetection} from 'react-use-face-detection';
import type {NormalizedRect} from '@mediapipe/face_detection';
import FaceDetection from '@mediapipe/face_detection';
import {Camera} from '@mediapipe/camera_utils';

const canvasBufferRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();
const croppedImageRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

const App = (): JSX.Element => {
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
		const canvas = canvasBufferRef.current;
		const video = webcamRef!.current;
		drawInCanvas(video.video, canvas!);

		if (facesDetected) {
			drawRectangle(canvas!, boundingBox);
			getFaceImage(canvas!, boundingBox);
		}
	});

	return (
		<div>
			<div>
				<h1 className={'title'}>Face Recognition</h1>
			</div>
			<div className={'cam'}>
				<Webcam
					ref={webcamRef}
					style={{width: 0, height: 0}}
				/>
				<canvas ref={canvasBufferRef}/>
			</div>
			<div>
				<input type='file' multiple accept='image/*' onChange={onImageChange}/>
				<input type='text' placeholder={'https://myimagelink.png'}/>
				<button>Validate image from link</button>
				<canvas id={'img-input-canvas'}/>
			</div>
			<div>
				<button>Crop from video</button>
				<button>Crop from input</button>
				<canvas id={'cropped-face-canvas'} ref={croppedImageRef}/>
			</div>
			<div>
				<textarea/>
				<button>Predict</button>
			</div>
		</div>
	);
};

function drawInCanvas(video: HTMLVideoElement, canvas: HTMLCanvasElement) {
	const context = canvas.getContext('2d');
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	context!.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function drawRectangle(canvas: HTMLCanvasElement, boundingBox: NormalizedRect[]) {
	const context = canvas.getContext('2d');
	context!.beginPath();
	context!.lineWidth = 2;
	context!.strokeStyle = 'red';
	context!.rect(boundingBox[0].xCenter * canvas.width, boundingBox[0].yCenter * canvas.height, boundingBox[0].width * canvas.width, boundingBox[0].height * canvas.height);
	context!.stroke();
}

function getFaceImage(canvas: HTMLCanvasElement, boundingBox: NormalizedRect[]) {
	const context = canvas.getContext('2d');

	const croppedCanvas = croppedImageRef.current;
	const croppedContext = croppedCanvas!.getContext('2d');
	croppedContext!.drawImage(canvas, boundingBox[0].xCenter * canvas.width, boundingBox[0].yCenter * canvas.height, boundingBox[0].width * canvas.width, boundingBox[0].height * canvas.height, 0, 0, 100, 100);

	const imageData = context!.getImageData(
		boundingBox[0].xCenter * canvas.width, boundingBox[0].yCenter * canvas.height, boundingBox[0].width * canvas.width, boundingBox[0].height * canvas.height,
	);
}

function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
	const {files} = event.target;

	const file = files![0];
	// Const image = document.createElement('img');
	// image.src = URL.createObjectURL(file);
	// image.onload = () => {
	// Const canvas = document.querySelector('canvas')!;
	// Const canvas = document.getElementById('img-input-canvas')!;
	// Const ctx = canvas.getContext('2d')!;
	// canvas.width = image.width;
	// canvas.height = image.height;
	// const context = canvas.getContext('2d')!;
	// context.drawImage(image, 0, 0);
	// const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	// Const data = imageData.data;
	// const tensor = tf.browser.fromPixels(imageData, 4);
	// tensor.print();
	// };
}

export default App;
