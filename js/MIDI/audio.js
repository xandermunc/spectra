let audioContext;
const oscillators = {}; 
const gainNodes = {}; 
let masterGainNode; 
const maxNotes = 8; 

window.onload = () => {
    const button = document.getElementById('startButton');
    button.addEventListener('click', async () => {
        console.log("Button clicked");
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        await audioContext.resume();
        console.log("AudioContext resumed with state:", audioContext.state); 
        button.disabled = true;
        button.classList.add('clicked'); // Hide the button once clicked
        setupMasterGain();
        initializeMIDI();
    });    
};

document.body.addEventListener('click', () => {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => console.log('AudioContext resumed'));
    }
});


function setupMasterGain() {
    masterGainNode = audioContext.createGain();
    masterGainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    masterGainNode.connect(audioContext.destination);
}

function initializeMIDI() {
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(onMIDIReady, onMIDIFailure);
    } else {
        alert("Web MIDI API not supported in this browser.");
    }
}

function onMIDIReady(midiAccess) {
    const inputs = midiAccess.inputs;
    inputs.forEach(input => {
        input.onmidimessage = handleMIDIMessage;
    });
}

function onMIDIFailure() {
    alert("Failed to access MIDI devices.");
}

function handleMIDIMessage(event) {
    const [status, note, velocity] = event.data;
    const command = status & 0xf0; 
    const channel = status & 0x0f; 

    console.log(`MIDI message: command=${command}, channel=${channel}, note=${note}, velocity=${velocity}`);

    if (command === 0x90 && velocity > 0) {
        playSineWave(note);
    }

    else if (command === 0x80 || (command === 0x90 && velocity === 0)) {
        stopSineWave(note);
    }
}

// 144 and 128
// 147 and 131

function playSineWave(note) {
    const frequency = 440 * Math.pow(2, (note - 69) / 12); 
    console.log(`Playing note ${note} at freq ${frequency}`);

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