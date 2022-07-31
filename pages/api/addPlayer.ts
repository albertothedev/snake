import { type NextApiRequest, type NextApiResponse } from "next";

import firestore from "config/firebase";
import { TPlayer } from "types";

export default function addPlayer(
  req: NextApiRequest,
  res: NextApiResponse<TPlayer>
) {
  firestore.collection("players").doc().set(req.body.data);
  res.end();
}
