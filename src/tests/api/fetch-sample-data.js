const fs = require("fs");
const https = require("https");
const path = require("path");

/**
 * Simple file that fetches from the api
 * and updates the src/test/data folder with
 * JSON files
 */

const apis = [
  { name: "main" },
  { name: "lonn" },
  { name: "arbeidsledighet" },
  { name: "entrepenorskap" },
  { name: "suggest", query: "?q=ing" },
];

apis.forEach(({ name, query }) => {
  https.get(
    "https://sammenlign.utdanning.no/rest/" + name + (query || ""),
    resp => {
      let data = "";
      resp.on("data", chunk => (data += chunk));
      resp.on("end", () => {
        const final_data = JSON.stringify(JSON.parse(data), null, 2);
        fs.writeFileSync(
          path.join(__dirname, "data", name + ".json"),
          final_data
        );
      });
    }
  );
});
