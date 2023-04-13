import { rows, columns, enabledSteps, boardElements } from './main';
import { delay } from './controls';

// prettier-ignore
const rowColors = ['#ff064a', '#fe7316', '#f4b915', '#0dc75a', '#1acbf7', '#8057f5', '#ff74b7', '#c6194e'];

const buildBoard = () => {
    const table = document.querySelector('main.board table');
    table.style.setProperty('--delay', delay + 's');
    table.style.setProperty('--columns', columns);

    // loop through rows
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const row = document.createElement('tr');
        row.classList.add('row');
        row.dataset.row = rowIndex + 1;

        const div = document.createElement('div');
        const img = document.createElement('img');
        if (rowIndex === 0) img.src = '/img/drum.svg';
        if (rowIndex === 1) img.src = '/img/bass.svg';
        if (rowIndex === 2) img.src = '/img/cymbal.svg';
        if (rowIndex === 3 || rowIndex === 4 || rowIndex === 5) {
            img.src = '/img/mic.svg';
        }
        img.alt = 'instrument corresponding to sound of row';
        div.appendChild(img);
        row.appendChild(div);

        table.appendChild(row);

        row.style.setProperty('--active-row-color', rowColors[rowIndex]);

        // within each row, loop through columns
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            const cell = document.createElement('td');
            const button = document.createElement('button');

            cell.dataset.col = colIndex + 1;
            cell.dataset.row = rowIndex + 1;

            // on click, toggle the value of the corresponding step in the enabledSteps array
            button.addEventListener('click', () => {
                enabledSteps[rowIndex][colIndex] =
                    !enabledSteps[rowIndex][colIndex];

                button.classList.toggle('active');
            });

            // add each button to the boardElements array
            if (!boardElements[colIndex]) {
                boardElements[colIndex] = [];
            }
            boardElements[colIndex].push(button);

            cell.appendChild(button);
            row.appendChild(cell);
        }
    }
};

// loop through all the steps and highlight the column that corresponds to the current step
const highlightCurrentStep = (currentStep = 0) => {
    boardElements.forEach((column, i) => {
        column.forEach((button) => {
            button.classList.toggle('highlight', i == currentStep);
        });
    });
};

export { buildBoard, highlightCurrentStep };
