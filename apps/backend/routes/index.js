import popularTracksRoutes from "./spotify/popularTracks.js";
import popularArtistsRoutes from "./spotify/popularArtists.js";
import newReleasesRoutes from "./spotify/newReleases.js";
import searchRouter from "./spotify/search.js";
import artistRoutes from "./spotify/artist.js";
import albumRoutes from "./spotify/album.js";
import trackRoutes from "./spotify/track.js";
import discographyRoutes from "./spotify/discography.js";
import soundcloudSearchRoutes from "./soundcloud/search.js";
import streamRoutes from "./soundcloud/stream.js";
import artistTopTracksRoutes from "./spotify/artistTopTracks.js";
import artistAlbumsRoutes from "./spotify/artistAlbums.js";
import albumTracksRoutes from "./spotify/albumTracks.js";

import checkEmailRoutes from "./supabase/auth/checkEmail.js";
import signUpRoutes from "./supabase/auth/signUp.js";
import signInRoutes from "./supabase/auth/signIn.js";
import sendOtpRoutes from "./supabase/auth/sendOtp.js";
import singInWithOtpRoutes from "./supabase/auth/signInWithOtp.js";
import initialUserRoutes from "./supabase/auth/initialUser.js";
import signOutRoutes from "./supabase/auth/signOut.js";

import createPlaylistRoutes from "./supabase/playlist/createPlaylist.js";
import getPlaylistRoutes from "./supabase/playlist/getPlaylist.js";
import deletePlaylistRoutes from "./supabase/playlist/deletePlaylist.js";
import updatePlaylistRoutes from "./supabase/playlist/updatePlaylist.js";
import uploadPlaylistImageRoutes from "./supabase/playlist/uploadPlaylistImage.js";
import getPlaylistsOfUserRoutes from "./supabase/playlist/getPlaylistsOfUser.js";
import addTrackRoutes from "./supabase/playlist/addTrack.js";
import deleteTrackRoutes from "./supabase/playlist/deleteTrack.js";
import deletePlaylistImageRoutes from "./supabase/playlist/deletePlaylistImage.js";
import addPlaylistRoutes from "./supabase/playlist/addPlaylist.js";
import deletePlaylistFromUserRoutes from "./supabase/playlist/deletePlaylistFromUser.js";
import togglePlaylistInProfileStatusRoutes from "./supabase/playlist/togglePlaylistInProfileStatus.js";

import getUserByIdRoutes from "./supabase/user/getUserById.js";
import uploadUserImageRoutes from "./supabase/user/uploadUserImage.js";
import updateUserNameRoutes from "./supabase/user/updateUserName.js";
import deleteUserImageRoutes from "./supabase/user/deleteUserImage.js";
import subscribeUserRoutes from "./supabase/user/subscribe.js";
import unsubscribeUserRoutes from "./supabase/user/unsubscribe.js";

import getTrackRoutes from "./supabase/player/getTrack.js";

import subscribeArtistRoutes from "./supabase/artist/subscribe.js";
import unsubscribeArtistRoutes from "./supabase/artist/unsubscribe.js";
import getUserSubscriptionsRoutes from "./supabase/user/getUserSubscriptions.js";
import getUserFollowersRoutes from "./supabase/user/getUserFollowers.js";
import getOpenUserPlaylistsRoutes from "./supabase/user/getOpenUserPlaylists.js";

import getUsersMediaLibraryRoutes from "./supabase/media-library/getUsersMediaLibrary.js";

import addAlbumToUserRoutes from "./supabase/album/addAlbumToUser.js";
import deleteAlbumFromUserRoutes from "./supabase/album/deleteAlbumFromUser.js";

import testAddAlbumRoutes from "./supabase/album/testAddAlbum.js";

export default [
  ["/api/popular-tracks", popularTracksRoutes],
  ["/api/popular-artists", popularArtistsRoutes],
  ["/api/new-releases", newReleasesRoutes],
  ["/api/search", searchRouter],
  ["/api/artist", artistRoutes],
  ["/api/album", albumRoutes],
  ["/api/track", trackRoutes],
  ["/api/discography", discographyRoutes],
  ["/api/soundcloud-search", soundcloudSearchRoutes],
  ["/api/soundcloud-stream", streamRoutes],
  ["/api/artist-top-tracks", artistTopTracksRoutes],
  ["/api/artist-albums", artistAlbumsRoutes],
  ["/api/album-tracks", albumTracksRoutes],
  ["/check-email", checkEmailRoutes],
  ["/signup", signUpRoutes],
  ["/signin", signInRoutes],
  ["/signout", signOutRoutes],
  ["/auth/send-otp", sendOtpRoutes],
  ["/auth/verify-otp", singInWithOtpRoutes],
  ["/auth/me", initialUserRoutes],
  ["/create-playlist", createPlaylistRoutes],
  ["/get-supabase-playlist", getPlaylistRoutes],
  ["/delete-supabase-playlist", deletePlaylistRoutes],
  ["/update-supabase-playlist", updatePlaylistRoutes],
  ["/upload-playlist-image", uploadPlaylistImageRoutes],
  ["/get-media-library-of-user", getUsersMediaLibraryRoutes],
  ["/get-playlists-of-user", getPlaylistsOfUserRoutes],
  ["/add-track-to-playlist", addTrackRoutes],
  ["/delete-track", deleteTrackRoutes],
  ["/delete-playlist-image", deletePlaylistImageRoutes],
  ["/add-playlist", addPlaylistRoutes],
  ["/delete-playlist-from-user", deletePlaylistFromUserRoutes],
  ["/toggle-playlist-profile-status", togglePlaylistInProfileStatusRoutes],
  ["/get-user-by-id", getUserByIdRoutes],
  ["/upload-user-image", uploadUserImageRoutes],
  ["/update-user-name", updateUserNameRoutes],
  ["/delete-user-image", deleteUserImageRoutes],
  ["/subscribe-user", subscribeUserRoutes],
  ["/unsubscribe-user", unsubscribeUserRoutes],
  ["/get-track", getTrackRoutes],
  ["/subscribe-artist", subscribeArtistRoutes],
  ["/unsubscribe-artist", unsubscribeArtistRoutes],
  ["/get-user-subscriptions", getUserSubscriptionsRoutes],
  ["/get-user-followers", getUserFollowersRoutes],
  ["/get-open-user-playlists", getOpenUserPlaylistsRoutes],
  ["/add-album-to-user", addAlbumToUserRoutes],
  ["/remove-album-from-user", deleteAlbumFromUserRoutes],
  ["/test-add-album", testAddAlbumRoutes],
];
