import { signUp } from "../../../utils/supabaseUtils.js";

export const signUpHandler = async (req, res) => {
  try {
    const userData = req.body;
    const data = await signUp(userData);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
