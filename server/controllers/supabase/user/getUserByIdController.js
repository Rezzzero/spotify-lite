import { getUserById } from "../../../utils/supabaseUtils.js";

export const getUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  const user = await getUserById(id);
  res.json(user);
};
