# face-recognition-website

<p align="center">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascriptLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="typescriptLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="tensorflowLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="scssLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" alt="cssLogo" style="height:50px;">
</p>

## Description

This is a website that allows you to upload an image, and it will detect faces in the image, and then it will recognize
the faces.

Click on the following link to go to the website:  
<https://im-rises.github.io/face-recognition-website/>

It is programmed in Javascript, TypeScript and React for the web part and uses TensorFlow and OpenCV for the AI and
video part. It works with Windows, Linux, MacOs, Android and iOS.

The model is based on the model I trained in the following repository:  
<https://github.com/Im-Rises/face_recognition_cnn/main>

> **Note**  
> This is still a work in progress, the model is not perfect, and the website is not finished yet.

## Screenshots

![prediction_arnold](https://user-images.githubusercontent.com/59691442/194687082-d2ffef68-6ebd-4e24-b4d6-9dec022ced56.png)

Sorry for the quality of the image, but it's the only one I have.

## Project architecture

You can find the source code in the `main` and `develop` branches. The build website is in the `gh-pages`
branch.

~~~
PhysicalEngine
├── .github
│  ├── workflows
│  │   |── codeql.yml
│  │   |── dependency-review.yml
│  │   |── eslint.yml
│  │   |── greetings.yml
│  │   |── label.yml
│  │   |── node.yml
│  │   |── stale.yml
|  ├── labeler.yml
|  ├── release.yml
├── public
│  ├── favicon.png
│  ├── index.html
│  ├── manifest.json
│  ├── robots.txt
├── src
|  ├── canvas-handler
│  │   |── canvas-handler.ts
|  ├── components
│  │   |── About.scss
│  │   |── About.css
│  │   |── About.tsx
│  │   |── App.scss
│  │   |── App.css
│  │   |── App.tsx
│  │   |── PredictPanel.scss
│  │   |── PredictPanel.css
│  │   |── PredictPanel.tsx
│  │   |── WebcamFaceDetector.scss
│  │   |── WebcamFaceDetector.css
│  │   |── WebcamFaceDetector.tsx
|  ├── constants
│  │   |── lfw-array.ts
│  │   |── links.ts
│  ├── reports
│  │   |── reportWebVitals.ts
|  ├── settings
│  │   |── reac-app-env.d.ts
|  ├── styles
│  │   |── global.scss
│  │   |── global.css
|  ├── test
│  │   |── App.test.tsx
│  │   |── setupTests.ts
|  ├── index.scss
│  ├── index.css
│  ├── index.tsx
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitattributes
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── yarn.lock
~~~

## Dependencies

The project is using React, TypeScript, JavaScript, TensorFlow, Mediapipe, SCSS, CSS,

You can find the dependencies in the `dependencies` folder.

## Deployment

To deploy the website, you need to run the following command:

```bash
npm run deploy
```

or if you are using yarn:

```bash 
yarn deploy
```

## Code style

The project is formatted using ESLint and Xo.

## GitHub Actions

[![pages-build-deployment](https://github.com/Im-Rises/face-recognition-website/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Im-Rises/face-recognition-website/actions/workflows/pages/pages-build-deployment)
[![Node.js CI](https://github.com/Im-Rises/face-recognition-website/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Im-Rises/face-recognition-website/actions/workflows/node.js.yml)
[![ESLint](https://github.com/Im-Rises/face-recognition-website/actions/workflows/eslint.yml/badge.svg?branch=main)](https://github.com/Im-Rises/face-recognition-website/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/Im-Rises/face-recognition-website/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/Im-Rises/face-recognition-website/actions/workflows/codeql.yml)

The project is set up to run the following actions:

- pages-build-deployment : Builds the website and deploys it to GitHub Pages.
- node.js.yml : Runs the tests for the Node.js project.
- eslint.yml : Runs the ESLint linter on the project.
- codeql.yml : Runs the CodeQL linter on the project.

## Documentations

Typescript tutorial:  
<https://www.typescripttutorial.net>

React:  
<https://reactjs.org/tutorial/tutorial.html>

React with GitHub pages:  
<https://github.com/gitname/react-gh-pages>

Eslint:  
<https://eslint.org/docs/latest/user-guide/getting-started>

Xo code-style:  
<https://github.com/xojs/xo>

Mediapipe:  
<https://google.github.io/mediapipe/solutions/face_detection#javascript-solution-api>

react-use-face-detection:  
<https://github.com/lauirvin/react-use-face-detection>

## Contributors

Quentin MOREL :

- @Im-Rises
- <https://github.com/Im-Rises>

[![GitHub contributors](https://contrib.rocks/image?repo=Im-Rises/face-recognition-website)](https://github.com/Im-Rises/face-recognition-website/graphs/contributors)
