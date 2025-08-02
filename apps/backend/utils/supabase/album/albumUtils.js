import { getAlbum } from "#utils/spotifyUtils";
import { supabaseAdmin } from "../../../clients/supabase/supabaseClient.js";

export const addAlbumToSupabase = async (albumId) => {
  const album = await getAlbum(albumId);
  const albumData = {
    id: album.id,
    name: album.name,
    images: album.images,
    owner: {
      name: album.artists[0].name,
    },
  };
  const { data, error } = await supabaseAdmin
    .from("albums")
    .insert([albumData])
    .select();

  if (error) {
    console.error("Ошибка при добавлении альбома в базу:", error.message);
    throw new Error("Ошибка при добавлении альбома в базу");
  }
  return data[0];
};

export const isAlbumExistsInAlbumTable = async (albumId) => {
  const { data, error } = await supabaseAdmin
    .from("albums")
    .select("*")
    .eq("id", albumId);

  if (error) {
    console.error("Ошибка при проверке существования альбома:", error.message);
    throw new Error("Ошибка при проверке существования альбома");
  }

  return data.length > 0;
};

export const addAlbumToUser = async (userId, albumId) => {
  const isAlbumsExists = await isAlbumExistsInAlbumTable(albumId);

  if (!isAlbumsExists) {
    await addAlbumToSupabase(albumId);
  }

  const { data: insertData, error: insertError } = await supabaseAdmin
    .from("user_albums")
    .insert([{ user_id: userId, album_id: albumId }])
    .select();

  if (insertError) {
    console.error(
      "Ошибка при привязке альбома к пользователю:",
      insertError.message
    );
    throw new Error("Ошибка при привязке альбома к пользователю");
  }

  const addedAt = insertData?.[0]?.added_at ?? null;

  const { data: album, error: fetchError } = await supabaseAdmin
    .from("albums")
    .select("*")
    .eq("id", albumId)
    .single();

  if (fetchError) {
    console.error("Ошибка при получении альбома:", fetchError.message);
    throw new Error("Ошибка при получении альбома");
  }

  return { ...album, type: "album", added_at: addedAt };
};

export const deleteAlbumFromUser = async (userId, albumId) => {
  const { error } = await supabaseAdmin
    .from("user_albums")
    .delete()
    .eq("user_id", userId)
    .eq("album_id", albumId)
    .select();

  if (error) {
    console.error("Ошибка при удалении альбома из базы:", error.message);
    throw new Error("Ошибка при удалении альбома из базы");
  }
};
