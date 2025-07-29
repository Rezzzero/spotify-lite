import { unsubscribeFromUser } from "#utils/supabase/user/userUtils";

export const unsubscribeHandler = async (req, res) => {
  const targetId = req.params.id;
  const userId = req.body.userId;
  try {
    const data = await unsubscribeFromUser(userId, targetId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
