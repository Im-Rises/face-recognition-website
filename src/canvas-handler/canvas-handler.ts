import type {NormalizedRect} from '@mediapipe/face_detection';

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

const getImageData = (canvas: HTMLCanvasElement): ImageData => {
	const ctx = canvas.getContext('2d');
	return ctx!.getImageData(0, 0, canvas.width, canvas.height);
};

export {drawInCanvas, drawRectangle, cropGetFaceImageVideo, getImageData};
