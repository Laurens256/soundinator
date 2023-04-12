import * as Tone from 'tone';

const sampler = new Tone.Sampler({
    urls: {
        A1: 'sample_3.wav'
    },
    baseUrl: '/assets/audio/test_samples/',
}).toDestination();

const steps = 8;
let currentStep = 0;

const playAudio = async () => {
	await Tone.start();
	Tone.Transport.stop();
	Tone.Transport.cancel();

	Tone.Transport.scheduleRepeat((time) => {
		currentStep = (currentStep % steps) + 1;
		sampler.triggerAttackRelease('A1', '8n', time);
	});

	Tone.Transport.start();
};

const pauseAudio = () => {
	Tone.Transport.stop();
	currentStep = 0;
};


const playButton = document.querySelector('button.playbtn');
const pauseButton = document.querySelector('button.pausebtn');

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);

