import { Mono, MonoSynth } from 'tone';
const synt = new MonoSynth();

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

                // create a new Tone.Player instance and connect it to the master output
                const player = new Tone.Player(buffer).toDestination();

                // start the player
                player.start;
            });
    } catch (err) {
        console.error(err);
    }
};

export * from 'tone';
