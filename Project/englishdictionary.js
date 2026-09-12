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

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Word not found");
        }

        const result = await response.json();

        infoTextEl.style.display = "none";
        meaningContainerEl.style.display = "block";

        titleEl.innerText = result[0].word;

        meaningEl.innerText =
            result[0].meanings[0].definitions[0].definition;

        // Find an available pronunciation audio
        let audioUrl = null;

        for (const phonetic of result[0].phonetics || []) {
            if (phonetic.audio) {
                audioUrl = phonetic.audio;
                break;
            }
        }

        if (audioUrl) {
            audioEl.src = audioUrl;
            audioEl.style.display = "inline-flex";
        } else {
            audioEl.removeAttribute("src");
            audioEl.style.display = "none";
        }

    } catch (error) {
        console.error(error);

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
