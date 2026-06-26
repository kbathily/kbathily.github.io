const statusEl = document.getElementById("status");

const enInput = document.getElementById("en-input");
const frInput = document.getElementById("fr-input");
const enOutput = document.getElementById("en-output");
const frOutput = document.getElementById("fr-output");

const enListenBtn = document.getElementById("en-listen");
const frListenBtn = document.getElementById("fr-listen");
const enTranslateBtn = document.getElementById("en-translate");
const frTranslateBtn = document.getElementById("fr-translate");
const frSpeakBtn = document.getElementById("fr-speak");
const enSpeakBtn = document.getElementById("en-speak");
const enClearBtn = document.getElementById("en-clear");
const frClearBtn = document.getElementById("fr-clear");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function setStatus(message) {
    statusEl.textContent = message;
}

async function translateText(text, sourceLang, targetLang) {
    const safeText = text.trim();
    if (!safeText) {
        return "";
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(safeText)}&langpair=${sourceLang}|${targetLang}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Translation service is unavailable right now.");
    }

    const data = await response.json();
    if (!data.responseData || !data.responseData.translatedText) {
        throw new Error("No translation returned.");
    }

    return data.responseData.translatedText;
}

function createRecognizer(lang, onResult) {
    if (!SpeechRecognition) {
        return null;
    }

    const recognizer = new SpeechRecognition();
    recognizer.lang = lang;
    recognizer.interimResults = false;
    recognizer.continuous = false;

    recognizer.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
    };

    recognizer.onerror = (event) => {
        setStatus(`Speech recognition error: ${event.error}`);
    };

    return recognizer;
}

function speakText(text, lang) {
    const safeText = text.trim();
    if (!safeText) {
        setStatus("Nothing to read aloud yet.");
        return;
    }

    if (!window.speechSynthesis) {
        setStatus("Speech playback is not supported in this browser.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(safeText);
    utterance.lang = lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setStatus(`Reading translation aloud (${lang}).`);
}

async function runTranslation(inputEl, outputEl, sourceLang, targetLang) {
    const text = inputEl.value.trim();
    if (!text) {
        setStatus("Please type or speak a sentence first.");
        return;
    }

    try {
        setStatus("Translating...");
        const translated = await translateText(text, sourceLang, targetLang);
        outputEl.value = translated;
        setStatus("Translation complete.");
    } catch (error) {
        setStatus(error.message);
    }
}

const enRecognizer = createRecognizer("en-US", (text) => {
    enInput.value = text;
    setStatus("Captured English speech. Ready to translate.");
});

const frRecognizer = createRecognizer("fr-FR", (text) => {
    frInput.value = text;
    setStatus("Captured French speech. Ready to translate.");
});

enListenBtn.addEventListener("click", () => {
    if (!enRecognizer) {
        setStatus("Speech recognition is not supported in this browser.");
        return;
    }

    setStatus("Listening for English...");
    enRecognizer.start();
});

frListenBtn.addEventListener("click", () => {
    if (!frRecognizer) {
        setStatus("Speech recognition is not supported in this browser.");
        return;
    }

    setStatus("Listening for French...");
    frRecognizer.start();
});

enTranslateBtn.addEventListener("click", () => {
    runTranslation(enInput, frOutput, "en", "fr");
});

frTranslateBtn.addEventListener("click", () => {
    runTranslation(frInput, enOutput, "fr", "en");
});

frSpeakBtn.addEventListener("click", () => {
    speakText(frOutput.value, "fr-FR");
});

enSpeakBtn.addEventListener("click", () => {
    speakText(enOutput.value, "en-US");
});

enClearBtn.addEventListener("click", () => {
    enInput.value = "";
    frOutput.value = "";
    setStatus("English to French panel cleared.");
});

frClearBtn.addEventListener("click", () => {
    frInput.value = "";
    enOutput.value = "";
    setStatus("French to English panel cleared.");
});
