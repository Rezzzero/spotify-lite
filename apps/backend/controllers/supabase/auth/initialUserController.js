import {
  getUserByAccessToken,
  getUserSubscriptions,
} from "#utils/supabaseUtils";

export const initialUserHandler = async (req, res) => {
  try {
    const accessToken = req.cookies.access_token;
    const user = await getUserByAccessToken(accessToken);
    const subscriptions = await getUserSubscriptions(user.id);
    res.json({ user, subscriptions });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
