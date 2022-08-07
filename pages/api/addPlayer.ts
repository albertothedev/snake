import { type NextApiRequest, type NextApiResponse } from "next";

import firestore from "config/firebase";

export default function addPlayer(
  req: NextApiRequest,
  res: NextApiResponse<Player>
) {
  firestore.collection("players").doc().set(req.body.data);
  res.end();
}
