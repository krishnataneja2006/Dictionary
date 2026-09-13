// const inputEl = document.getElementById("input");
// const infoTextEl = document.getElementById("info-text");
// const meaningContainerEl = document.getElementById("meaning-container");
// const titleEl = document.getElementById("title");
// const meaningEl = document.getElementById("meaning");
// const audioEl = document.getElementById("audio");

// async function fetchAPI(word) {
//     try {
//         infoTextEl.style.display = "block";
//         meaningContainerEl.style.display = "none";
//         infoTextEl.innerText = `Searching the meaning of "${word}"`;

//         const response = await fetch(
//             `/api/word?word=${encodeURIComponent(word)}`
//         );

//         const result = await response.json();

//         if (!response.ok) {
//             throw new Error(result.message || "Word not found");
//         }

//         titleEl.innerText = result[0].word;

//         const definition =
//             result[0].meanings?.[0]?.definitions?.[0]?.definition;

//         meaningEl.innerText =
//             definition || "Meaning not available.";

//         const phonetics = result[0].phonetics || [];

//         const audio = phonetics.find(
//             (phonetic) => phonetic.audio
//         );

//         if (audio) {
//             audioEl.src = audio.audio;
//             audioEl.style.display = "inline-flex";
//         } else {
//             audioEl.removeAttribute("src");
//             audioEl.style.display = "none";
//         }

//         infoTextEl.style.display = "none";
//         meaningContainerEl.style.display = "block";

//     } catch (error) {
//         console.error("Dictionary error:", error);

//         meaningContainerEl.style.display = "none";
//         infoTextEl.style.display = "block";
//         infoTextEl.innerText =
//             "Word not found or an error occurred. Please try again.";
//     }
// }

// inputEl.addEventListener("keyup", (e) => {
//     if (e.key === "Enter" && e.target.value.trim()) {
//         fetchAPI(e.target.value.trim());
//     }
// });

const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

// Cache searched words
const cache = {};

async function fetchAPI(word) {
    word = word.trim().toLowerCase();

    if (!word) return;

    // Show loading
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching "${word}"...`;

    try {
        // Use cached result if available
        if (cache[word]) {
            displayResult(cache[word]);
            return;
        }

        const response = await fetch(
            `/api/word?word=${encodeURIComponent(word)}`
        );

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const result = await response.json();

        // Save result in cache
        cache[word] = result;

        displayResult(result);

    } catch (error) {
        console.error(error);

        meaningContainerEl.style.display = "none";
        infoTextEl.style.display = "block";
        infoTextEl.innerText =
            "Word not found or an error occurred. Please try again.";
    }
}

function displayResult(result) {
    const wordData = result[0];

    titleEl.innerText = wordData.word;

    const definition =
        wordData.meanings?.[0]?.definitions?.[0]?.definition;

    meaningEl.innerText = definition || "Meaning not available.";

    // Find available audio
    const audioData = (wordData.phonetics || []).find(
        phonetic => phonetic.audio && phonetic.audio.trim() !== ""
    );

    if (audioData) {
        audioEl.src = audioData.audio;
        audioEl.style.display = "inline-flex";
    } else {
        audioEl.removeAttribute("src");
        audioEl.style.display = "none";
    }

    infoTextEl.style.display = "none";
    meaningContainerEl.style.display = "block";
}

inputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        fetchAPI(e.target.value);
    }
});
