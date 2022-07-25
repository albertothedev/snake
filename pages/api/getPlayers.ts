import { type NextApiRequest, type NextApiResponse } from "next";

import firestore from "../../config/firebase";
import { TPlayer } from "../../types";

const playersRef = firestore.collection("players");

export default function getPlayers(
  req: NextApiRequest,
  res: NextApiResponse<Array<TPlayer>>
) {
  let players: Array<TPlayer> = [];

  playersRef
    .orderBy("score", "desc")
    .get()
    .then((snapshot: any) => {
      snapshot.forEach((doc: any) => players.push(doc.data()));
      res.send(players);
    })
    .catch((err: any) => console.error(`Error getting document: ${err}`));
}
