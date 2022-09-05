import type {RefObject} from 'react';
import React from 'react';
import type {NormalizedRect} from '@mediapipe/face_detection';
import {Camera} from '@mediapipe/camera_utils';
import FaceDetection from '@mediapipe/face_detection';

type InputImageParams = {
	outputCanvasRef: RefObject<HTMLCanvasElement>;
};

const imageRef: RefObject<HTMLImageElement> = React.createRef<HTMLImageElement>();
const canvasBufferFaceRef: RefObject<HTMLCanvasElement> = React.createRef<HTMLCanvasElement>();

const InputImagePanel = (params: InputImageParams) => {
	const faceDetection = new FaceDetection.FaceDetection({
		locateFile: file => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.0/${file}`,
	});

	faceDetection.onResults(() => {
		console.log('onResults');
	});

	return (
		<div>
			<img ref={imageRef} alt={'Selected Image'}/>
			<canvas ref={canvasBufferFaceRef}/>
			<input type='file' multiple accept='image/*' onChange={onImageChange}/><input type='text'
				placeholder={'https://myimagelink.png'}/>
			<button>Validate image from link</button>
			<button onClick={() => {
				const result = async () => {
					await faceDetection.send({image: imageRef.current!});
				};

				console.log(result());
			}}>Crop face
			</button>
		</div>
	);
};

const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	const {files} = event.target;
	const file = files![0];
	const image = imageRef.current!;
	image.src = URL.createObjectURL(file);
	image.onload = () => {
		const canvas = document.querySelector('canvas')!;
		canvas.width = image.width;
		canvas.height = image.height;
		const context = canvas.getContext('2d')!;
		context.drawImage(image, 0, 0);
	};
};

const cropGetFaceImage = (canvas: HTMLImageElement, outputCanvas: HTMLCanvasElement) => {
	// Const croppedContext = outputCanvas.getContext('2d');
	// croppedContext!.drawImage(canvas, boundingBox[0].xCenter * canvas.width, boundingBox[0].yCenter * canvas.height, boundingBox[0].width * canvas.width, boundingBox[0].height * canvas.height, 0, 0, 100, 100);
};

export default InputImagePanel;

