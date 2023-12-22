Endpoint
POST https://api.chatpdf.com/v1/sources/add-url
Request
{ "url": "https://uscode.house.gov/static/constitution.pdf" }
Response
{ "sourceId": "src_xxxxxx" }

const axios = require("axios");

const config = {
  headers: {
    "x-api-key": "sec_xxxxxx",
    "Content-Type": "application/json",
  },
};

const data = {
  url: "https://uscode.house.gov/static/constitution.pdf",
};

axios
  .post("https://api.chatpdf.com/v1/sources/add-url", data, config)
  .then((response) => {
    console.log("Source ID:", response.data.sourceId);
  })
  .catch((error) => {
    console.log("Error:", error.message);
    console.log("Response:", error.response.data);
  });