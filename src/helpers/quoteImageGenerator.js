const sharp = require("sharp");
const apiURL = "https://zenquotes.io/api/random";
const fetch = require("node-fetch");

// Fetch a random quote

// Turn the text of the quote into lines

// Turn the text of the author into a line

// Add a quote image

// Convert all elements into a SVG

// Convert the SVG into an image as a png (/base64 in lambda)

async function getRandomQuote(apiURL) {
  let quoteText;
  let quoteAuthor;
  // Validate API response
  const response = await fetch(apiURL);
  var quoteData = await response.json();
  console.log(quoteData);

  quoteText = quoteData[0].q;
  quoteAuthor = quoteData[0].a;

  // Image Construction
  const width = 750;
  const height = 483;
  const text = quoteText;
  const words = text.split(" ");
  const lineBreak = 4;
  let newText = "";

  // Define some tspanElements with 4 words each
  let tspanElements = "";
  for (let i = 0; i < words.length; i++) {
    newText += words[i] + " ";
    if ((i + 1) % lineBreak === 0) {
      tspanElements += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
      newText = "";
    }
  }
  if (newText !== "") {
    tspanElements += `<tspan x="${width / 2}" dy="1.2em">${newText}</tspan>`;
  }
  console.log(tspanElements);

  // Construct the SVG
  const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
        .title {
          fill: #ffffff;
          font-size: 20px;
          font-weight: bold;
        }
        .quoteAuthorStyles {
          font-size: 35px;
          font-weight: bold;
          padding: 50px;
        }
        .footerStyles {
          font-size: 20px;
          font-weight: bold;
          fill: lightgrey;
          text-anchor: middle;
          font-family: Verdana;
        }
      </style>
      <circle cx="382" cy="76" r="44" fill="rgba(255, 255, 0.155)"/>
      <text x="382" y="76" dy="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white">"</text>
      <g>
        <rect x="0" y="0" width="${width}" height="auto"></rect>
        <text id="lastLineOfQuote" x= "375" y="120" font-family="Verdana" font-size="35" fill="white" text-anchor="middle">
          ${tspanElements}
          <tspan class="quoteAuthorStyles" x="375" dy="1.8em">- ${quoteAuthor}</tspan>
        </text>
      </g>
      <text x="${width / 2}" y="${height - 10}" class="footerStyles">Developed by Mark Foskett</text>
    </svg>
  `;
}

getRandomQuote(apiURL);
