import { getSearchResults } from "../../utils/spotifyUtils.js";

export const searchHandler = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const results = await getSearchResults(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
