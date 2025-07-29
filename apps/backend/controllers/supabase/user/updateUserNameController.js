import { updateUserName } from "#utils/supabase/user/userUtils";

export const updateUserNameHandler = async (req, res) => {
  const { id } = req.params;
  const { userName } = req.body;
  try {
    const data = await updateUserName(id, userName);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
