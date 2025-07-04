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
import artistTopTracksRoutes from "./routes/spotify/artistTopTracks.js";
import artistAlbumsRoutes from "./routes/spotify/artistAlbums.js";
import albumTracksRoutes from "./routes/spotify/albumTracks.js";

import checkEmailRoutes from "./routes/supabase/auth/checkEmail.js";
import signUpRoutes from "./routes/supabase/auth/signUp.js";
import signInRoutes from "./routes/supabase/auth/signIn.js";
import sendOtpRoutes from "./routes/supabase/auth/sendOtp.js";
import singInWithOtpRoutes from "./routes/supabase/auth/signInWithOtp.js";
import initialUserRoutes from "./routes/supabase/auth/initialUser.js";
import signOutRoutes from "./routes/supabase/auth/signOut.js";

import createPlaylistRoutes from "./routes/supabase/playlist/createPlaylist.js";
import getPlaylistRoutes from "./routes/supabase/playlist/getPlaylist.js";
import deletePlaylistRoutes from "./routes/supabase/playlist/deletePlaylist.js";
import updatePlaylistRoutes from "./routes/supabase/playlist/updatePlaylist.js";
import uploadPlaylistImageRoutes from "./routes/supabase/playlist/uploadPlaylistImage.js";
import getPlaylistsOfUserRoutes from "./routes/supabase/playlist/getPlaylistsOfUser.js";
import addTrackRoutes from "./routes/supabase/playlist/addTrack.js";
import deleteTrackRoutes from "./routes/supabase/playlist/deleteTrack.js";
import deletePlaylistImageRoutes from "./routes/supabase/playlist/deletePlaylistImage.js";
import addPlaylistRoutes from "./routes/supabase/playlist/addPlaylist.js";
import deletePlaylistFromUserRoutes from "./routes/supabase/playlist/deletePlaylistFromUser.js";
import togglePlaylistInProfileStatusRoutes from "./routes/supabase/playlist/togglePlaylistInProfileStatus.js";

import getUserByIdRoutes from "./routes/supabase/user/getUserById.js";
import uploadUserImageRoutes from "./routes/supabase/user/uploadUserImage.js";
import updateUserNameRoutes from "./routes/supabase/user/updateUserName.js";
import deleteUserImageRoutes from "./routes/supabase/user/deleteUserImage.js";

import getTrackRoutes from "./routes/supabase/player/getTrack.js";

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
app.use("/api/artist-top-tracks", artistTopTracksRoutes);
app.use("/api/artist-albums", artistAlbumsRoutes);
app.use("/api/album-tracks", albumTracksRoutes);

app.use("/check-email", checkEmailRoutes);
app.use("/signup", signUpRoutes);
app.use("/signin", signInRoutes);
app.use("/signout", signOutRoutes);
app.use("/auth/send-otp", sendOtpRoutes);
app.use("/auth/verify-otp", singInWithOtpRoutes);
app.use("/auth/me", initialUserRoutes);

app.use("/create-playlist", createPlaylistRoutes);
app.use("/get-supabase-playlist", getPlaylistRoutes);
app.use("/delete-supabase-playlist", deletePlaylistRoutes);
app.use("/update-supabase-playlist", updatePlaylistRoutes);
app.use("/upload-playlist-image", uploadPlaylistImageRoutes);
app.use("/get-playlists-of-user", getPlaylistsOfUserRoutes);
app.use("/add-track-to-playlist", addTrackRoutes);
app.use("/delete-track", deleteTrackRoutes);
app.use("/delete-playlist-image", deletePlaylistImageRoutes);
app.use("/add-playlist", addPlaylistRoutes);
app.use("/delete-playlist-from-user", deletePlaylistFromUserRoutes);
app.use("/toggle-playlist-profile-status", togglePlaylistInProfileStatusRoutes);

app.use("/get-user-by-id", getUserByIdRoutes);
app.use("/upload-user-image", uploadUserImageRoutes);
app.use("/update-user-name", updateUserNameRoutes);
app.use("/delete-user-image", deleteUserImageRoutes);

app.use("/get-track", getTrackRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
