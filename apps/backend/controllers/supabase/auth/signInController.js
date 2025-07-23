import { getUserSubscriptions, signIn } from "#utils/supabaseUtils";

export const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email и пароль обязательны" });
    }
    const data = await signIn({ email, password });

    const subscriptions = await getUserSubscriptions(data.user.id);
    res.cookie("access_token", data.session.access_token, {
      httpOnly: true,
      secure: false,
      maxAge: data.session.expires_in * 2000,
      sameSite: "lax",
      path: "/",
    });

    res.json({ user: data.session.user, subscriptions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
