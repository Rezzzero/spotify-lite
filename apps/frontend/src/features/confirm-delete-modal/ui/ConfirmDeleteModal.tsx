import { Modal, Box } from "@mui/material";
import { useConfirmDeleteModal } from "../model/useConfirmDeleteModal";
import { APP_NAME } from "@config/app.config";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: 0,
};

const titles = {
  playlist: "плейлист",
  album: "альбом",
  artist: "исполнителя",
};

export const ConfirmDeleteModal = ({
  name,
  isOpen,
  closeModal,
  isOwner,
  id,
  type,
}: {
  name: string | undefined;
  isOpen: boolean;
  closeModal: () => void;
  isOwner: boolean;
  id: string | undefined;
  type: "playlist" | "album" | "artist";
}) => {
  const { handleRemovePlaylist, handleRemoveAlbum, handleRemoveArtist } =
    useConfirmDeleteModal({
      isOwner,
      propId: id,
    });
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Box sx={modalBoxStyle}>
        <div className="flex flex-col gap-3 p-8 bg-white text-black rounded-lg">
          <h2 className="font-bold text-2xl">Удалить из медиатеки?</h2>
          <p className="text-sm max-w-[370px] pr-5 mb-4">
            {type === "playlist" && isOwner ? (
              <span>
                Контент (<b>{name}</b>) будет удален из <b>медиатеки</b>.
              </span>
            ) : (
              <span>
                Мы удалим {titles[type]} из <b>твоей медиатеки</b>, но его все
                ещё можно будет найти в {APP_NAME}
              </span>
            )}
          </p>
          <div className="flex justify-end gap-10 w-full">
            <button
              type="button"
              onClick={() => closeModal()}
              className="font-bold hover:scale-105 cursor-pointer"
            >
              Отмена
            </button>
            <div className="inline-block border-2 border-blue-700 p-[1px] hover:scale-105 rounded-full">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (type === "playlist") handleRemovePlaylist();
                  if (type === "album") handleRemoveAlbum();
                  if (type === "artist") handleRemoveArtist();
                  closeModal();
                }}
                className="font-bold cursor-pointer bg-green-400 px-8 py-3 rounded-full hover:bg-green-300"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
