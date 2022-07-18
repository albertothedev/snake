import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import "dotenv/config";

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.SNAKE_FIREBASE_PROJECT_ID,
    clientEmail: process.env.SNAKE_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.SNAKE_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  }),
  databaseURL: process.env.SNAKE_FIREBASE_DATABASE_URL,
});

const app: express.Application = express();

app.use(cors());
app.use(express.json());

require("./routes/addPlayer")(app);
require("./routes/getPlayers")(app);

app.listen(process.env.SNAKE_PORT || 5001, () =>
  console.log(`Listening on PORT ${process.env.SNAKE_PORT || 5001}`)
);
