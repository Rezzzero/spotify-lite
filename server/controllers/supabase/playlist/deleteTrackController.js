import { deleteTrackFromPlaylist } from "../../../utils/supabaseUtils.js";

export const deleteTrackHandler = async (req, res) => {
  try {
    const { trackId, playlistId } = req.body;

    if (!trackId || !playlistId) {
      return res.status(400).json({
        error: "Missing required fields: trackId and playlistId are required",
      });
    }

    const result = await deleteTrackFromPlaylist(trackId, playlistId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ message: "Track deleted successfully" });
  } catch (error) {
    console.error("Error deleting track:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
