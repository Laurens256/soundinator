import * as Tone from 'tone';

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

// finds first button then adds event listener to it
document.querySelector('button')?.addEventListener('click', async () => {
    await Tone.start();
    // fetched data
    const midi = await fetchTunes();
    // tracks from fetched data
    const [track] = midi.tracks;
    // speaker
    const synth = new Tone.Synth().toDestination();
    // time it should play the note (and next notes)
    let now = Tone.now();
    // for every note play it on xyz time, which should be the current time (now) after the note is done playing
    for (const note of track.notes) {
        synth.triggerAttackRelease(note.name, `${note.durationTicks}i`, now + note.duration);
        // for the next note, wait until the above (current) note is done playing
        now = now + note.duration;
    }
});

const fetchTunes = async () => {
    // fetch the api
    const response = await fetch('https://api-hitloop.responsible-it.nl/test_json?seed=120');
    const json = await response.json();
    console.log(json);
    return json;
};

export * from 'tone';
