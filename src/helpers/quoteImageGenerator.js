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
}

getRandomQuote(apiURL);
