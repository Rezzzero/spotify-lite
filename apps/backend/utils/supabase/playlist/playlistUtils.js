import { supabaseAdmin } from "../../../clients/supabase/supabaseClient.js";

export const createPlaylist = async (playlistData) => {
  const { data, error } = await supabaseAdmin.from("playlists").insert([
    {
      id: playlistData.id,
      user_id: playlistData.user_id,
      name: playlistData.name,
      description: playlistData.description,
      public: playlistData.public,
      images: playlistData.images,
      owner: {
        display_name: playlistData.owner.display_name,
      },
    },
  ]);

  if (error) {
    console.error("Ошибка при создании плейлиста:", error.message);
    throw new Error("Ошибка при создании плейлиста");
  }

  return data;
};

export const addPlaylistToUser = async (playlistId, userId) => {
  const { data: insertedRows, error: errorWithAdd } = await supabaseAdmin
    .from("user_playlists")
    .insert([{ playlist_id: playlistId, user_id: userId }])
    .select();

  const { data: playlist, error: playlistError } = await supabaseAdmin
    .from("playlists")
    .select("*")
    .eq("id", playlistId)
    .single();

  if (errorWithAdd) {
    console.error(
      "Ошибка при добавлении плейлиста в пользователя:",
      errorWithAdd.message
    );
    throw new Error("Ошибка при добавлении плейлиста в пользователя");
  }

  if (playlistError) {
    console.error("Ошибка при получении плейлиста:", playlistError.message);
    throw new Error("Ошибка при получении плейлиста");
  }

  const addedAt = insertedRows?.[0]?.added_at ?? null;
  const showInProfile = insertedRows?.[0]?.show_in_profile ?? null;

  return {
    ...playlist,
    type: "playlist",
    added_at: addedAt,
    show_in_profile: showInProfile,
  };
};

export const deletePlaylistFromUser = async (playlistId) => {
  const { error } = await supabaseAdmin
    .from("user_playlists")
    .delete()
    .eq("playlist_id", playlistId);

  if (error) {
    console.error(
      "Ошибка при удалении плейлиста из пользователя:",
      error.message
    );
    throw new Error("Ошибка при удалении плейлиста из пользователя");
  }
};

export const getPlaylist = async (playlistId, userId) => {
  const { data: playlist, error: playlistError } = await supabaseAdmin
    .from("playlists")
    .select("*")
    .eq("id", playlistId)
    .single();

  if (
    playlistError &&
    playlistError.message ===
      "JSON object requested, multiple (or no) rows returned"
  ) {
    throw new Error("NOT_FOUND");
  }
  if (!playlist) {
    throw new Error("NOT_FOUND");
  }

  let show_in_profile = false;
  if (userId) {
    const { data: playlistInProfileStatus, error: statusError } =
      await supabaseAdmin
        .from("user_playlists")
        .select("show_in_profile")
        .eq("playlist_id", playlistId)
        .eq("user_id", userId)
        .single();
    if (!statusError && playlistInProfileStatus) {
      show_in_profile = playlistInProfileStatus.show_in_profile;
    }
  }

  const { data: tracks, error: tracksError } = await supabaseAdmin
    .from("playlist_tracks")
    .select("id, track_id, added_at, tracks(*)")
    .eq("playlist_id", playlistId);

  if (tracksError) {
    console.error(
      "Ошибка при получении треков плейлиста:",
      tracksError.message
    );
    throw new Error("Ошибка при получении треков плейлиста");
  }

  const tracksWithAddedAt = tracks.map((item) => ({
    ...item.tracks,
    added_at: item.added_at,
    entry_id: item.id,
  }));

  const duration = tracksWithAddedAt.reduce(
    (acc, track) => acc + track.duration_ms,
    0
  );

  return {
    playlist: {
      ...playlist,
      duration,
      show_in_profile,
    },
    tracks: tracksWithAddedAt,
  };
};

export const deletePlaylist = async (playlistId) => {
  const { data, error } = await supabaseAdmin
    .from("playlists")
    .delete()
    .eq("id", playlistId)
    .single();

  if (error) {
    console.error("Ошибка при удалении плейлиста:", error.message);
    throw new Error("Ошибка при удалении плейлиста");
  }

  return data;
};

export const updatePlaylist = async (playlistId, playlistData) => {
  const { data, error } = await supabaseAdmin
    .from("playlists")
    .update(playlistData)
    .eq("id", playlistId)
    .select();

  if (error) {
    console.error("Ошибка при обновлении плейлиста:", error.message);
    throw new Error("Ошибка при обновлении плейлиста");
  }

  return data;
};

export const uploadImageToSupabasePlaylists = async (file, playlistId) => {
  const { error } = await supabaseAdmin.storage
    .from("playlist")
    .upload(`${playlistId}`, file.buffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.mimetype,
    });

  if (error) {
    console.error("Ошибка при загрузке изображения:", error.message);
    throw new Error("Ошибка при загрузке изображения");
  }
};

export const getPlaylistImageUrl = (playlistId) => {
  const { data, error } = supabaseAdmin.storage
    .from("playlist")
    .getPublicUrl(`${playlistId}`);

  if (error) {
    console.error("Ошибка при получении URL изображения:", error.message);
    throw new Error("Ошибка при получении URL изображения");
  }

  return data.publicUrl;
};

export const deletePlaylistImage = async (playlistId) => {
  const { error } = await supabaseAdmin.storage
    .from("playlist")
    .remove([playlistId]);

  if (error) {
    console.error("Ошибка при удалении изображения:", error.message);
    throw new Error("Ошибка при удалении изображения");
  }
};

export const addTrackToPlaylist = async (trackData, playlistId) => {
  const { data: playlistTrack, error: playlistTrackError } = await supabaseAdmin
    .from("playlist_tracks")
    .insert([
      {
        playlist_id: playlistId,
        track_id: trackData.id,
        added_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (playlistTrackError) {
    console.error(
      "Ошибка при добавлении трека в плейлист:",
      playlistTrackError.message
    );
    throw new Error("Ошибка при добавлении трека в плейлист");
  }

  const playlistName = await getPlaylistName(playlistId);

  return {
    track: {
      ...trackData,
      added_at: playlistTrack.added_at,
      entry_id: playlistTrack.id,
    },
    playlistTrack,
    playlistName,
  };
};

export const getPlaylistName = async (playlistId) => {
  const { data, error } = await supabaseAdmin
    .from("playlists")
    .select("name")
    .eq("id", playlistId)
    .single();

  if (error) {
    console.error("Ошибка при получении названия плейлиста:", error.message);
    throw new Error("Ошибка при получении названия плейлиста");
  }

  return data.name;
};

export const deleteTrackFromPlaylist = async (entryId) => {
  const { data, error } = await supabaseAdmin
    .from("playlist_tracks")
    .delete()
    .eq("id", entryId)
    .select();

  if (error) {
    console.error("Ошибка при удалении трека из плейлиста:", error.message);
    throw new Error("Ошибка при удалении трека из плейлиста");
  }

  return data;
};

export const deleteAllTracksFromPlaylist = async (playlistId) => {
  const { error } = await supabaseAdmin
    .from("playlist_tracks")
    .delete()
    .eq("playlist_id", playlistId);

  if (error) {
    console.error(
      "Ошибка при удалении всех треков из плейлиста:",
      error.message
    );
    throw new Error("Ошибка при удалении всех треков из плейлиста");
  }
};

export const togglePlaylistInProfileStatus = async (
  playlistId,
  userId,
  status
) => {
  const { data, error } = await supabaseAdmin
    .from("user_playlists")
    .update({ show_in_profile: status })
    .eq("playlist_id", playlistId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.log("Ошибка при добавлении плейлиста в профиль:", error.message);
    throw new Error("Ошибка при добавлении плейлиста в профиль");
  }

  return data;
};
