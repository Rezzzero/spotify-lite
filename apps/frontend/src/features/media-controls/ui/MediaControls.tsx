import ListenPlaylistIcon from "@shared/assets/play-icon.svg?react";
import PausePlaylistIcon from "@shared/assets/playlist/pause-icon.svg?react";
import PlaylistInMediaLibraryIcon from "@shared/assets/playlist/playlist-in-media-library-icon.svg?react";
import AddToMediaLibraryIcon from "@shared/assets/playlist/add-to-media-library-icon.svg?react";
import MenuIcon from "@shared/assets/menu-icon.svg?react";
import CompactListIcon from "@shared/assets/compact-list-icon.svg?react";
import ListIcon from "@shared/assets/drop-down/list-icon.svg?react";
import { CustomTooltip } from "@shared/ui/tooltip/CustomTooltip";
import { useMediaControls } from "../model/useMediaControls";
import { Album, Playlist, Track } from "@shared/types/types";
import { SupabasePlaylist } from "@shared/types/playlist";
import React from "react";

interface MediaControlsProps {
  isOwner: boolean;
  mediaData:
    | SupabasePlaylist
    | (Playlist & { duration: number })
    | Album
    | undefined;
  isPlaying: boolean;
  format: string;
  tracks: Track[];
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
  changeFormatButtonRef: React.RefObject<HTMLButtonElement | null>;
  onPlay: () => void;
  onAddToLibrary: () => void;
  onRemoveFromLibrary: () => void;
  onOpenMenu: (e: React.MouseEvent<HTMLElement | null>) => void;
  onOpenFormatModal: (e: React.MouseEvent<HTMLElement | null>) => void;
}

export const MediaControls = ({
  isOwner,
  mediaData,
  isPlaying,
  format,
  tracks,
  menuButtonRef,
  changeFormatButtonRef,
  onPlay,
  onAddToLibrary,
  onRemoveFromLibrary,
  onOpenMenu,
  onOpenFormatModal,
}: MediaControlsProps) => {
  const { playlists } = useMediaControls();
  return (
    <>
      <div className="flex items-center pt-7 pb-10 justify-between w-full">
        <div className="flex items-center gap-4">
          {tracks.length > 0 && (
            <CustomTooltip
              title={
                isPlaying
                  ? `Поставить на паузу плейлист ${mediaData?.name}`
                  : `Слушать плейлист ${mediaData?.name}`
              }
              placement="top"
              customFontSize={13}
            >
              <button type="button" onClick={() => onPlay()}>
                {isPlaying ? (
                  <PausePlaylistIcon className="w-12 h-12 text-green-500 hover:text-green-400 cursor-pointer hover:scale-105" />
                ) : (
                  <ListenPlaylistIcon className="w-12 h-12 text-green-500 hover:text-green-400 cursor-pointer hover:scale-105" />
                )}
              </button>
            </CustomTooltip>
          )}
          {!isOwner &&
            (playlists.find((p) => p.id === mediaData?.id) ? (
              <CustomTooltip
                title={`Удалить из медиатеки`}
                placement="top"
                customFontSize={13}
              >
                <button type="button" onClick={() => onRemoveFromLibrary()}>
                  <PlaylistInMediaLibraryIcon className="w-7 h-7 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
                </button>
              </CustomTooltip>
            ) : (
              <CustomTooltip
                title={`Добавить в медиатеку`}
                placement="top"
                customFontSize={13}
              >
                <button type="button" onClick={() => onAddToLibrary()}>
                  <AddToMediaLibraryIcon className="w-7 h-7 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
                </button>
              </CustomTooltip>
            ))}

          <CustomTooltip
            title={`Открыть контекстное меню: ${mediaData?.name}`}
            placement="top"
            customFontSize={13}
          >
            <button
              ref={menuButtonRef}
              type="button"
              onClick={(e) => onOpenMenu(e)}
            >
              <MenuIcon className="w-10 h-10 text-gray-400 hover:text-white cursor-pointer hover:scale-105" />
            </button>
          </CustomTooltip>
        </div>
        <button
          type="button"
          ref={changeFormatButtonRef}
          onClick={(e) => onOpenFormatModal(e)}
          className="flex gap-2 text-sm font-semibold items-center text-gray-400 group hover:text-white cursor-pointer"
        >
          {format === "compact" ? (
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
    </>
  );
};
