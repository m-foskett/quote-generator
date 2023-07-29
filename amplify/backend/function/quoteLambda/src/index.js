/* Amplify Params - DO NOT EDIT
	API_QUOTEGENERATOR_GRAPHQLAPIIDOUTPUT
	API_QUOTEGENERATOR_QUOTEAPPTESTTABLE_ARN
	API_QUOTEGENERATOR_QUOTEAPPTESTTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// AWS packages
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
// Image Generation packages
const sharp = require("sharp");
const fetch = require("node-fetch");
const path = require("path");
const fs = require("fs");
// Function: Update DynamoDB table
async function updateQuoteDynamoDBObject(){
    const quoteTableName = process.env.API_QUOTEGENERATOR_QUOTEAPPTESTTABLE_NAME;
    const quoteObjectId = '1241241-12312312-3213213-12312312';

    try {
        var quoteParams = {
            TableName: quoteTableName,
            Key: {
                "id": quoteObjectId,
            },
            UpdateExpression: "SET #quotesGenerated = #quotesGenerated + :inc",
            ExpressionAttributeValues: {
                ":inc": 1,
            },
            ExpressionAttributeNames: {
                "#quotesGenerated": "quotesGenerated",
            },
            ReturnValues: "UPDATED_NEW"
        };

        const updateQuoteObject = await docClient.update(quoteParams).promise();
        return updateQuoteObject;
    } catch (error) {
        console.log('error updating quote object in DynamoDB', error)
    }
}


exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const apiURL = "https://zenquotes.io/api/random";

    // Function: Generate Quote Card
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
            <circle cx="382" cy="76" r="44" fill="rgba(255, 255, 255, 0.155)"/>
            <text x="382" y="76" dy="50" text-anchor="middle" font-size="90" font-family="Verdana" fill="white">"</text>
            <g>
              <rect x="0" y="0" width="${width}" height="auto"></rect>
              <text id="lastLineOfQuote" x= "375" y="120" font-family="Verdana" font-size="35" fill="white" text-anchor="middle">
                ${tspanElements}
                <tspan class="quoteAuthorStyles" x="375" dy="1.8em">- ${quoteAuthor}</tspan>
              </text>
            </g>
            <text x="${width / 2}" y="${
          height - 10
        }" class="footerStyles">Developed by Mark Foskett</text>
          </svg>
        `;

        // Add background images for the QuoteCard
        const backgroundImages = [
          "backgrounds/Love-and-Liberty.jpg",
          "backgrounds/Dark-Knight.jpg",
          "backgrounds/Purple-Bliss.jpg",
          "backgrounds/Visions-of-Grandeur.jpg",
        ];
        // Get a random background image
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const selectedBackgroundImage = backgroundImages[randomIndex];
        // Composite the QuoteCard together
        const timestamp = new Date().toLocaleString().replace(/[^\d]/g, "");
        const svgBuffer = Buffer.from(svgImage);
        // Create image path for QuoteCard
        const imagePath = path.join('/tmp', 'quote-card.png');
        // Image Composite
        const image = await sharp(selectedBackgroundImage)
        .composite([
        {
            input: svgBuffer,
            top: 0,
            left: 0,
        },
        ])
        .toFile(imagePath);
        // Function: Update DynamoDB Object in table
        try {
            updateQuoteDynamoDBObject();
        } catch (error) {
            console.log('error updating quote object in DynamoDB', error);
        }
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "image/png",
                "Access-Control-Allow-Origin": "*",
            },
            body: fs.readFileSync(imagePath).toString('base64'),
            isBase64Encoded: true,
        };
    }
    return await getRandomQuote(apiURL);
};
