import {
  uploadUserImageToSupabase,
  getUserImageUrl,
  updateUserImage,
} from "../../../utils/supabaseUtils.js";

export const uploadUserImageHandler = async (req, res) => {
  const { id } = req.params;
  const file = req.file;
  try {
    await uploadUserImageToSupabase(file, id);
    const imageUrl = await getUserImageUrl(id);
    await updateUserImage(id, imageUrl);
    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload image" });
  }
};
