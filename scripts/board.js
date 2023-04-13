import { rows, columns, enabledSteps, boardElements } from './main';
import { delay } from './controls';

// prettier-ignore
const rowColors = ['#ff064a', '#fe7316', '#f4b915', '#0DC75A', '#1ACBF7', '#8057F5', '#FF74B7', '#C6194E'];

const buildBoard = () => {
    const table = document.querySelector('main.board table');
	table.style.setProperty('--delay', delay + 's');
	table.style.setProperty('--columns', columns);

    // loop through rows
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const row = document.createElement('tr');
        row.classList.add('row');
        row.dataset.row = rowIndex + 1;
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
