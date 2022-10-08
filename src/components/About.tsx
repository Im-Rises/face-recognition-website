import React from 'react';
import './About.css';

const About = (): JSX.Element =>
	(
		<div className='App-header'>
			<div className={'App-link'}>
				<h2>Github project link</h2>
				<a href={'https://github.com/Im-Rises/face-recognition-website'} target={'_blank'} rel='noreferrer'>
					<p>Im-Rises/face-recognition-website</p></a>
			</div>
		</div>
	);

export default About;
