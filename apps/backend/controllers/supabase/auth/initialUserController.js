import { getUserByAccessToken } from "#utils/supabaseUtils";

export const initialUserHandler = async (req, res) => {
  try {
    const accessToken = req.cookies.access_token;
    const user = await getUserByAccessToken(accessToken);

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
