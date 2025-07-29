import { subscribeToUser } from "#utils/supabase/user/userUtils";

export const subscribeHandler = async (req, res) => {
  try {
    const userData = req.body;
    const data = await subscribeToUser(userData);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
