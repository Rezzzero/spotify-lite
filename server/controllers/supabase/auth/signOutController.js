import { signOut } from "../../../utils/supabaseUtils.js";

export const signOutHandler = async (_, res) => {
  try {
    await signOut();

    res.clearCookie("access_token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
