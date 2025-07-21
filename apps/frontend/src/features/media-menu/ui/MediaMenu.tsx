import EditIcon from "@shared/assets/playlist/edit-icon.svg?react";
import DeleteIcon from "@shared/assets/playlist/delete-icon.svg?react";
import OpenPlaylistIcon from "@shared/assets/global-icon.svg?react";
import ClosePlaylistIcon from "@shared/assets/playlist/lock-icon.svg?react";
import AddToMediaLibraryIcon from "@shared/assets/playlist/add-to-media-library-icon.svg?react";
import PlaylistInMediaLibraryIcon from "@shared/assets/playlist/playlist-in-media-library-icon.svg?react";
import CopyIcon from "@shared/assets/copy-icon.svg?react";
import ShareIcon from "@shared/assets/playlist/share-icon.svg?react";
import ProfileIcon from "@shared/assets/user-icon.svg?react";
import PlusIcon from "@shared/assets/plus-icon.svg?react";
import { useMediaMenu } from "../model/useMediaMenu";
import { PlaylistData } from "@widgets/playlist-info/types/types";
import { Popper } from "@mui/material";
import { AddToPlaylistMenu } from "@features/add-to-playlist-menu/ui/AddToPlaylistMenu";
import { TablesTrack, Track } from "@shared/types/types";
import { useTrackCard } from "@features/track-card/model/useTrackCard";

interface MediaMenuProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  isOwner?: boolean;
  isPublic?: boolean;
  closeMenu: () => void;
  isInProfile?: boolean;
  setPlaylist?: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
  openEditMenu?: () => void;
  openDeleteModal?: () => void;
  mediaType: string;
  track?: Track | TablesTrack;
}

const buttonClass =
  "flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs";

export const MediaMenu = ({
  menuRef,
  isOwner,
  isPublic,
  closeMenu,
  isInProfile,
  mediaType,
  setPlaylist,
  openEditMenu,
  openDeleteModal,
  track,
}: MediaMenuProps) => {
  const {
    playlists,
    isPlaylistInProfile,
    handleRemovePlaylistFromMediaLibrary,
    id,
    handleAddPlaylistToMediaLibrary,
    togglePlaylistInProfileStatus,
    handleChangePublicStatus,
    handleCopyLink,
    handleShareMouseLeave,
    handleShareMouseEnter,
    handleAddToPlaylitMouseEnter,
    handleAddToPlaylistMouseLeave,
    shareModal,
    shareAnchor,
    shareModalRef,
    isAddToMediaLibraryOpen,
    addToPlaylistAnchor,
    addToMediaLibraryRef,
  } = useMediaMenu({
    closeMenu,
    isInProfile,
    isPublic,
    setPlaylist,
    mediaType,
  });
  const { handleAddTrackToPlaylist } = useTrackCard({ track });

  const isPlaylistInList = playlists.some((playlist) => playlist.id === id);
  const canShowProfileButton = isPublic && isPlaylistInList;

  const isPlaylistInLibrary = playlists.some((playlist) => playlist.id === id);
  const shouldShowLibraryButtons =
    !isOwner && mediaType !== "artist" && mediaType !== "track";
  const shouldShowAddToPlaylist =
    track && (mediaType === "album" || mediaType === "track");

  return (
    <div ref={menuRef} className=" w-[330px] rounded-sm bg-[#2d2d2e] p-1">
      {canShowProfileButton && setPlaylist && (
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => togglePlaylistInProfileStatus()}
            className={buttonClass}
          >
            <ProfileIcon className="w-4 h-4" />
            {isPlaylistInProfile ? "Удалить из профиля" : "Добавить в профиль"}
          </button>
        </div>
      )}
      <div className="flex flex-col gap-1 border-y border-zinc-600">
        {isOwner && openEditMenu && openDeleteModal && (
          <>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                openEditMenu();
              }}
              className={buttonClass}
            >
              <EditIcon className="w-4 h-4" />
              Изменение сведений
            </button>
            <button
              type="button"
              onClick={() => openDeleteModal()}
              className={buttonClass}
            >
              <DeleteIcon className="w-4 h-4" />
              Удалить
            </button>
          </>
        )}
        {shouldShowLibraryButtons &&
          (isPlaylistInLibrary ? (
            <button
              type="button"
              onClick={() => handleRemovePlaylistFromMediaLibrary()}
              className={buttonClass}
            >
              <PlaylistInMediaLibraryIcon className="w-4 h-4" />
              Удалить из медиатеки
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleAddPlaylistToMediaLibrary()}
              className={buttonClass}
            >
              <AddToMediaLibraryIcon className="w-4 h-4" />
              Добавить в медиатеку
            </button>
          ))}
      </div>
      {isOwner && (
        <div className="flex flex-col gap-1 border-b border-zinc-600">
          <button
            type="button"
            onClick={() => handleChangePublicStatus()}
            className={buttonClass}
          >
            {isPublic ? (
              <ClosePlaylistIcon className="w-4 h-4" />
            ) : (
              <OpenPlaylistIcon className="w-4 h-4" />
            )}
            {isPublic ? "Закрыть доступ" : "Сделать открытым"}
          </button>
        </div>
      )}
      {shouldShowAddToPlaylist && (
        <div className="flex flex-col gap-1 border-y border-zinc-600">
          <button
            onMouseEnter={(e) => handleAddToPlaylitMouseEnter(e)}
            onMouseLeave={handleAddToPlaylistMouseLeave}
            className={buttonClass}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Добавить в плейлист
          </button>
          <Popper
            open={isAddToMediaLibraryOpen}
            anchorEl={addToPlaylistAnchor}
            placement="right-start"
            container={menuRef.current}
          >
            <AddToPlaylistMenu
              ref={addToMediaLibraryRef}
              handleMouseEnter={handleAddToPlaylitMouseEnter}
              handleMouseLeave={handleAddToPlaylistMouseLeave}
              handleAddTrackToPlaylist={handleAddTrackToPlaylist}
              track={track}
              closeMenu={closeMenu}
            />
          </Popper>
        </div>
      )}
      <div
        onMouseEnter={(e) => handleShareMouseEnter(e)}
        onMouseLeave={() => handleShareMouseLeave()}
      >
        <button type="button" className={buttonClass}>
          <ShareIcon className="w-4 h-4" />
          Поделиться
        </button>
        <Popper
          open={shareModal}
          anchorEl={shareAnchor}
          placement="right"
          container={menuRef.current}
        >
          <div
            ref={shareModalRef}
            className="bg-[#2d2d2e] rounded-xs p-1 cursor-default"
          >
            <button
              onClick={() => {
                handleCopyLink();
              }}
              className="flex gap-2 items-center px-3 py-2 hover:bg-zinc-600 rounded-xs"
            >
              <CopyIcon className="w-4 h-4" />
              <p className="text-sm">Копировать ссылку на плейлист</p>
            </button>
          </div>
        </Popper>
      </div>
    </div>
  );
};
