import {
  deleteUserImage,
  updateUserImage,
} from "#utils/supabase/user/userUtils";

export const deleteUserImageHandler = async (req, res) => {
  const id = req.params.id;
  const { error } = await updateUserImage(
    id,
    "https://jiiyqowxssltsrpijqog.supabase.co/storage/v1/object/public/user//user-placeholder.png"
  );

  await deleteUserImage(id);

  if (error) {
    res.status(500).json({ message: "Error deleting user image" });
  }

  res.status(200).json({ message: "User image deleted successfully" });
};
