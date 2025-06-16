import { Album, Artist, Track } from "@shared/types/types";
import { Link } from "react-router-dom";
import ShowMoreIcon from "@shared/assets/arrow-next.svg?react";

type SearchCardType = Artist | Album | Track;

const isArtist = (item: SearchCardType): item is Artist => {
  return (item as Artist).type === "artist";
};

const isAlbum = (item: SearchCardType): item is Album => {
  return (item as Album).album_type !== undefined;
};

const isTrack = (item: SearchCardType): item is Track => {
  return (item as Track).duration_ms !== undefined;
};

export const PlaylistSearchCard = ({
  data,
  handleAddTrack,
  handleShowArtist,
  handleShowAlbum,
}: {
  data: SearchCardType;
  handleAddTrack?: (track: Track) => void;
  handleShowArtist?: (artistId: string) => void;
  handleShowAlbum?: (albumId: string) => void;
}) => {
  let title = "";
  let subtitle = "";
  let imageUrl = "";

  if (isArtist(data)) {
    title = data.name;
    subtitle = "Исполнитель";
    imageUrl = data.images?.[0]?.url || "";
  }

  if (isAlbum(data)) {
    title = data.name;
    subtitle = "Альбом";
    imageUrl = data.images?.[0]?.url || "";
  }

  if (isTrack(data)) {
    title = data.name;
    imageUrl = data.album?.images?.[0]?.url || "";
  }

  const hasArtists = isAlbum(data) || isTrack(data);

  return (
    <div
      onClick={() => {
        if (handleShowArtist) {
          handleShowArtist(data.id);
        }
        if (handleShowAlbum) {
          handleShowAlbum(data.id);
        }
      }}
      className={`${
        isTrack(data) ? "grid grid-cols-[2fr_1fr_auto]" : "flex justify-between"
      } items-center group hover:bg-zinc-800 p-2 rounded-md`}
    >
      <div className="flex gap-3">
        <img
          src={imageUrl}
          alt={title}
          className={`w-12 h-12 ${
            isArtist(data) ? "rounded-full" : "rounded-md"
          }`}
        />
        <div>
          <h1>{title}</h1>
          {subtitle === "" && hasArtists ? (
            <div className="flex text-gray-400 flex-wrap">
              {data.artists.map((artist, index) => (
                <div key={artist.id} className="flex items-center">
                  <Link
                    to={`/artist/${artist.id}`}
                    className="text-sm font-semibold hover:underline"
                  >
                    {artist.name}
                  </Link>
                  {index < data.artists.length - 1 && <span>,&nbsp;</span>}
                </div>
              ))}
            </div>
          ) : (
            <p>{subtitle}</p>
          )}
        </div>
      </div>
      {isTrack(data) && (
        <Link
          to={`/album/${data.album.id}`}
          className="text-sm text-gray-400 group-hover:text-white hover:underline"
        >
          {data.album.name}
        </Link>
      )}
      {isTrack(data) && handleAddTrack && (
        <button
          type="button"
          onClick={() => handleAddTrack(data)}
          className="rounded-full text-sm font-bold border border-gray-400 px-4 py-1 mr-1 cursor-pointer hover:border-white hover:scale-105"
        >
          Добавить
        </button>
      )}
      {isAlbum(data) || isArtist(data) ? (
        <button>
          <ShowMoreIcon className="w-5 h-5 mr-2" />
        </button>
      ) : null}
    </div>
  );
};
