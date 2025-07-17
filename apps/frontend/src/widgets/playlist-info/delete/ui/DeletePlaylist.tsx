import { useDeletePlaylist } from "../model/useDeletePlaylist";

export const DeletePlaylist = ({
  closeModal,
  playlistName,
}: {
  closeModal: () => void;
  playlistName: string | undefined;
}) => {
  const { handleDeletePlaylist } = useDeletePlaylist(closeModal);
  return (
    <div className="flex flex-col gap-3 p-7 bg-white text-black rounded-md">
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
  );
};
