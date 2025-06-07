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
  const { data, error } = await supabase.from("playlists").insert([
    {
      id: playlistData.id,
      user_id: playlistData.userId,
      title: playlistData.title,
      description: playlistData.description,
      is_public: playlistData.isPublic,
      cover_url: playlistData.coverUrl,
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
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("id", playlistId)
    .single();

  if (error) {
    console.error("Ошибка при получении плейлиста:", error.message);
    throw new Error("Ошибка при получении плейлиста");
  }

  return data;
};
