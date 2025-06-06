import { customAlphabet } from "nanoid";

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const generateSpotifyLikeId = customAlphabet(alphabet, 22);

export const generateId = () => `sp_${generateSpotifyLikeId()}`;
