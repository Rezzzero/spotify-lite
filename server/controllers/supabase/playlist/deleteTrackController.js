import { deleteTrackFromPlaylist } from "../../../utils/supabaseUtils.js";

export const deleteTrackHandler = async (req, res) => {
  try {
    const { entryId } = req.body;

    if (!entryId) {
      return res.status(400).json({
        error: "Missing required fields: entryId is required",
      });
    }

    const result = await deleteTrackFromPlaylist(entryId);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ message: "Track deleted successfully" });
  } catch (error) {
    console.error("Error deleting track:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
