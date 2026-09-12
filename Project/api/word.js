export default async function handler(req, res) {
    const { word } = req.query;

    if (!word) {
        return res.status(400).json({
            error: "Please provide a word."
        });
    }

    try {
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({
            error: "Unable to fetch dictionary data."
        });
    }
}
