const fs = require("fs");
const path = require("path");

const asset_manifest = JSON.parse(
  fs.readFileSync("./build/asset-manifest.json", { encoding: "utf8" })
);
const startupScript = fs.readFileSync(
  path.join("./build", asset_manifest["runtime~main.js"])
);

const scripts = Object.keys(asset_manifest)
  .filter(key => key === "main.js" || key.endsWith(".chunk.js"))
  .map(key => asset_manifest[key]);

const styles = Object.keys(asset_manifest)
  .filter(key => key === "main.css" || key.endsWith(".chunk.css"))
  .map(key => asset_manifest[key]);

fs.writeFileSync(
  "./build/widget.js",
  `${startupScript}

(function(){
    // Include required scripts for the widget
    ${scripts
      .map(
        (script, i) => `var script${i} = document.createElement('script');
    script${i}.src = "${script}";
    document.body.append(script${i});
`
      )
      .join("\n    ")}
    // Include styles
    ${styles
      .map(
        (style, i) => `var style${i} = document.createElement('link');
    style${i}.rel = "stylesheet";
    style${i}.href = "${style}";
    document.head.appendChild(style${i});
`
      )
      .join("\n    ")}
})()
`
);
