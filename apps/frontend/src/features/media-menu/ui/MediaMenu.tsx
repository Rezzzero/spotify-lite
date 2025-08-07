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
import SubscibeIcon from "@shared/assets/subscribe-icon.svg?react";
import { useMediaMenu } from "../model/useMediaMenu";
import { PlaylistData } from "@widgets/playlist-info/types/types";
import { Popper } from "@mui/material";
import { AddToPlaylistMenu } from "@features/add-to-playlist-menu/ui/AddToPlaylistMenu";
import { TablesTrack, Track } from "@shared/types/types";
import { useTrackCard } from "@features/track-card/model/useTrackCard";
import CrossIcon from "@shared/assets/cross-icon.svg?react";

interface MediaMenuProps {
  menuRef: React.RefObject<HTMLDivElement | null>;
  isOwner?: boolean;
  isPublic?: boolean;
  closeMenu: () => void;
  isInProfile?: boolean;
  setPlaylist?: React.Dispatch<React.SetStateAction<PlaylistData | null>>;
  openEditMenu?: () => void;
  mediaType: string;
  track?: Track | TablesTrack;
  propId?: string;
  mediaName?: string;
  openedFromMediaLibary: boolean;
  onOpenDeleteModal?: () => void;
}

const buttonClass =
  "flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs";

const MediaNames = {
  playlist: {
    copy: "Копировать ссылку на плейлист",
    edit: "Изменение сведений",
  },
  track: {
    copy: "Скопировать ссылку на трек",
  },
  album: {
    copy: "Скопировать ссылку на альбом",
  },
  user: {
    copy: "Копировать ссылку на профиль",
    edit: "Изменение профиля",
  },
  artist: {
    copy: "Копировать ссылку на исполнителя",
  },
} as {
  [key: string]: { [key: string]: string };
};

export const MediaMenu = ({
  menuRef,
  isOwner,
  isPublic,
  closeMenu,
  isInProfile,
  mediaType,
  setPlaylist,
  openEditMenu,
  track,
  propId,
  openedFromMediaLibary,
  onOpenDeleteModal,
}: MediaMenuProps) => {
  const {
    playlists,
    albums,
    userToArtistsSubs,
    userToUsersSubs,
    isPlaylistInProfile,
    handleAddToMediaLibrary,
    handleRemoveFromMediaLibrary,
    currentId,
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
    handleSubscribeArtist,
    handleUnsubscribeArtist,
  } = useMediaMenu({
    closeMenu,
    isInProfile,
    isPublic,
    setPlaylist,
    mediaType,
    propId,
  });
  const { handleAddTrackToPlaylist } = useTrackCard({ track });

  const mediaList = mediaType === "playlist" ? playlists : albums;
  const isItemInList = mediaList.some((item) => item.id === currentId);
  const canShowProfileButton = isPublic && isItemInList;

  const shouldShowLibraryButtons =
    !isOwner &&
    mediaType !== "artist" &&
    mediaType !== "track" &&
    mediaType !== "user";
  const shouldShowAddToPlaylist =
    track && (mediaType === "album" || mediaType === "track");
  const shouldShowSubscibeButton =
    !isOwner && (mediaType === "user" || mediaType === "artist");

  const subList = mediaType === "artist" ? userToArtistsSubs : userToUsersSubs;

  const isSubscribed = subList.some((sub) => sub.id === currentId);

  const editBtnName = MediaNames[mediaType].edit;
  const copyBtnName = MediaNames[mediaType].copy;
  return (
    <>
      <div ref={menuRef} className=" w-[330px] rounded-sm bg-[#2d2d2e] p-1">
        {canShowProfileButton && setPlaylist && (
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => togglePlaylistInProfileStatus()}
              className={buttonClass}
            >
              <ProfileIcon className="w-4 h-4" />
              {isPlaylistInProfile
                ? "Удалить из профиля"
                : "Добавить в профиль"}
            </button>
          </div>
        )}
        <div className="flex flex-col gap-1 border-y border-zinc-600">
          {isOwner && (
            <>
              {openEditMenu && (
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    openEditMenu();
                  }}
                  className={buttonClass}
                >
                  <EditIcon className="w-4 h-4" />
                  {editBtnName}
                </button>
              )}
              {isOwner && onOpenDeleteModal && mediaType === "playlist" && (
                <button
                  type="button"
                  onClick={(e) => {
                    if (openedFromMediaLibary) {
                      e.stopPropagation();
                    }
                    onOpenDeleteModal();
                    closeMenu();
                  }}
                  className={buttonClass}
                >
                  <DeleteIcon className="w-4 h-4" />
                  Удалить
                </button>
              )}
            </>
          )}
          {shouldShowSubscibeButton && (
            <button
              type="button"
              onClick={(e) => {
                if (isSubscribed) {
                  if (openedFromMediaLibary && onOpenDeleteModal) {
                    e.stopPropagation();
                    onOpenDeleteModal();
                    closeMenu();
                  } else {
                    handleUnsubscribeArtist();
                  }
                } else {
                  handleSubscribeArtist();
                }
              }}
              className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
            >
              {isSubscribed ? (
                <CrossIcon className="w-3 h-3 text-green-400" />
              ) : (
                <SubscibeIcon className="w-4 h-4" />
              )}
              {isSubscribed ? "Отписаться" : "Подписаться"}
            </button>
          )}
          {shouldShowLibraryButtons &&
            (isItemInList ? (
              <button
                type="button"
                onClick={(e) => {
                  if (openedFromMediaLibary && onOpenDeleteModal) {
                    e.stopPropagation();
                    onOpenDeleteModal();
                    closeMenu();
                  } else {
                    handleRemoveFromMediaLibrary(mediaType);
                  }
                }}
                className={buttonClass}
              >
                <PlaylistInMediaLibraryIcon className="w-4 h-4" />
                Удалить из медиатеки
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleAddToMediaLibrary(mediaType)}
                className={buttonClass}
              >
                <AddToMediaLibraryIcon className="w-4 h-4" />
                Добавить в медиатеку
              </button>
            ))}
        </div>
        {isOwner && mediaType === "playlist" && (
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
        {mediaType === "user" ? (
          <button
            type="button"
            onClick={() => handleCopyLink()}
            className="flex items-center gap-3 p-2 w-full text-sm hover:bg-zinc-600 rounded-xs"
          >
            <CopyIcon className="w-4 h-4" />
            {copyBtnName}
          </button>
        ) : (
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
                  <p className="text-sm">{copyBtnName}</p>
                </button>
              </div>
            </Popper>
          </div>
        )}
      </div>
    </>
  );
};
