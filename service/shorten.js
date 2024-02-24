const Url = require('../model/url')
const { generateUid } = require('../util')

const shortnerEngine = async (originalUrl) => {

    // Check if the URL already exists in the database
    const existingUrl = await Url.findOne({ originalUrl });

    let shorturl;

    if (existingUrl) {
        shorturl = existingUrl.shortUid;
    } else {
        // Generate a unique 5-letter UID
        let shortUid;
        do {
            shortUid = generateUid();
        } while (await Url.findOne({ shortUid }));

        // Save the URL to the database
        const urlEntry = new Url({ originalUrl, shortUid });
        await urlEntry.save();

        shorturl = shortUid;
    }

    return shorturl
}

module.exports = shortnerEngine