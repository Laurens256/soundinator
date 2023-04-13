import * as Tone from 'tone';
import { buildBoard } from './board';
import { animator } from './anime.js';
import './controls';

animator();

const urls = {
    A1: 'sample_3.wav',
};
const baseFileUrl = '/audio/';

const sampler = new Tone.Sampler({
    urls: urls,
    baseUrl: baseFileUrl,
}).toDestination();

// size for the board
const columns = 16;
const rows = 3;

// will become a 2D array to keep track of which steps are enabled
let enabledSteps = [];

// will become a 2D array to keep track of all the buttons in the board
let columnElements = [];

const init = () => {
    enabledSteps = initSteps();
    buildBoard();
};

// returns a 2D array of false values with the dimensions of rows and columns
const initSteps = () => {
    return Array.from({ length: columns }, () => new Array(rows).fill(false));
};

export { sampler, rows, columns, enabledSteps, columnElements };

init();
