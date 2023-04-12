import * as Tone from 'tone';

const urls = {
    A1: 'sample_3.wav',
};
const baseFileUrl = '/assets/audio/test_samples/';

const sampler = new Tone.Sampler({
    urls: urls,
    baseUrl: baseFileUrl,
}).toDestination();

// size for the board
const columns = 12;
const rows = 3;

let currentStep = 0;
// will become a 2D array to keep track of which steps are enabled
let enabledSteps = [];

// will become a 2D array to keep track of all the buttons in the board
let columnElements = [];

const init = () => {
    enabledSteps = initSteps();
    buildBoard();
};

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
	Tone.Transport.stop();
};

// loop through all the steps and highlight the column that corresponds to the current step
const highlightCurrentStep = (currentStep = 0) => {
	columnElements.forEach((column, i) => {
		column.forEach((button) => {
			button.classList.toggle('highlight', i == currentStep);
		});
	});
};

let first = true;
const buildBoard = () => {
    const table = document.querySelector('main.board table');

    for (let i = 0; i < rows; i++) {
        const rowIndex = i;

        const row = document.createElement('tr');
        row.classList.add('row');
        row.dataset.row = rowIndex + 1;
        table.appendChild(row);

        for (let j = 0; j < columns; j++) {
            const colIndex = j;

            const cell = document.createElement('td');
            const button = document.createElement('button');

            cell.dataset.col = colIndex + 1;
            cell.dataset.row = rowIndex + 1;

            // on click, toggle the value of the corresponding step in the enabledSteps array
            button.addEventListener('click', () => {
                enabledSteps[rowIndex][colIndex] =
                    !enabledSteps[rowIndex][colIndex];
                button.classList.toggle(
                    'active',
                    enabledSteps[rowIndex][colIndex]
                );
            });

            // add the button to the columnElements array
            if (first) {
                if (!columnElements[colIndex]) {
                    columnElements[colIndex] = [];
                }
                columnElements[colIndex].push(button);
            }

            cell.appendChild(button);
            row.appendChild(cell);
        }
    }
    console.log(columnElements);
    console.log(enabledSteps);
    first = false;
};

// returns a 2D array of false values with the dimensions of rows and columns
const initSteps = () => {
    return Array.from({ length: columns }, () => new Array(rows).fill(false));
};

const playButton = document.querySelector('button.playbtn');
const pauseButton = document.querySelector('button.pausebtn');

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);

init();
