import admin from "firebase-admin";
import express from "express";

import { TPlayer } from "../types";

const firestore = admin.firestore();
const playersRef = firestore.collection("players");

module.exports = (app: express.Application) =>
  app.get("/getPlayers", (req: express.Request, res: express.Response) => {
    let players: Array<TPlayer> = [];

    playersRef
      .orderBy("score", "desc")
      .get()
      .then((snapshot: any) => {
        snapshot.forEach((doc: any) => players.push(doc.data()));
        res.send(players);
      })
      .catch((err: any) => console.error(`Error getting document: ${err}`));
  });
