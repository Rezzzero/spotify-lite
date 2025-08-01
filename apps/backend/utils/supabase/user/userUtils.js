import { getArtist, getSeveralArtists } from "#utils/spotifyUtils";
import { supabaseAdmin } from "../../../clients/supabase/supabaseClient.js";

export const getPlaylistsOfUser = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("user_playlists")
    .select("*, playlists(*)")
    .eq("user_id", userId);

  if (error) {
    console.error(
      "Ошибка при получении плейлистов пользователя:",
      error.message
    );
    throw new Error("Ошибка при получении плейлистов пользователя");
  }
  return data.map((item) => {
    return {
      ...item.playlists,
      added_at: item.added_at,
      show_in_profile: item.show_in_profile,
      type: "playlist",
    };
  });
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
  const { data: insertData, error: insertError } = await supabaseAdmin
    .from("user_artist_subscriptions")
    .insert([artistData])
    .select();

  if (insertError) {
    console.error("Ошибка при подписке на артиста:", error.message);
    throw new Error("Ошибка при подписке на артиста");
  }

  const data = await getArtist(artistData.artist_id);

  return { ...data, added_at: insertData[0].added_at };
};

export const unsubscribeFromArtist = async (artistId, userId) => {
  const { data, error } = await supabaseAdmin
    .from("user_artist_subscriptions")
    .delete()
    .eq("artist_id", artistId)
    .eq("user_id", userId)
    .select();

  if (error) {
    console.error("Ошибка при отписке от артиста:", error.message);
    throw new Error("Ошибка при отписке от артиста");
  }
  return data;
};

export const subscribeToUser = async (userData) => {
  const { data, error } = await supabaseAdmin
    .from("user_user_subscriptions")
    .insert([userData])
    .select("target_user:target_user_id(*), added_at");

  if (error) {
    console.error("Ошибка при подписке на пользователя:", error.message);
    throw new Error("Ошибка при подписке на пользователя");
  }

  // Возвращаем форматированный объект
  return data.map((item) => ({
    ...item.target_user, // все поля из users
    added_at: item.added_at, // дата подписки
    type: "user", // указанный тип
  }));
};

export const unsubscribeFromUser = async (userId, targetUserId) => {
  const { data, error } = await supabaseAdmin
    .from("user_user_subscriptions")
    .delete()
    .eq("user_id", userId)
    .eq("target_user_id", targetUserId)
    .select();

  if (error) {
    console.error("Ошибка при отписке от пользователя:", error.message);
    throw new Error("Ошибка при отписке от пользователя");
  }
  return data;
};

export const getUserToUserSubscriptions = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("user_user_subscriptions")
    .select("target_user_id, added_at")
    .eq("user_id", userId);

  if (error) {
    console.error("Ошибка при получении подписок пользователя:", error.message);
    throw new Error("Ошибка при получении подписок пользователя");
  }

  const ids = data.map((item) => item.target_user_id);

  const users = await supabaseAdmin.from("users").select("*").in("id", ids);

  return users.data.map((user) => ({
    ...user,
    added_at: data.find((item) => item.target_user_id === user.id).added_at,
    type: "user",
  }));
};

export const getUserToArtistSubscriptions = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("user_artist_subscriptions")
    .select("artist_id, added_at")
    .eq("user_id", userId);

  if (error) {
    console.error("Ошибка при получении подписок пользователя:", error.message);
    throw new Error("Ошибка при получении подписок пользователя");
  }

  const ids = data.map((item) => item.artist_id);
  if (ids.length === 0) {
    return [];
  }

  const artists = await getSeveralArtists(ids);

  return artists.map((artist) => ({
    ...artist,
    added_at: data.find((item) => item.artist_id === artist.id).added_at,
  }));
};

export const getUserFollowers = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("user_user_subscriptions")
    .select("user_id")
    .eq("target_user_id", userId);

  if (error) {
    throw new Error("Ошибка при получении id подписчиков пользователя");
  }

  const ids = data.map((item) => item.user_id);

  const users = await supabaseAdmin.from("users").select("*").in("id", ids);

  return users.data.map((user) => user);
};

export const getUserAlbums = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("user_albums")
    .select("added_at, albums(*)")
    .eq("user_id", userId);

  if (error) {
    throw new Error("Ошибка при получении альбомов пользователя");
  }
  return data.map((item) => ({
    ...item.albums,
    added_at: item.added_at,
    type: "album",
  }));
};
