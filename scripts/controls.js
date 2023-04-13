import * as Tone from 'tone';
import { sampler, columns, columnElements, enabledSteps } from './main';
import { highlightCurrentStep } from './board';

// keep track of the current step
let currentStep = 0;
let delay = 0.25;

const board = document.querySelector('main.board table');

const playAudio = async () => {
    board.classList.add('playing');
    await Tone.start();

    Tone.Transport.scheduleRepeat((time) => {
        currentStep = (currentStep % columns) + 1;

        const currentColumnIndex = currentStep - 1;
        const currentColumn = columnElements[currentColumnIndex];

        // loop through the buttons in the current column
        for (const [row, button] of currentColumn.entries()) {
            // if the step is not enabled, skip it
            if (!enabledSteps[row][currentColumnIndex]) continue;

            sampler.triggerAttackRelease('A1', '8n', time);
        }
        highlightCurrentStep(currentColumnIndex);
    }, delay);

    Tone.Transport.start();
};

const pauseAudio = () => {
    Tone.Transport.cancel();
    board.classList.remove('playing');
};

const toggleAudioButton = () => {
    if (board.classList.contains('playing')) {
        togglePlayButton.classList.remove('playing');
        pauseAudio();
    } else {
        togglePlayButton.classList.add('playing');
        playAudio();
    }
};

const togglePlayButton = document.querySelector('button.togglePlayButton');
togglePlayButton.addEventListener('click', toggleAudioButton);
document.addEventListener('keydown', (e) => {
    if (e.key == 'Space' || e.code === 'Space') {
        toggleAudioButton();
    }
});

export { delay };
