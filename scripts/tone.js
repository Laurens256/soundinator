import * as Tone from 'tone';

const apiUrl = 'https://api-hitloop.responsible-it.nl/test_json?seed=120';

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();

const sampler = new Tone.Sampler({
    urls: {
        A1: 'A1.mp3',
        A2: 'A2.mp3',
    },
    baseUrl: 'https://tonejs.github.io/audio/casio/',
}).toDestination();

const playSound = () => {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }

    // sampler.triggerAttackRelease(['C1', 'E1', 'G1', 'B1'], 0.5);
    //play a middle 'C' for the duration of an 8th note
    // synth.triggerAttackRelease('C4', '8n');
	const audios = JSON.parse(test);

	audios.tracks[0].notes.forEach((note) => {
		sampler.triggerAttackRelease(note.name, note.duration);
	});

};

export { playSound };

const test = '{"header":{"keySignatures":[],"meta":[],"name":"placeholder","ppq":32,"tempos":[],"timeSignatures":[{"ticks":0,"timeSignature":[4,4],"measures":0}]},"tracks":[{"channel":10,"controlChanges":{},"pitchBends":[],"instrument":{"family":"drums","number":0,"name":"standardkit"},"name":"drums_output","notes":[{"duration":1.0,"durationTicks":64,"midi":6,"name":"G-1","ticks":0,"time":0.0,"velocity":0.9558521539860542},{"duration":1.0,"durationTicks":64,"midi":7,"name":"G#-1","ticks":0,"time":0.0,"velocity":25381933095.012356},{"duration":1.0,"durationTicks":64,"midi":13,"name":"D0","ticks":0,"time":0.0,"velocity":596181.1272052313},{"duration":0.296875,"durationTicks":19,"midi":35,"name":"C2","ticks":0,"time":0.0,"velocity":1.0},{"duration":1.0,"durationTicks":64,"midi":6,"name":"G-1","ticks":1,"time":0.015625,"velocity":4174.657231824211},{"duration":1.0,"durationTicks":64,"midi":7,"name":"G#-1","ticks":1,"time":0.015625,"velocity":225058720.75449556},{"duration":1.0,"durationTicks":64,"midi":13,"name":"D0","ticks":1,"time":0.015625,"velocity":165832.28125310584},{"duration":1.0,"durationTicks":64,"midi":2,"name":"D#-1","ticks":2,"time":0.03125,"velocity":3350352.5095688626},{"duration":1.0,"durationTicks":64,"midi":7,"name":"G#-1","ticks":2,"time":0.03125,"velocity":115930054826.28214},{"duration":1.0,"durationTicks":64,"midi":13,"name":"D0","ticks":2,"time":0.03125,"velocity":3910009.5126941614},{"duration":1.0,"durationTicks":64,"midi":7,"name":"G#-1","ticks":3,"time":0.046875,"velocity":72239504.40454552}],"endOfTrackTicks":128}]}';