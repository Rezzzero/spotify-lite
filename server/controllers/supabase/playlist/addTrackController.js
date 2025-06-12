import {
  getSoundCloudSearchResults,
  getSoundCloudStream,
} from "../../../utils/soundCloudUtils.js";
import { addTrackToPlaylist } from "../../../utils/supabaseUtils.js";

export const addTrackHandler = async (req, res) => {
  try {
    const track = req.body.track;
    const playlistId = req.body.playlist_id;

    const soundcloudData = await getSoundCloudSearchResults(track.name);
    const streamInfo = soundcloudData.collection[0].media.transcodings.find(
      (transcoding) => transcoding.format.protocol === "progressive"
    );

    if (!streamInfo) {
      return res.status(400).json({ error: "Track isn't available" });
    }

    const mp3Url = await getSoundCloudStream(streamInfo.url);

    const trackWithMp3 = {
      ...track,
      mp3_url: mp3Url,
    };

    const data = await addTrackToPlaylist(trackWithMp3, playlistId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
