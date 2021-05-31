import admin from "firebase-admin";
import express from "express";

const firestore = admin.firestore();

module.exports = (app: express.Application) =>
  app.post("/addPlayer", (req: express.Request, res: express.Response) => {
    firestore.collection("players").doc().set(req.body.data);
    res.end();
  });
