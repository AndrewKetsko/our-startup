const express = require("express");
const { ingress } = require("./ngroksetup");
const app = express();
require("dotenv").config();

app.use(express.json());

app.all("/", (req, res) => {
  res.json({ message: "test" });
});

app.post("/webhooks", ({ body, headers }, res) => {
  // let { body, headers } = req;
  
  console.log("-------------- New Request POST --------------");
  console.log("Headers:" + JSON.stringify(headers, null, 3));
  console.log("Body:" + JSON.stringify(body, null, 3));
  if (body.object === "page") {
    console.log("Responding with 200");
    res.status(200).json({ message: "Thank you for the message" });
  } else {
    console.log("Responding with 404");
    res.sendStatus(404);
  }
});

app.get("/webhooks", ({ body, headers }, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  // let { body, headers } = req;

  console.log("-------------- New Request GET --------------");
  console.log("Headers:" + JSON.stringify(headers, null, 3));
  console.log("Body:" + JSON.stringify(body, null, 3));

  if (mode && token) {
    if (mode === "subscribe" && token === "12345") {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      console.log("Responding with 403 Forbidden");
      res.sendStatus(403);
    }
  } else {
    console.log("Replying Thank you.");
    res.json({ message: "Thank you for the message" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
  ingress();
});
