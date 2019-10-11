import jsonData from "../data/main.json";

export default function UnoIdValidator(urlHash: Array<string>) {      // Returns a urlhash with only valid unoids
    let urlCopy = urlHash.slice();
    for (let i = 0; i < urlCopy.length; i++) {                // Checking every entry to be a valid uno_id
        if (!jsonData.hasOwnProperty(urlCopy[i].toString())) {
            urlCopy.splice(i, 1);
            i--;
            if (i < 0)
                i = 0;
        }
    }
    return urlCopy;
}