import { signIn } from "../../utils/supabaseUtils.js";

export const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email и пароль обязательны" });
    }
    const data = await signIn({ email, password });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
