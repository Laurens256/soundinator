import * as Tone from 'tone';
import { sampler, columns, columnElements, enabledSteps } from './main';
import { highlightCurrentStep } from './board';

// keep track of the current step
let currentStep = 0;

const playAudio = async () => {
    await Tone.start();

    Tone.Transport.scheduleRepeat((time) => {
        currentStep = (currentStep % columns) + 1;

        const currentColumnIndex = currentStep - 1;
        const currentColumn = columnElements[currentColumnIndex];

        // loop through the buttons in the current column
        for (const [row, button] of currentColumn.entries()) {
            // if the step is not enabled, skip it
            if (!enabledSteps[row][currentColumnIndex]) continue;

            // let duration = 0;
            // load the buffer and get the duration of the sample
            // const buffer = new Tone.Buffer(`${baseFileUrl}${urls.A1}`, () => {
            //     duration = buffer.duration;
            // });

            sampler.triggerAttackRelease('A1', '8n', time);
            // sampler.triggerAttackRelease('A1', duration, time);
        }
        highlightCurrentStep(currentColumnIndex);
    });

    Tone.Transport.start();
};

const pauseAudio = () => {
    Tone.Transport.pause();
};

const playButton = document.querySelector('button.playbtn');
const pauseButton = document.querySelector('button.pausebtn');

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);