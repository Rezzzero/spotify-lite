import { updatePlaylist, getUserImageUrl } from "#utils/supabaseUtils";

export const updatePlaylistHandler = async (req, res) => {
  try {
    const playlistId = req.params.playlistId;
    const playlistData = req.body;
    const data = await updatePlaylist(playlistId, playlistData);
    const imageUrl = await getUserImageUrl(data[0].user_id);

    res.json([
      {
        ...data[0],
        owner: {
          ...data[0].owner,
          imageUrl: imageUrl,
          id: data[0].user_id,
        },
      },
    ]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
