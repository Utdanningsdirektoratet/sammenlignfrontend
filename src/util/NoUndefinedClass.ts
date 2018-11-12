if (process.env.NODE_ENV !== "production") {
  // Dislpay a huge pink box at the top of the page if any className="undefined"
  // exists in the code
  // This will usually result from using a wrongly spelled css module
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `
    .undefined:before { 
        display: block;
        position: absolute;
        left: 10vw;
        top: 10vh;
        content: 'class=".undefined"';
        background-color: pink;
        color: red;
        font-size: 20px;
    }
    `;
  document.getElementsByTagName("head")[0].appendChild(style);
}
