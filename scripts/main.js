import * as Tone from 'tone';
import { buildBoard } from './board';
import './controls';
import * as panel from './panel.js';

const baseFileUrl = '/audio/';
// const sfx = ['kick.wav', 'snare.wav', 'holy.wav', 'yeat_bell.wav', 'phonk_bell.wav'];
// prettier-ignore
const sfx = ['testaudio_bass1.mp3', 'testaudio_bass2.mp3', 'testaudio_clap1.mp3', 'testaudio_melody1.mp3', 'testaudio_melody2.mp3', 'testaudio_melody3.mp3'];

const players = sfx.map((file) => {
    const player = new Tone.Player({
        url: baseFileUrl + file,
    }).toDestination();

    return player;
});

// size for the board
const columns = 16;
const rows = players.length;

// will become a 2D array to keep track of which steps are enabled
let enabledSteps = [];

// will become a 2D array to keep track of all the buttons in the board
let boardElements = [];

const init = () => {
    enabledSteps = initSteps();
    buildBoard();
};

// returns a 2D array of false values with the dimensions of rows and columns
const initSteps = () => {
    return Array.from({ length: columns }, () => new Array(rows).fill(false));
};

export { rows, columns, enabledSteps, boardElements, players };

init();
