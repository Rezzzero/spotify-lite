import {
  getSoundCloudSearchResults,
  getSoundCloudStream,
} from "#utils/soundCloudUtils";
import { supabaseAdmin } from "../../../clients/supabase/supabaseClient.js";
export const isTrackExistsInTrackTable = async (trackId) => {
  const { data: existingTrack, error: checkError } = await supabaseAdmin
    .from("tracks")
    .select()
    .eq("id", trackId)
    .maybeSingle();

  if (checkError) {
    console.error("Ошибка при проверке трека:", checkError.message);
    throw new Error("Ошибка при проверке трека");
  }

  if (!existingTrack) {
    return null;
  }

  const addedAt = new Date(existingTrack.added_at);
  const now = new Date();
  const hourInMs = 60 * 60 * 1000;

  if (now.getTime() - addedAt.getTime() < hourInMs) {
    return existingTrack;
  } else {
    return "TIME_LIMIT_EXCEEDED";
  }
};

export const addTrackToTrackTable = async (trackData) => {
  const { data: newTrack, error: trackError } = await supabaseAdmin
    .from("tracks")
    .insert([
      {
        id: trackData.id,
        name: trackData.name,
        duration_ms: trackData.duration_ms,
        album: trackData.album,
        artists: trackData.artists,
        mp3_url: trackData.mp3_url,
      },
    ])
    .select()
    .single();

  if (trackError) {
    console.error("Ошибка при добавлении трека:", trackError.message);
    throw new Error("Ошибка при добавлении трека");
  }

  return newTrack;
};

export const updateTrackPreviewUrl = async (id, url) => {
  const { data: updatedTrack, error } = await supabaseAdmin
    .from("tracks")
    .update({ mp3_url: url, added_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Ошибка при обновлении трека:", error.message);
    throw new Error("Ошибка при обновлении трека");
  }

  return updatedTrack;
};

export const getOrUpdateTrack = async (track) => {
  const existsTrack = await isTrackExistsInTrackTable(track.id);

  if (existsTrack && existsTrack !== "TIME_LIMIT_EXCEEDED") {
    return existsTrack;
  }

  const query = `${track.artists[0].name} - ${track.name}`;

  const soundcloudData = await getSoundCloudSearchResults(query);
  const streamInfo = soundcloudData.collection[0].media.transcodings.find(
    (transcoding) => transcoding.format.protocol === "progressive"
  );
  if (!streamInfo) {
    throw new Error("Track isn't available");
  }

  const mp3Url = await getSoundCloudStream(streamInfo.url);

  if (existsTrack === "TIME_LIMIT_EXCEEDED") {
    return await updateTrackPreviewUrl(track.id, mp3Url);
  } else {
    const trackWithMp3 = {
      ...track,
      mp3_url: mp3Url,
    };
    return await addTrackToTrackTable(trackWithMp3);
  }
};
