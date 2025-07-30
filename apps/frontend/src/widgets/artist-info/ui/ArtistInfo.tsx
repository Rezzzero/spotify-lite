import { Link } from "react-router-dom";
import { CardList } from "@shared/ui/card-list/CardList";
import { useArtistInfo } from "../model/useArtistInfo";
import { artistMusicFilterList } from "@shared/constants/constants";
import { Loader } from "@shared/ui/loader/Loader";
import { ArtistInfoTrackCard } from "../artist-info-track-card/ui/ArtistInfoTrackCard";
import { MediaHeader } from "@shared/ui/media-header/MediaHeader";
import { MediaControls } from "@features/media-controls/ui/MediaControls";
import { Popper } from "@mui/material";
import { MediaMenu } from "@features/media-menu/ui/MediaMenu";

export const ArtistInfo = () => {
  const {
    artistInfo,
    imageColors,
    handleChangeFilter,
    selectedFilter,
    filtredAlbumsAndSingles,
    loading,
    isPlaying,
    handleListenPlaylist,
    menuModal,
    setMenuModal,
    menuModalRef,
    menuButtonRef,
    menuAnchor,
    handleOpenMenu,
    handleSubscribe,
    handleUnsubscribe,
    isSubscribed,
  } = useArtistInfo();
  if (loading || !artistInfo)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-col">
      <MediaHeader
        imageColors={imageColors}
        mainImage={artistInfo.artist.images[0].url}
        mainName={artistInfo.artist.name}
        roundedFull={true}
      />
      <div className="flex flex-col px-5 mb-10">
        <MediaControls
          mediaId={artistInfo.artist.id}
          mediaName={artistInfo.artist.name}
          isOwner={false}
          tracks={artistInfo.topTracks}
          menuButtonRef={menuButtonRef}
          isPlaying={isPlaying}
          onOpenMenu={(e) => handleOpenMenu(e)}
          onPlay={() => handleListenPlaylist()}
          handleSub={handleSubscribe}
          handleUnsub={handleUnsubscribe}
          isSubscribed={isSubscribed}
          type="artist"
        />
        <Popper open={menuModal} anchorEl={menuAnchor} placement="bottom-start">
          <MediaMenu
            menuRef={menuModalRef}
            closeMenu={() => setMenuModal(false)}
            mediaType="artist"
          />
        </Popper>
        <h2 className="text-2xl font-bold mb-5">Популярные треки</h2>
        <div className="flex flex-col w-[70%]">
          {artistInfo.topTracks.map((track, index) => (
            <ArtistInfoTrackCard
              key={track.id}
              track={track}
              index={index}
              format="list"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 px-3 mb-10">
        <div className="flex justify-between pl-2 px-3">
          <Link
            to={`/artist/${artistInfo.artist.id}/discography/${selectedFilter}`}
            className="text-2xl font-bold hover:underline"
          >
            Музыка
          </Link>
          <Link
            to={`/artist/${artistInfo.artist.id}/discography/${selectedFilter}`}
            className="text-[#bababa] font-bold text-sm hover:underline"
          >
            Показать все
          </Link>
        </div>
        <div className="flex gap-2 px-2">
          {Object.values(artistMusicFilterList).map(
            (filter: { name: string; path: string }) => (
              <button
                key={filter.name}
                type="button"
                className={`px-3 py-1 rounded-full ${
                  selectedFilter === filter.path
                    ? "bg-white text-black"
                    : "bg-[#29292b] hover:bg-[#333336]"
                } cursor-pointer`}
                onClick={() => handleChangeFilter(filter.path)}
              >
                {filter.name}
              </button>
            )
          )}
        </div>
        <CardList
          items={filtredAlbumsAndSingles.slice(0, 8)}
          itemType="album"
        />
      </div>
      <div className="flex flex-col gap-3 px-3">
        <div className="flex justify-between pl-2 px-3">
          <h2 className="text-2xl font-bold">В плейлистах и альбомах</h2>
          <Link
            to={`/artist/${artistInfo.artist.id}/discovered-on`}
            className="text-[#bababa] font-bold text-sm hover:underline"
          >
            Показать все
          </Link>
        </div>
        <CardList
          items={artistInfo.playlists
            .filter((playlist) => playlist !== null)
            .slice(0, 8)}
          itemType="playlist"
        />
      </div>
      {artistInfo.otherArtists.length > 0 && (
        <div className="flex flex-col gap-2 px-3">
          <h2 className="text-2xl font-bold px-2">Коллаборации с артистами</h2>
          <CardList
            items={artistInfo.otherArtists.slice(0, 8)}
            itemType="artist"
          />
        </div>
      )}
      {artistInfo.moreWithArtist.length > 0 && (
        <div className="flex flex-col gap-2 px-3">
          <h2 className="text-2xl font-bold px-2">Ещё с этим исполнителем</h2>
          <CardList
            items={artistInfo.moreWithArtist.slice(0, 8)}
            itemType="album"
          />
        </div>
      )}
    </div>
  );
};
