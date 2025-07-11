import { checkEmail } from "#utils/supabaseUtils";

export const checkEmailHandler = async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const data = await checkEmail(email);
    res.json({ exists: !!data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
