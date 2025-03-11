import express from "express"
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "11131113";

console.log("aa");


// Verification Endpoint
app.get("/webhook", (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.status(403).send("Forbidden");
  }
});

app.post("/webhook", (req, res) => {
  console.log("Webhook event received:", req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
