import { sendOtp } from "../../utils/supabaseUtils.js";

export const sendOtpHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error:
          "Введите имя пользователя или адрес электронной почты из аккаунта Spotify Lite.",
      });
    }

    const result = await sendOtp(email);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};
