// const inputEl = document.getElementById("input");
// const infoTextEl = document.getElementById("info-text");
// const meaningContainerEl = document.getElementById("meaning-container");
// const titleEl = document.getElementById("title");
// const meaningEl = document.getElementById("meaning");
// const audioEl = document.getElementById("audio");

// async function fetchAPI(word) {
//   try {
//     infoTextEl.style.display = "block";
//     meaningContainerEl.style.display = "none";
//     infoTextEl.innerText = `Searching the meaning of "${word}"`;
//     const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
//     const result = await fetch(url).then((res) => res.json());

//     if (result.title) {
//       meaningContainerEl.style.display = "block";
//       infoTextEl.style.display = "none";
//       titleEl.innerText = word;
//       meaningEl.innerText = "N/A";
//       audioEl.style.display = "none";
//     } else {
//       infoTextEl.style.display = "none";
//       meaningContainerEl.style.display = "block";
//       audioEl.style.display = "inline-flex";
//       titleEl.innerText = result[0].word;
//       meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
//       audioEl.src = result[0].phonetics[0].audio;
//     }
//   } catch (error) {
//     console.log(error);
//     infoTextEl.innerText = `an error happened, try again later`;
//   }
// }

// inputEl.addEventListener("keyup", (e) => {
//   if (e.target.value && e.key === "Enter") {
//     fetchAPI(e.target.value);
//   }
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

        const response = await fetch(
            `/api/word?word=${encodeURIComponent(word)}`
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Word not found");
        }

        titleEl.innerText = result[0].word;

        const definition =
            result[0].meanings?.[0]?.definitions?.[0]?.definition;

        meaningEl.innerText =
            definition || "Meaning not available.";

        const phonetics = result[0].phonetics || [];

        const audio = phonetics.find(
            (phonetic) => phonetic.audio
        );

        if (audio) {
            audioEl.src = audio.audio;
            audioEl.style.display = "inline-flex";
        } else {
            audioEl.removeAttribute("src");
            audioEl.style.display = "none";
        }

        infoTextEl.style.display = "none";
        meaningContainerEl.style.display = "block";

    } catch (error) {
        console.error("Dictionary error:", error);

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
