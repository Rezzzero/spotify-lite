import { Link } from "react-router-dom";
import { useUserPlaylistsInfo } from "../model/useUserPlaylistsInfo";

export const UserPlaylistsInfo = () => {
  const { openedPlaylists } = useUserPlaylistsInfo();
  return (
    <div className="flex flex-col gap-5 px-3 pt-18">
      <h1 className="text-3xl font-bold px-2 mb-3">Открытые плейлисты</h1>
      <div className="flex gap-3">
        {openedPlaylists?.map((playlist) => (
          <Link
            to={`/playlist/${playlist.id}`}
            key={playlist.id}
            className="flex flex-col gap-2 hover:bg-[#242426] cursor-pointer p-2 rounded-md"
          >
            <img
              key={playlist.id}
              className="w-[175px] h-[175px] rounded-md"
              src={playlist.images[0].url}
            />
            <p className="font-normal hover:underline">{playlist.name}</p>
            <p className="text-gray-400">{playlist.owner?.display_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
