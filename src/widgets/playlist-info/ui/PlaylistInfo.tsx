import { usePlaylistInfo } from "../model/usePlaylistInfo";
import PlaylistIcon from "@shared/assets/playlist/playlist-icon.svg?react";
import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import CompactListIcon from "@shared/assets/compact-list-icon.svg?react";
import { Link } from "react-router-dom";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { SelectLibraryFormat } from "@shared/ui/select-library-format/SelectLibraryFormat";
import { DeletePlaylistModal } from "../delete-modal/ui/DeletePlaylistModal";
import { EditPlaylistModal } from "../edit-modal/ui/EditPlaylistModal";
import { PlaylistMenuModal } from "../menu-modal/ui/PlaylistMenuModal";
import { AddTrackSearch } from "../add-track-search/ui/AddTrackSearch";

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
          className="flex items-center bg-zinc-800 rounded-md w-[232px] h-[232px] shadow-xl group"
        >
          <PlaylistIcon className="text-gray-400 w-15 h-15 ml-20 group-hover:hidden" />
          <button
            type="button"
            className="flex flex-col items-center gap-2 ml-16 hidden group-hover:block"
          >
            <EditIcon className="w-13 h-13 ml-7" />
            <p className="font-bold">Выбрать фото</p>
          </button>
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
          <div className="flex gap-1 mt-auto">
            <img
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt="playlist creator image"
              className="w-6 h-6 rounded-full"
            />
            <Link to={"/"} className="hover:underline">
              {playlistData
                ? playlistData.playlist.owner.display_name
                : "owner"}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full pl-5 pr-8 h-[700px] relative">
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
        {openSearch ? (
          <AddTrackSearch closeSearch={() => setOpenSearch(false)} />
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
