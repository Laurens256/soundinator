import anime from 'animejs/lib/anime.es.js';

const $note = document.getElementById('note');

export async function animator() {
    const response = await fetch(
        'https://api-hitloop.responsible-it.nl/test_json?seed=120'
    );
    const data = await response.json();

    const track = data.tracks[0];
    const notes = track.notes;

    const timeline = anime.timeline({
        easing: 'easeInSine',
    });

    for (const note of notes) {
        const name = note.name.replace('#', '');
        const character = name.charAt(0);
        const number = name.charAt(1);

        const characters = ['A', 'B', 'C', 'D', 'E', 'F'];

        const column = characters.findIndex((char) => char === character);
        const row = number - 1;

        timeline.add({
            targets: '.grid .cell',
            scale: [
                {
                    value: 0.1,
                    easing: 'easeOutSine',
                    duration: 500 * note.duration,
                },
                {
                    value: 1,
                    easing: 'easeInOutQuad',
                    duration: 1200 * note.duration,
                },
            ],
            // 0 = top left, 11 = top right
            delay: anime.stagger(200, {
                grid: [12, 6],
                from: column * 12 + row,
            }),
            changeBegin: function (anim) {
                $note.textContent = note.name;
                // play sound here
            },
        });
    }
}
