import {
  getUserToArtistSubscriptions,
  getUserToUserSubscriptions,
  signInWithOtp,
} from "#utils/supabaseUtils";

export const signInWithOtpHandler = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await signInWithOtp(email, otp);
    const userToArtistSubs = await getUserToArtistSubscriptions(
      result.session.user.id
    );
    const userToUserSubs = await getUserToUserSubscriptions(
      result.session.user.id
    );

    const subscriptions = {
      userToArtistSubs,
      userToUserSubs,
    };
    res.cookie("access_token", result.session.access_token, {
      httpOnly: true,
      secure: false,
      maxAge: result.session.expires_in * 1000,
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ user: result.session.user, subscriptions });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};
