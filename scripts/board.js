import { rows, columns, enabledSteps, columnElements } from './main';

const buildBoard = () => {
    const table = document.querySelector('main.board table');

    // loop through rows
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        const row = document.createElement('tr');
        row.classList.add('row');
        row.dataset.row = rowIndex + 1;
        table.appendChild(row);

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

            // add each button to the columnElements array
            if (!columnElements[colIndex]) {
                columnElements[colIndex] = [];
            }
            columnElements[colIndex].push(button);

            cell.appendChild(button);
            row.appendChild(cell);
        }
    }
};

// loop through all the steps and highlight the column that corresponds to the current step
const highlightCurrentStep = (currentStep = 0) => {
    columnElements.forEach((column, i) => {
        column.forEach((button) => {
            button.classList.toggle('highlight', i == currentStep);
        });
    });
};

export { buildBoard, highlightCurrentStep };
