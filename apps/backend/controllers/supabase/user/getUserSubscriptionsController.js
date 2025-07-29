import {
  getUserToUserSubscriptions,
  getUserToArtistSubscriptions,
} from "#utils/supabase/user/userUtils";

export const getUserSubscriptionsHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const userToUserSubs = await getUserToUserSubscriptions(userId);
    const userToArtistSubs = await getUserToArtistSubscriptions(userId);
    const mergedSubs = [...userToUserSubs, ...userToArtistSubs];
    mergedSubs.sort((a, b) => new Date(a.added_at) - new Date(b.added_at));
    res.json(mergedSubs);
  } catch {
    console.log("Ошибка при получении подписок пользователя", error.message);
    res.status(500).json({ error: error.message });
  }
};
