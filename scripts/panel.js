import anime from 'animejs/lib/anime.es.js';
import * as Tone from 'tone';

window.isPlaying = false;

window.ripple = async function (index) {
    // if (true || !window.isPlaying) {
    if (!window.isPlaying) {
        window.isPlaying = true;

        await Tone.start();

        const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        const character = characters[Math.floor((index - 1) / 10)];
        const number = ((index - 1) % 10) + 1;

        const tone = `${character}${number}`;
        console.log('Playing', tone);

        const synth = new Tone.Synth().toDestination();
        // https://tonejs.github.io/docs/14.7.77/Synth.html#volume
        synth.volume.value = -6;
        const now = Tone.now();
        synth.triggerAttack(tone, '8n', now);

        anime({
            targets: '.grid .cell',
            scale: [
                { value: 0.1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1000 },
            ],
            delay: anime.stagger(200, { grid: [10, 7], from: index - 1 }),
            begin: function () {
                document.getElementById('tone').textContent = tone;
            },
            complete: function () {
                synth.triggerRelease();
                window.isPlaying = false;
                document.getElementById('tone').textContent = '';
            },
        });
    }
};

export * from './panel.js';
