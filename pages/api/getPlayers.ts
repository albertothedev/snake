import { type NextApiRequest, type NextApiResponse } from "next";

import firestore from "config/firebase";

const playersRef = firestore.collection("players");

export default function getPlayers(
  req: NextApiRequest,
  res: NextApiResponse<Array<Player>>
) {
  let players: Array<Player> = [];

  playersRef
    .orderBy("score", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc: any) => players.push(doc.data()));
      res.send(players);
    })
    .catch((err) => console.error(`Error getting document: ${err}`));
}
