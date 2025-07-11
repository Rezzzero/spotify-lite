import { getSoundCloudSearchResults } from "#utils/soundCloudUtils";

export const soundcloudSearchHandler = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const results = await getSoundCloudSearchResults(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
