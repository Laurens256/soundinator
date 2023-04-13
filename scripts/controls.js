import * as Tone from 'tone';
import { columns, boardElements, enabledSteps } from './main';
import { highlightCurrentStep } from './board';
import { players } from './main';

// keep track of the current step
let currentStep = 0;
let delay = 0.25;

const board = document.querySelector('main.board table');

const playAudio = async () => {
    await Tone.start();
    board.classList.add('playing');

    Tone.Transport.scheduleRepeat((time) => {
        currentStep = (currentStep % columns) + 1;

        const currentColumnIndex = currentStep - 1;
        const currentColumn = boardElements[currentColumnIndex];

        // loop through the buttons in the current column
        for (const [row, button] of currentColumn.entries()) {
            // if the step is not enabled, skip it
            if (enabledSteps[row][currentColumnIndex]) {
                players[row].start();
            }
        }
        highlightCurrentStep(currentColumnIndex);
    }, delay);

    Tone.Transport.start();
};

const pauseAudio = () => {
    Tone.Transport.cancel();
    board.classList.remove('playing');
};

const playButton = document.querySelector('button.playbtn');
const pauseButton = document.querySelector('button.pausebtn');

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);

export { delay };
