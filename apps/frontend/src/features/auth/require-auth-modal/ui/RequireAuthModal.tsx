import { Route } from "@shared/constants/constants";
import { useRequireAuthModal } from "../model/useRequireAuthModal";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";

export const RequireAuthModal = () => {
  const {
    currentTrack,
    imageColors,
    isAuthModalOpen,
    closeAuthModal,
    isVisible,
  } = useRequireAuthModal();

  const gradient = imageColors
    ? `linear-gradient(to bottom, ${imageColors[0]} 0%, ${imageColors[0]} 70%, #333 100%)`
    : "linear-gradient(to bottom, #333, #222)";

  return (
    <>
      <Modal
        open={isAuthModalOpen}
        onClose={closeAuthModal}
        closeAfterTransition
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: isVisible
                ? "rgba(0,0,0,0.9)"
                : "rgba(0,0,0,0.7)",
              transition: "background-color 300ms ease",
            },
          },
        }}
      >
        <>
          <div
            style={{ background: gradient }}
            className={`fixed top-1/5 left-1/2 transform -translate-x-1/2 ${
              isVisible
                ? "opacity-100 translate-y-12"
                : "opacity-0 translate-y-15"
            } duration-300 flex gap-14 z-30 py-17 px-16 rounded-xl`}
          >
            <div className="p-2">
              <img
                src={currentTrack?.album.images[0].url}
                alt="current track image"
                className="w-[305px] h-[305px] rounded-md"
              />
            </div>
            <div className="flex flex-col font-bold items-center text-center">
              <h2 className="text-[30px] max-w-[300px] mb-6">
                Слушай что угодно в бесплатной версии Spotify Lite
              </h2>
              <Link
                to={Route.REGISTRATION}
                className="flex justify-center bg-green-500 text-black py-3 hover:bg-green-400 transition-transform transition-colors duration-200
                rounded-full hover:scale-105 will-change-transform mb-5 w-[225px]
              "
              >
                Зарегистрироваться
              </Link>
              <Link
                to={"/"}
                className="flex justify-center py-3 border border-gray-400 hover:border-white transition-transform transition-colors duration-200
                rounded-full hover:scale-105 will-change-transform w-[225px] mb-8
              "
              >
                Скачать приложение
              </Link>
              <div className="flex gap-2 text-sm items-center">
                <p className="text-zinc-400">Уже есть аккаунт?</p>
                <Link
                  to={Route.LOGIN}
                  className="underline hover:text-green-400"
                >
                  Войти
                </Link>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            className="fixed bottom-1/5 left-1/2 transform -translate-x-1/2 z-30 font-bold text-zinc-400 hover:text-white hover:scale-105 cursor-pointer"
          >
            Закрыть
          </button>
        </>
      </Modal>
    </>
  );
};
