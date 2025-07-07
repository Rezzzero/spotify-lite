import { useDeletePlaylistModal } from "../model/useDeletePlaylistModal";

export const DeletePlaylistModal = ({
  closeModal,
  playlistName,
  ref,
}: {
  closeModal: () => void;
  playlistName: string | undefined;
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const { handleDeletePlaylist } = useDeletePlaylistModal(closeModal);
  return (
    <>
      <div className="bg-black/80 fixed inset-0 z-10" />
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 z-30 p-7 bg-white text-black rounded-md"
      >
        <h2 className="font-bold text-2xl">Удалить из медиатеки?</h2>
        <p className="text-sm max-w-[305px] pr-5">
          Контент (<b>{playlistName}</b>) будет удален из <b>медиатеки</b>.
        </p>
        <div className="flex justify-end gap-5 w-full">
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
              onClick={handleDeletePlaylist}
              className="font-bold cursor-pointer bg-green-400 px-4 py-2 rounded-full hover:bg-green-300"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
