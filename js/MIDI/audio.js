let audioContext;
const oscillators = {};
const gainNodes = {};
let masterGainNode;
const maxNotes = 8;

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', () => {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContext.resume().then(() => {
                if (audioContext.state === 'running') {
                    startButton.disabled = true;
                    initializeMIDI();
                    setupMasterGain();
                } else {
                    console.error("AudioContext is not running. Current state:", audioContext.state);
                }
            }).catch(err => {
                console.error("Failed to resume AudioContext:", err);
            });
        });
    } else {
        console.error("startButton element not found in the DOM.");
    }
});

function setupMasterGain() {
    masterGainNode = audioContext.createGain();
    masterGainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    masterGainNode.connect(audioContext.destination);
    console.log("Master gain node set up and connected.");
}

function initializeMIDI() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDIReady, onMIDIFailure).catch(err => {
            console.error("Error requesting MIDI access:", err);
        });
    } else {
        alert("Web MIDI API not supported in this browser.");
    }
}

function onMIDIReady(midiAccess) {
    console.log("MIDI Access granted:", midiAccess);
    const inputs = midiAccess.inputs;
    inputs.forEach(input => {
        console.log("MIDI Input detected:", input.name);
        input.onmidimessage = handleMIDIMessage;
    });
}

function onMIDIFailure() {
    alert("Failed to access MIDI devices.");
}

function handleMIDIMessage(event) {
    const [status, note, velocity] = event.data;
    if (status === 147 && velocity > 0) {
        playSineWave(note);
    } else if (status === 131 || (status === 147 && velocity === 0)) {
        stopSineWave(note);
    }
}

// 144 and 128
// 147 and 131

function playSineWave(note) {
    const frequency = 440 * Math.pow(2, (note - 69) / 12);

    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(1 / maxNotes, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(masterGainNode);
    oscillator.start();

    oscillators[note] = oscillator;
    gainNodes[note] = gainNode;

    oscillator.onended = () => {
        delete oscillators[note];
        delete gainNodes[note];
    };
}

function stopSineWave(note) {
    const oscillator = oscillators[note];
    const gainNode = gainNodes[note];
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        if (gainNode) {
            gainNode.disconnect();
        }
        delete oscillators[note];
    }
}