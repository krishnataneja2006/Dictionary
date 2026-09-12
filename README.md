# English Dictionary

A simple and responsive web-based English Dictionary that allows users to search for English words and instantly view their meanings and pronunciation.

## Features

- 🔎 Search for English words
- 📖 Display word definitions
- 🔊 Provide audio pronunciation when available
- ⚡ Fetch dictionary data dynamically using an API
- 💻 Simple and responsive user interface
- ❌ Handle words that are not found in the dictionary

## Technologies Used

- **HTML5** – Structure of the web page
- **CSS3** – Styling and user interface
- **JavaScript** – Search functionality, API requests, and dynamic content
- **Dictionary API** – Provides word definitions and pronunciation data

## How It Works

1. Enter an English word in the search box.
2. Press **Enter**.
3. JavaScript sends a request to the Dictionary API.
4. The API returns the word information.
5. The application displays the word, meaning, and pronunciation.

## API Used

This project uses the free **Dictionary API** to retrieve word definitions and pronunciation data.

API Endpoint:

`https://api.dictionaryapi.dev/api/v2/entries/en/<word>`

## Project Structure

```text
Dictionary/
│
├── README.md
│
└── Project/
    ├── index.html
    ├── englishdictionary.css
    ├── englishdictionary.js
    └── Dictionary.jpg
