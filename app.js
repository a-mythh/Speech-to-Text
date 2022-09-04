const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
const mic = document.getElementById("mic");

// just for fun
const greetings = [
    "I'm good you little piece of love",
    "Doing good boy",
    "Leave me alone",
];

const weather = ["It looks good", "Please take a bath before going out"];

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.addEventListener("audiostart", () => {
    mic.style.filter = "invert(1)";
});

recognition.addEventListener("audioend", () => {
    mic.style.filter = "invert(0)";
});

// When we start talking
recognition.onstart = function () {
    console.log("Voice is activated, you can speak to microphone");
};

// When we stop talking and the result gets executed
recognition.onresult = function (event) {
    // console.log(event);
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
};

// add listener to the button
btn.addEventListener("click", () => {
    recognition.start();
});

function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "I can't understand what you said";

    if (message.includes("how are you")) {
        const finalText =
            greetings[Math.floor(Math.random() * greetings.length)];
        speech.text = finalText;
    } else if (
        message.includes("how is the weather today") ||
        message.includes("how is today")
    ) {
        const finalText = weather[Math.floor(Math.random() * weather.length)];
        speech.text = finalText;
    } else {
        const finalText = "You said " + message;
        speech.text = finalText;
    }

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);
}
