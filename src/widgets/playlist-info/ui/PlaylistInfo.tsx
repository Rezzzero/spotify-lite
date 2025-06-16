import { usePlaylistInfo } from "../model/usePlaylistInfo";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import CompactListIcon from "@shared/assets/compact-list-icon.svg?react";
import ClockIcon from "@shared/assets/clock-icon.svg?react";
import { Link } from "react-router-dom";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { SelectLibraryFormat } from "@shared/ui/select-library-format/SelectLibraryFormat";
import { DeletePlaylistModal } from "../delete-modal/ui/DeletePlaylistModal";
import { EditPlaylistModal } from "../edit-modal/ui/EditPlaylistModal";
import { PlaylistMenuModal } from "../menu-modal/ui/PlaylistMenuModal";
import { AddTrackSearch } from "../add-track-search/ui/AddTrackSearch";
import { PlaylistTrackCard } from "../playlist-track-card/ui/PlaylistTrackCard";
import { formatMsToMinutesAndSeconds } from "@shared/lib/format/msToMinutesAndSeconds";
import { PLACEHOLDER_URL } from "@shared/constants/urls";

export const PlaylistInfo = () => {
  const {
    playlistData,
    setPlaylistData,
    imageColors,
    openSearch,
    setOpenSearch,
    menuModal,
    setMenuModal,
    menuModalRef,
    menuButtonRef,
    editModal,
    setEditModal,
    editModalRef,
    loading,
    changeFormatModal,
    setChangeFormatModal,
    changeFormatModalRef,
    playlistFormat,
    setPlaylistFormat,
    changeFormatButtonRef,
    deletePlaylistModal,
    setDeletePlaylistModal,
    tracks,
    setTracks,
    handleUpdateDuration,
  } = usePlaylistInfo();
  const headerGradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]}, ${imageColors[1]})`
    : "linear-gradient(to bottom, #333, #222)";

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <div
        style={{ background: headerGradient }}
        className="flex items-center gap-7 p-7"
      >
        <div
          onClick={() => setEditModal((prev) => !prev)}
          className="flex items-center bg-zinc-900 rounded-md w-[232px] h-[232px] shadow-xl group relative"
        >
          <img
            src={
              playlistData?.playlist.images[0]?.url ||
              playlistData?.imageUrl ||
              PLACEHOLDER_URL
            }
            alt="playlist image"
            className={`w-full h-full object-cover rounded-md ${
              playlistData?.playlist.images[0]?.url || playlistData?.imageUrl
                ? "group-hover:opacity-20"
                : "group-hover:opacity-0"
            } transition-opacity duration-200`}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <EditIcon className="w-13 h-13" />
            <p className="font-bold">Выбрать фото</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-12 h-full">
          <h2>
            {playlistData?.playlist?.public
              ? "Открытый плейлист"
              : "Закрытый плейлист"}
          </h2>
          <h1 className="text-[90px] font-bold leading-none">
            {playlistData?.playlist?.name}
          </h1>
          <div className="flex items-center gap-1 mt-auto">
            <img
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt="playlist creator image"
              className="w-6 h-6 rounded-full"
            />
            <Link to={"/"} className="font-bold text-sm hover:underline">
              {playlistData
                ? playlistData.playlist.owner.display_name
                : "owner"}
            </Link>
            {playlistData?.playlist?.duration && tracks.length > 0 && (
              <p className="font-semibold opacity-70 text-sm pb-1">
                <span className="text-xl font-bold relative top-[1px] mx-1">
                  ·
                </span>
                {tracks.length} треков,{" "}
                {formatMsToMinutesAndSeconds(
                  playlistData?.playlist?.duration,
                  true
                )}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full pl-5 pr-8 relative">
        <div className="flex items-center pt-7 pb-10 justify-between w-full">
          <CustomTooltip
            title={`Открыть контекстное меню: ${playlistData?.playlist.name}`}
            placement="top"
            customFontSize={13}
          >
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuModal((prev) => !prev)}
            >
              <MenuIcon className="w-10 h-10 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
            </button>
          </CustomTooltip>
          <button
            type="button"
            ref={changeFormatButtonRef}
            onClick={() => setChangeFormatModal((prev) => !prev)}
            className="flex gap-2 text-sm font-semibold items-center text-gray-400 group hover:text-white cursor-pointer"
          >
            {playlistFormat === "compact" ? (
              <>
                <span>Компактный</span>
                <CompactListIcon className="w-3 h-3 text-gray-400 group-hover:text-white" />
              </>
            ) : (
              <>
                <span>Список</span>
                <ListIcon className="w-3 h-3 text-gray-400 group-hover:text-white" />
              </>
            )}
          </button>
        </div>
        {tracks.length > 0 && (
          <div className="flex flex-col gap-2">
            <div
              className={`grid ${
                playlistFormat === "compact"
                  ? "grid-cols-[30px_2fr_1fr_1fr_1fr_auto]"
                  : "grid-cols-[30px_2fr_1fr_1fr_auto]"
              } px-5 pr-9 py-2 border-b border-zinc-700`}
            >
              <span>#</span>
              <span>Название</span>
              {playlistFormat === "compact" && <span>Исполнитель</span>}
              <span>Альбом</span>
              <span>Дата добавления</span>
              <ClockIcon className="w-5 h-5 mr-1" />
            </div>
            <div>
              {tracks.map((track, index) => (
                <PlaylistTrackCard
                  key={track.id}
                  track={track}
                  index={index}
                  libraryFormat={playlistFormat}
                  setTracks={setTracks}
                  handleUpdateDuration={handleUpdateDuration}
                />
              ))}
            </div>
          </div>
        )}
        {openSearch ? (
          <AddTrackSearch
            closeSearch={() => setOpenSearch(false)}
            setTracks={setTracks}
            handleUpdateDuration={handleUpdateDuration}
          />
        ) : (
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={() => setOpenSearch(true)}
              className="font-bold text-sm"
            >
              Еще
            </button>
          </div>
        )}
        {menuModal && (
          <PlaylistMenuModal
            modalRef={menuModalRef}
            closeModal={() => setMenuModal(false)}
            openEditModal={() => setEditModal(true)}
            openDeleteModal={() => setDeletePlaylistModal(true)}
            isPublic={playlistData?.playlist.public}
            setPlaylist={setPlaylistData}
          />
        )}
        {changeFormatModal && (
          <div
            ref={changeFormatModalRef}
            className="absolute top-18 right-5 bg-zinc-800 p-1 rounded-md"
          >
            <SelectLibraryFormat
              libraryFormat={playlistFormat}
              setLibraryFormat={setPlaylistFormat}
              playlist
            />
          </div>
        )}
      </div>
      {editModal && (
        <EditPlaylistModal
          editModalRef={editModalRef}
          closeModal={() => setEditModal(false)}
          playlistName={playlistData?.playlistName}
          playlistDescription={playlistData?.playlistDescription}
          playlistImage={
            playlistData?.playlist.images[0]?.url ||
            playlistData?.imageUrl ||
            PLACEHOLDER_URL
          }
          setPlaylist={setPlaylistData}
        />
      )}
      {deletePlaylistModal && (
        <DeletePlaylistModal
          playlistName={playlistData?.playlistName}
          closeModal={() => setDeletePlaylistModal(false)}
        />
      )}
    </div>
  );
};
