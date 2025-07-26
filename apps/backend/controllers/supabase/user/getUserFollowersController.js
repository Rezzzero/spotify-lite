import { getUserFollowers } from "#utils/supabaseUtils";

export const getUserFollowersHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const followers = await getUserFollowers(id);
    res.json(followers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
