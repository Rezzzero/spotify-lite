import { getUserByAccessToken } from "#utils/supabase/auth/authUtils";
import {
  getUserToUserSubscriptions,
  getUserToArtistSubscriptions,
} from "#utils/supabase/user/userUtils";

export const initialUserHandler = async (req, res) => {
  try {
    const accessToken = req.cookies.access_token;
    const user = await getUserByAccessToken(accessToken);
    const userToArtistSubs = await getUserToArtistSubscriptions(user.id);
    const userToUserSubs = await getUserToUserSubscriptions(user.id);
    const subscriptions = { userToArtistSubs, userToUserSubs };
    res.json({ user, subscriptions });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
