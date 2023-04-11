import * as Tone from 'tone';

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

// finds first button then adds event listener to it
document.querySelector('button')?.addEventListener('click', async () => {
    await Tone.start();
    fetchTunes();
    console.log('audio is ready');
});

const fetchTunes = () => {
    try {
        // fetch audio
        fetch('https://api-hitloop.responsible-it.nl/test_json?seed=120')
            .then((response) => response.json())
            .then((data) => {
                // create a new Tone.ToneAudioBuffer instance and load the audio file
                const buffer = new Tone.ToneAudioBuffer(data, () => {
                    console.log('Audio file is loaded.');
                });
                console.log(data);

                synth.triggerAttack(data.tracks[1].notes);
            });
    } catch (err) {
        console.error(err);
    }
};

export * from 'tone';
