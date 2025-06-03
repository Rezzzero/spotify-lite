import { signInWithOtp } from "../../utils/supabaseUtils.js";

export const signInWithOtpHandler = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await signInWithOtp(email, otp);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};
