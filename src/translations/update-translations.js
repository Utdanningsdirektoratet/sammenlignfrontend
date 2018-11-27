const fs = require("fs");
const path = require("path");

const componentsDir = path.join(__dirname, "..", "components");
const getAllFiles = dir =>
  fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, []);
const componentFiles = getAllFiles(componentsDir);

const regexComp = /<Translate\s+nb="([^"]+)"/gm;
const regexString = /TranslateString\("([^"]+)"\)/gm;

const currentStrings = new Set();
componentFiles.forEach(file => {
  const content = fs.readFileSync(file).toString();
  let res;
  while ((res = regexComp.exec(content)) !== null) {
    currentStrings.add(res[1]);
  }
  while ((res = regexString.exec(content)) !== null) {
    currentStrings.add(res[1]);
  }
});

const translations = JSON.parse(
  fs.readFileSync(path.join(__dirname, "nn.json")).toString()
);
console.log(Object.keys(translations).length);
const oldStrings = new Set(Object.keys(translations));

// Remove old strings
const toRemove = Object.keys(translations).filter(t => !currentStrings.has(t));
const toAdd = [...currentStrings].filter(t => !oldStrings.has(t));

toAdd.forEach(t => {
  translations[t] = null;
});
toRemove.forEach(t => {
  delete translations[t];
});
fs.writeFileSync(
  path.join(__dirname, "nn.json"),
  JSON.stringify(translations, null, 2)
);
