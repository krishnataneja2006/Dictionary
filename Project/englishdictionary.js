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

async function fetchAPI(word) {
    try {
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching the meaning of "${word}"`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const result = await response.json();

        titleEl.innerText = result[0].word;

        const definition =
            result[0].meanings?.[0]?.definitions?.[0]?.definition;

        meaningEl.innerText =
            definition || "Meaning not available.";

        // Find the first phonetic entry that contains an audio URL
        const phonetics = result[0].phonetics || [];

        const audioData = phonetics.find(
            (phonetic) => phonetic.audio && phonetic.audio.trim() !== ""
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

    } catch (error) {
        console.error("Dictionary API Error:", error);

        meaningContainerEl.style.display = "none";
        infoTextEl.style.display = "block";
        infoTextEl.innerText =
            "Word not found or an error occurred. Please try again.";
    }
}

inputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
        fetchAPI(e.target.value.trim());
    }
});
