import { supabase, supabaseAdmin } from "../supabase/supabaseClient.js";

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
  const exists = await checkEmail(email);

  if (!exists) {
    const customError = new Error(
      "Адрес электронной почты или имя пользователя не привязаны к учетной записи Spotify Lite"
    );
    customError.status = 400;
    throw customError;
  } else {
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
  }
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
      user_id: playlistData.userId,
      name: playlistData.name,
      description: playlistData.description,
      public: playlistData.public,
      images: playlistData.images,
      owner: playlistData.owner,
    },
  ]);

  if (error) {
    console.error("Ошибка при создании плейлиста:", error.message);
    throw new Error("Ошибка при создании плейлиста");
  }

  return data;
};

export const getPlaylist = async (playlistId) => {
  const { data: playlist, error: playlistError } = await supabaseAdmin
    .from("playlists")
    .select("*")
    .eq("id", playlistId)
    .single();

  if (playlistError) {
    console.error("Ошибка при получении плейлиста:", playlistError.message);
    throw new Error("Ошибка при получении плейлиста");
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
    .from("playlists")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error(
      "Ошибка при получении плейлистов пользователя:",
      error.message
    );
    throw new Error("Ошибка при получении плейлистов пользователя");
  }

  return data;
};

export const addTrackToPlaylist = async (trackData, playlistId) => {
  const { data: existingTrack, error: checkError } = await supabaseAdmin
    .from("tracks")
    .select()
    .eq("id", trackData.id)
    .maybeSingle();

  if (checkError) {
    console.error("Ошибка при проверке трека:", checkError.message);
    throw new Error("Ошибка при проверке трека");
  }

  let trackId = trackData.id;
  let trackToReturn;

  if (!existingTrack) {
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

    trackId = newTrack.id;
    trackToReturn = newTrack;
  } else {
    trackToReturn = existingTrack;
  }

  const { data: playlistTrack, error: playlistTrackError } = await supabaseAdmin
    .from("playlist_tracks")
    .insert([
      {
        playlist_id: playlistId,
        track_id: trackId,
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

  return {
    track: {
      ...trackToReturn,
      added_at: playlistTrack.added_at,
      entry_id: playlistTrack.id,
    },
    playlistTrack,
  };
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
