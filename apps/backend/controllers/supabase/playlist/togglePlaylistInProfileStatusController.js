import { togglePlaylistInProfileStatus } from "#utils/supabaseUtils";

export const togglePlaylistInProfileStatusHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, userId } = req.body;
    const data = await togglePlaylistInProfileStatus(id, userId, status);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
