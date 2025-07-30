import { supabaseAdmin } from "../../../clients/supabase/supabaseClient.js";

export const addAlbumToSupabase = async (albumData) => {
  const { data, error } = await supabaseAdmin
    .from("albums")
    .insert([albumData])
    .select();

  if (error) {
    console.error("Ошибка при добавлении альбома в базу:", error.message);
    throw new Error("Ошибка при добавлении альбома в базу");
  }
  return data;
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

export const addAlbumToUser = async (userId, albumId, albumdData) => {
  const isAlbumsExists = await isAlbumExistsInAlbumTable(albumId);
  if (!isAlbumsExists) {
    const { data: albumFromSupabase, error: albumFromSupabaseError } =
      await addAlbumToSupabase(albumdData);

    if (albumFromSupabaseError) {
      console.error(
        "Ошибка при добавлении альбома в базу:",
        albumFromSupabaseError.message
      );
      throw new Error("Ошибка при добавлении альбома в базу");
    }

    return albumFromSupabase;
  }

  const { error: insertError } = await supabaseAdmin
    .from("user_albums")
    .insert([{ user_id: userId, album_id: albumId }]);

  if (insertError) {
    console.error(
      "Ошибка при привязке альбома к пользователю:",
      insertError.message
    );
    throw new Error("Ошибка при привязке альбома к пользователю");
  }

  const { data: existingAlbum, error: fetchError } = await supabaseAdmin
    .from("albums")
    .select("*")
    .eq("id", albumId)
    .single();

  if (fetchError) {
    console.error(
      "Ошибка при получении существующего альбома:",
      fetchError.message
    );
    throw new Error("Ошибка при получении существующего альбома");
  }

  return { ...existingAlbum, type: "album" };
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
