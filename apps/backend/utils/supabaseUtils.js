import { supabase, supabaseAdmin } from "../clients/supabase/supabaseClient.js";
import {
  getSoundCloudSearchResults,
  getSoundCloudStream,
} from "#utils/soundCloudUtils";

export const checkEmail = async (email) => {
  const { data, error } = await supabaseAdmin.rpc("check_email_exists", {
    email_param: email,
  });

  if (error) {
    console.error("Ошибка проверки email:", error.message);
  }
  return data;
};

export const signUp = async (userData) => {
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        userName: userData.userName,
        gender: userData.gender,
        birthday: userData.birthday,
        monthOfBirthday: userData.monthOfBirthday,
        yearOfBirthday: userData.yearOfBirthday,
        userImage: userData.userImage,
      },
    },
  });

  if (error) {
    console.error("Ошибка регистрации:", error.message);
  }

  return data;
};

export const signIn = async (userData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password,
  });

  if (error) {
    throw new Error("Неверный email или пароль");
  }

  return data;
};

export const sendOtp = async (email) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    const customError = new Error(
      "Ошибка при отправке кода. Попробуйте позже."
    );
    customError.status = 500;
    throw customError;
  }

  return {
    success: true,
    message: "Код отправлен на вашу почту",
  };
};

export const signInWithOtp = async (email, otp) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) {
    const msg = error.message.toLowerCase();
    if (msg.includes("invalid login")) {
      const err = new Error("Недействительный код");
      err.status = 400;
      throw err;
    }

    if (msg.includes("token has expired")) {
      const err = new Error("Код истёк. Запросите новый код.");
      err.status = 400;
      throw err;
    }

    const err = new Error("Не удалось подтвердить код. Попробуйте позже.");
    err.status = 500;
    throw err;
  }

  return {
    success: true,
    message: "Код успешно подтверждён",
    session: data.session,
  };
};

export const getUserByAccessToken = async (accessToken) => {
  if (!accessToken) {
    throw new Error("Не авторизован");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    throw new Error("Неверный токен");
  }

  return user;
};

export const signOut = async () => {
  await supabase.auth.signOut({ scope: "local" });
};

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
  const { error: errorWithAdd } = await supabaseAdmin
    .from("user_playlists")
    .insert([{ playlist_id: playlistId, user_id: userId }]);

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

  return playlist;
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

export const getPlaylistsOfUser = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("user_playlists")
    .select("playlists(*)")
    .eq("user_id", userId);

  if (error) {
    console.error(
      "Ошибка при получении плейлистов пользователя:",
      error.message
    );
    throw new Error("Ошибка при получении плейлистов пользователя");
  }

  return data.map((item) => item.playlists);
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

export const getUserById = async (id) => {
  const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);

  if (error) {
    console.error("Ошибка при получении пользователя:", error.message);
    throw new Error("Ошибка при получении пользователя");
  }

  const user = {
    id: data.user.id,
    email: data.user.email,
    userName: data.user.user_metadata.userName,
    imageUrl: data.user.user_metadata.userImage,
  };

  return user;
};

export const uploadUserImageToSupabase = async (file, userId) => {
  const { error } = await supabaseAdmin.storage
    .from("user")
    .upload(`${userId}`, file.buffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.mimetype,
    });

  if (error) {
    console.error("Ошибка при загрузке изображения:", error.message);
    throw new Error("Ошибка при загрузке изображения");
  }
};

export const getUserImageUrl = async (userId) => {
  const { data, error } = supabaseAdmin.storage
    .from("user")
    .getPublicUrl(`${userId}`);

  if (error) {
    console.error("Ошибка при получении URL изображения:", error.message);
    throw new Error("Ошибка при получении URL изображения");
  }

  return data.publicUrl;
};

export const updateUserImage = async (userId, imageUrl) => {
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      user_metadata: { userImage: imageUrl },
    }
  );

  if (error) {
    console.error("Ошибка при обновлении изображения:", error.message);
    throw new Error("Ошибка при обновлении изображения");
  }

  return data;
};

export const updateUserName = async (userId, userName) => {
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      user_metadata: { userName },
    }
  );

  const { error: updateError } = await supabaseAdmin
    .from("playlists")
    .update({
      owner: {
        display_name: data.user.user_metadata.userName,
      },
    })
    .eq("user_id", userId);

  if (error || updateError) {
    console.error("Ошибка при обновлении имени пользователя:", error.message);
    throw new Error("Ошибка при обновлении имени пользователя");
  }

  return data;
};

export const deleteUserImage = async (userId) => {
  const { error } = await supabaseAdmin.storage.from("user").remove([userId]);

  if (error) {
    console.error("Ошибка при удалении изображения:", error.message);
    throw new Error("Ошибка при удалении изображения");
  }
};

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

export const getOpenUserPlaylists = async (id) => {
  const { data: userPlaylists, error: userPlaylistsError } = await supabaseAdmin
    .from("user_playlists")
    .select("playlist_id")
    .eq("user_id", id)
    .eq("show_in_profile", true);

  if (userPlaylistsError) {
    console.error(
      "Ошибка при получении user_playlists:",
      userPlaylistsError.message
    );
    throw new Error("Ошибка при получении user_playlists");
  }

  const playlistIds = userPlaylists.map((item) => item.playlist_id);
  if (playlistIds.length === 0) return [];

  const { data: playlists, error: playlistsError } = await supabaseAdmin
    .from("playlists")
    .select("*")
    .in("id", playlistIds);

  if (playlistsError) {
    console.error("Ошибка при получении плейлистов:", playlistsError.message);
    throw new Error("Ошибка при получении плейлистов");
  }

  return playlists;
};

export const subscibeToArtist = async (artistData) => {
  const { data, error } = await supabaseAdmin
    .from("user_artist_subscriptions")
    .insert([artistData])
    .select();

  if (error) {
    console.error("Ошибка при подписке:", error.message);
    throw new Error("Ошибка при подписке");
  }
  return data;
};

export const unsubscribeFromArtist = async (artistId, userId) => {
  const { data, error } = await supabaseAdmin
    .from("user_artist_subscriptions")
    .delete()
    .eq("artist_id", artistId)
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("Ошибка при отписке:", error.message);
    throw new Error("Ошибка при отписке");
  }
  return data;
};
