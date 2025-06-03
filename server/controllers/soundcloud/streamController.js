import { getSoundCloudStream } from "../../utils/soundCloudUtils.js";

export const streamHandler = async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }
  try {
    const stream = await getSoundCloudStream(url);
    res.json(stream);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
