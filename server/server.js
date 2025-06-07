import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import popularTracksRoutes from "./routes/spotify/popularTracks.js";
import popularArtistsRoutes from "./routes/spotify/popularArtists.js";
import newReleasesRoutes from "./routes/spotify/newReleases.js";
import searchRouter from "./routes/spotify/search.js";
import artistRoutes from "./routes/spotify/artist.js";
import albumRoutes from "./routes/spotify/album.js";
import trackRoutes from "./routes/spotify/track.js";
import discographyRoutes from "./routes/spotify/discography.js";
import soundcloudSearchRoutes from "./routes/soundcloud/search.js";
import streamRoutes from "./routes/soundcloud/stream.js";
import checkEmailRoutes from "./routes/supabase/checkEmail.js";
import signUpRoutes from "./routes/supabase/signUp.js";
import signInRoutes from "./routes/supabase/signIn.js";
import sendOtpRoutes from "./routes/supabase/sendOtp.js";
import singInWithOtpRoutes from "./routes/supabase/signInWithOtp.js";
import initialUserRoutes from "./routes/supabase/initialUser.js";
import signOutRoutes from "./routes/supabase/signOut.js";
import createPlaylistRoutes from "./routes/supabase/createPlaylist.js";
import getPlaylistRoutes from "./routes/supabase/getPlaylist.js";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
const port = 3000;

app.use("/api/popular-tracks", popularTracksRoutes);

app.use("/api/popular-artists", popularArtistsRoutes);

app.use("/api/new-releases", newReleasesRoutes);

app.use("/api/search", searchRouter);

app.use("/api/artist", artistRoutes);

app.use("/api/album", albumRoutes);

app.use("/api/track", trackRoutes);

app.use("/api/discography", discographyRoutes);

app.use("/api/soundcloud-search", soundcloudSearchRoutes);

app.use("/api/soundcloud-stream", streamRoutes);

app.use("/check-email", checkEmailRoutes);

app.use("/signup", signUpRoutes);

app.use("/signin", signInRoutes);

app.use("/signout", signOutRoutes);

app.use("/auth/send-otp", sendOtpRoutes);

app.use("/auth/verify-otp", singInWithOtpRoutes);

app.use("/auth/me", initialUserRoutes);

app.use("/create-playlist", createPlaylistRoutes);

app.use("/get-supabase-playlist", getPlaylistRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
