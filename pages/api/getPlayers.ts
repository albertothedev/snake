import { type NextApiRequest, type NextApiResponse } from "next";

import firestore from "config/firebase";

const playersRef = firestore.collection("players");

export default function getPlayers(
  req: NextApiRequest,
  res: NextApiResponse<Array<Player>>
) {
  playersRef
    .orderBy("score", "desc")
    .get()
    .then((snapshot) =>
      res.send(snapshot.docs.map((doc) => doc.data() as Player))
    )
    .catch((err) => console.error(`Error getting document: ${err}`));
}
